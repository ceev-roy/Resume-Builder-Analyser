import Resume from '../models/Resume.js';
import { calculateATSScore } from '../utils/atsScoring.js';
import imageKit from '../configs/imageKit.js';
import fs from 'fs';

export const analyzeResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeText, jobDescription = '' } = req.body;
    const file = req.file; // Get the uploaded file

    if (!resumeText && !file) {
      return res.status(400).json({
        success: false,
        message: "Resume text or file is required"
      });
    }

    let extractedText = resumeText;
    let fileUrl = '';

    // If file is uploaded, store it and get the URL
    if (file) {
      // Upload file to ImageKit (supports PDF and images)
      const imageBufferData = fs.createReadStream(file.path);
      const fileExtension = file.originalname.split('.').pop();

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: `resume-${Date.now()}.${fileExtension}`,
        folder: 'user-resumes-files',
      });

      fileUrl = response.url;

      // Clean up the temporary file
      fs.unlinkSync(file.path);
    }

    // Calculate ATS score
    const atsResult = calculateATSScore(extractedText, jobDescription);

    // Create resume record with file URL
    const resume = await Resume.create({
      userId,
      title: `ATS Analysis - ${new Date().toLocaleDateString()}`,
      resumeText: extractedText,
      resumeFile: fileUrl, // Store the file URL
      atsScore: atsResult.score,
      atsAnalysis: atsResult.analysis,
      analyzedAt: new Date()
    });

    return res.status(200).json({
      success: true,
      resumeId: resume._id,
      atsScore: atsResult.score,
      analysis: atsResult.analysis,
      wordCount: atsResult.wordCount,
      resumeFile: fileUrl // Return file URL to frontend
    });

  } catch (error) {
    console.error('ATS Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getResumeAnalysis = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    return res.status(200).json({
      success: true,
      resume: {
        _id: resume._id,
        title: resume.title,
        atsScore: resume.atsScore,
        atsAnalysis: resume.atsAnalysis,
        analyzedAt: resume.analyzedAt,
        resumeText: resume.resumeText,
        resumeFile: resume.resumeFile // Include file URL in response
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
