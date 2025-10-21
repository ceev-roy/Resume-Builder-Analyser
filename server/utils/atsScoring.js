// ATS Scoring Algorithm
export const calculateATSScore = (resumeText, jobDescription = '') => {
  let score = 0;
  const maxScore = 100;
  const analysis = {
    strengths: [],
    improvements: [],
    sections: {},
    keywords: {
      found: [],
      missing: []
    },
    breakdown: {
      contact: 0,
      sections: 0,
      keywords: 0,
      formatting: 0,
      skills: 0
    }
  };

  // Convert to lowercase for case-insensitive matching
  const text = resumeText.toLowerCase();

  // 1. Contact Information Check (15 points)
  let contactScore = 0;
  const hasEmail = /[\w._%+-]+@[\w.-]+\.[a-z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[-.]?)?\(?(\d{3})\)?[-.]?(\d{3})[-.]?(\d{4})/.test(resumeText);
  const hasLinkedIn = /linkedin\.com|linkedin/.test(text);

  if (hasEmail) contactScore += 5;
  if (hasPhone) contactScore += 5;
  if (hasLinkedIn) contactScore += 5;

  score += contactScore;
  analysis.breakdown.contact = contactScore;

  // 2. Section Detection (25 points)
  let sectionScore = 0;
  const sections = {
    experience: /(experience|work history|employment|work experience)/i.test(resumeText),
    education: /(education|academic background|qualifications)/i.test(resumeText),
    skills: /(skills|technical skills|competencies|abilities)/i.test(resumeText),
    summary: /(summary|objective|profile)/i.test(resumeText),
    projects: /(projects|portfolio)/i.test(resumeText)
  };

  analysis.sections = sections;

  Object.values(sections).forEach(hasSection => {
    if (hasSection) sectionScore += 5;
  });

  score += sectionScore;
  analysis.breakdown.sections = sectionScore;

  // 3. Keyword Analysis (30 points) - if job description provided
  let keywordScore = 0;
  if (jobDescription) {
    const commonKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    commonKeywords.forEach(keyword => {
      if (resumeKeywords.includes(keyword.toLowerCase())) {
        analysis.keywords.found.push(keyword);
        keywordScore += 2;
      } else {
        analysis.keywords.missing.push(keyword);
      }
    });
  } else {
    // Use common industry keywords if no job description
    const commonSkills = ['javascript', 'python', 'react', 'node.js', 'html', 'css',
      'mongodb', 'sql', 'git', 'aws', 'docker', 'rest api'];

    commonSkills.forEach(skill => {
      if (text.includes(skill)) {
        analysis.keywords.found.push(skill);
        keywordScore += 2;
      }
    });
  }

  score += Math.min(keywordScore, 30);
  analysis.breakdown.keywords = Math.min(keywordScore, 30);

  // 4. Formatting and Structure (20 points)
  let formattingScore = 0;

  // Check for bullet points
  const hasBulletPoints = /[•·\-*]\s/.test(resumeText);
  if (hasBulletPoints) formattingScore += 5;

  // Check for reasonable length (300-1000 words)
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount >= 300 && wordCount <= 1000) {
    formattingScore += 5;
  } else {
    analysis.improvements.push(`Resume length should be between 300-1000 words (currently ${wordCount})`);
  }

  // Check for action verbs
  const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'led',
    'improved', 'increased', 'decreased', 'optimized'];
  const hasActionVerbs = actionVerbs.some(verb => text.includes(verb));
  if (hasActionVerbs) formattingScore += 5;

  // Check for quantifiable achievements
  const hasQuantifiable = /\d+%|\$|\d+\+|\d+ years/i.test(resumeText);
  if (hasQuantifiable) formattingScore += 5;

  score += formattingScore;
  analysis.breakdown.formatting = formattingScore;

  // 5. Skills Section Analysis (10 points)
  let skillsScore = 0;
  if (sections.skills) {
    skillsScore += 5;

    // Check if skills are well-formatted
    const skillsLines = resumeText.split('\n').filter(line =>
      line.toLowerCase().includes('skill') &&
      (line.includes(':') || line.includes('-') || line.includes('•'))
    );

    if (skillsLines.length > 0) skillsScore += 5;
  } else {
    analysis.improvements.push("Add a dedicated skills section");
  }

  score += skillsScore;
  analysis.breakdown.skills = skillsScore;

  // Generate strengths and improvements
  generateFeedback(analysis, score, sections);

  return {
    score: Math.min(Math.max(score, 0), maxScore),
    analysis,
    wordCount
  };
};

// Helper function to extract keywords from text
const extractKeywords = (text) => {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);

  return [...new Set(words)]; // Remove duplicates
};

// Generate feedback based on analysis
const generateFeedback = (analysis, score, sections) => {
  // Strengths
  if (analysis.breakdown.contact >= 10) {
    analysis.strengths.push("Complete contact information");
  }
  if (analysis.breakdown.sections >= 20) {
    analysis.strengths.push("Well-structured with key sections");
  }
  if (analysis.breakdown.formatting >= 15) {
    analysis.strengths.push("Good formatting and use of action verbs");
  }
  if (analysis.keywords.found.length > 5) {
    analysis.strengths.push("Relevant keywords identified");
  }

  // Improvements
  if (analysis.breakdown.contact < 10) {
    analysis.improvements.push("Add missing contact information (email, phone, LinkedIn)");
  }
  if (!sections.experience) {
    analysis.improvements.push("Add work experience section");
  }
  if (!sections.education) {
    analysis.improvements.push("Add education section");
  }
  if (analysis.breakdown.keywords < 15) {
    analysis.improvements.push("Include more relevant keywords from job description");
  }
  if (analysis.breakdown.formatting < 10) {
    analysis.improvements.push("Use bullet points and action verbs for better readability");
  }
};
