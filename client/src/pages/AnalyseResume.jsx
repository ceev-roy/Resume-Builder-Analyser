// import React from "react";

// const Card = ({ children, className }) => (
//   <div className={`bg-white rounded-2xl shadow ${className}`}>{children}</div>
// );

// const CardContent = ({ children, className }) => (
//   <div className={`p-4 ${className}`}>{children}</div>
// );

// const Badge = ({ children, className }) => (
//   <span
//     className={`px-2 py-1 text-xs font-medium rounded-lg ${className}`}
//   >
//     {children}
//   </span>
// );

// const Progress = ({ value, className }) => (
//   <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
//     <div
//       className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
//       style={{ width: `${value}%` }}
//     ></div>
//   </div>
// );

// export default function AnalyseResume() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* Left Side - Dummy Resume PDF Placeholder */}
//       <Card className="flex items-center justify-center w-[80vh] ml-12">
//         <CardContent className="flex flex-col items-center justify-center w-full h-full">
//           <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-lg border border-dashed border-gray-400">
//             <p className="text-gray-600 text-lg font-medium">
//               Dummy Resume PDF Preview
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Right Side - Resume Review */}
//       <Card className="p-1 mr-12">
//         <CardContent>
//           <h2 className="text-2xl font-bold mb-3">Resume Review</h2>

//           {/* Score */}
//           <div className="flex items-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-400 to-green-300 flex items-center justify-center text-white text-sl font-bold">
//               88/100
//             </div>
//             <div className="ml-4">
//               <p className="font-semibold text-gray-700">Your Resume Score</p>
//               <p className="text-sm text-gray-500">
//                 This score is calculated based on the variables listed below.
//               </p>
//             </div>
//           </div>

//           {/* Breakdown */}
//           <div className="space-y-3">
//             <div>
//               <div className="flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Tone & Style</span>
//                 <Badge className="bg-yellow-100 text-yellow-700">Good Start</Badge>
//               </div>
//               <Progress value={55} className="mt-2" />
//               <p className="text-sm text-gray-500 mt-1">55/100</p>
//             </div>

//             <div>
//               <div className="flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Structure</span>
//                 <Badge className="bg-green-100 text-green-700">Strong</Badge>
//               </div>
//               <Progress value={70} className="mt-2" />
//               <p className="text-sm text-gray-500 mt-1">70/100</p>
//             </div>

//             <div>
//               <div className="flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Content</span>
//                 <Badge className="bg-red-100 text-red-700">Needs Work</Badge>
//               </div>
//               <Progress value={25} className="mt-2" />
//               <p className="text-sm text-gray-500 mt-1">25/100</p>
//             </div>

//             <div>
//               <div className="flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Skills</span>
//                 <Badge className="bg-red-100 text-red-700">Needs Work</Badge>
//               </div>
//               <Progress value={32} className="mt-2" />
//               <p className="text-sm text-gray-500 mt-1">32/100</p>
//             </div>
//           </div>

//           {/* ATS Score */}
//           <div className="mt-8 p-4 rounded-xl bg-red-50 border border-red-200">
//             <h3 className="font-semibold text-red-700 mb-2">ATS Score - 42/100</h3>
//             <p className="text-sm text-gray-600 mb-2">
//               How well does your resume pass through Applicant Tracking Systems?
//             </p>
//             <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//               <li>No clear formatting, non-readable by ATS</li>
//               <li>Missing keywords relevant to the job</li>
//               <li>No skills section detected</li>
//             </ul>
//             <p className="text-sm text-gray-500 mt-3">
//               Want a better score? Improve your resume by applying the suggestions
//               listed below.
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// ... (keep your existing Card, Badge, Progress components)


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';

// ... (keep your existing Card, Badge, Progress components)
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Badge = ({ children, className }) => (
  <span
    className={`px-2 py-1 text-xs font-medium rounded-lg ${className}`}
  >
    {children}
  </span>
);

const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export default function AnalyseResume() {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await api.get(`/api/ai/analysis/${resumeId}`, {
          headers: { Authorization: token }
        });

        if (data.success) {
          setAnalysis(data.resume);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your resume analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load analysis</p>
        </div>
      </div>
    );
  }

  const { atsScore, atsAnalysis, resumeFile } = analysis;

  // Calculate individual scores for display
  const getScoreForCategory = (category, maxScore) => {
    return atsAnalysis.breakdown ? Math.round((atsAnalysis.breakdown[category] / maxScore) * 100) : 0;
  };

  // Function to render the resume file in full size
  const renderResumeFile = () => {
    if (!resumeFile) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📄</div>
            <p>No resume file available</p>
          </div>
        </div>
      );
    }

    // Check if it's a PDF
    if (resumeFile.toLowerCase().endsWith('.pdf')) {
      return (
        <div className="w-full h-full">
          {!iframeLoaded && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading PDF...</p>
              </div>
            </div>
          )}
          <iframe
            src={`${resumeFile}#view=FitH`}
            className={`w-full h-full border-0 ${!iframeLoaded ? 'hidden' : 'block'}`}
            title="Resume PDF"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      );
    }
    // Check if it's an image
    else if (resumeFile.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <img
            src={resumeFile}
            alt="Uploaded Resume"
            className="max-w-full max-h-full object-contain"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      );
    }
    // For other file types
    else {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
          <div className="text-4xl mb-4">📄</div>
          <p className="text-gray-600 mb-4 text-sm">This file type cannot be previewed</p>
          <a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            Download Resume File
          </a>
        </div>
      );
    }
  };

  return (
    <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Side - Full Resume Display */}
      <div className="w-full h-full flex justify-center lg:justify-start">
        <Card className="w-full h-full max-w-full lg:max-w-xl mx-auto lg:ml-10">
          <CardContent className="h-full flex flex-col p-0">
            <div className="p-2 border-b border-gray-200">
              <h3 className="text-md font-semibold text-gray-800">Your Uploaded Resume</h3>
            </div>
            <div className="flex-1 bg-gray-50 overflow-hidden">
              {renderResumeFile()}
            </div>
            {resumeFile && (
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    {resumeFile.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Image File'}
                  </span>
                  <a
                    href={resumeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                  >
                    <span>Open in new tab</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Side - ATS Analysis */}
      <div className="w-full h-full flex justify-center lg:justify-start">
        <Card className="w-full h-full max-w-full lg:max-w-3xl mx-auto lg:-mx-10">
          <CardContent className="p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold m-2">Resume ATS Analysis</h2>

            {/* Overall Score */}
            <div className="flex items-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-base font-bold ${atsScore >= 80 ? 'bg-gradient-to-tr from-green-400 to-green-300' :
                atsScore >= 60 ? 'bg-gradient-to-tr from-orange-400 to-orange-300' :
                  'bg-gradient-to-tr from-red-400 to-red-300'
                }`}>
                {atsScore}/100
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-700 text-sm">ATS Compatibility Score</p>
                <p className="text-xs text-gray-500">
                  {atsScore >= 80 ? 'Excellent! Your resume is ATS-friendly' :
                    atsScore >= 60 ? 'Good, but could use some improvements' :
                      'Needs significant improvements to pass ATS'}
                </p>
              </div>
            </div>

            {/* Breakdown Sections */}
            <div className="space-y-3 mb-4 flex-1 overflow-auto">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 text-sm">Contact Information</span>
                  <Badge className={
                    getScoreForCategory('contact', 15) >= 70 ? "bg-green-100 text-green-700 text-xs" :
                      getScoreForCategory('contact', 15) >= 50 ? "bg-yellow-100 text-yellow-700 text-xs" :
                        "bg-red-100 text-red-700 text-xs"
                  }>
                    {getScoreForCategory('contact', 15) >= 70 ? "Strong" :
                      getScoreForCategory('contact', 15) >= 50 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={getScoreForCategory('contact', 15)} className="h-2 mt-1" />
                <p className="text-xs text-gray-500 mt-1">Measures completeness of email, phone, and LinkedIn</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 text-sm">Sections & Structure</span>
                  <Badge className={
                    getScoreForCategory('sections', 25) >= 70 ? "bg-green-100 text-green-700 text-xs" :
                      getScoreForCategory('sections', 25) >= 50 ? "bg-yellow-100 text-yellow-700 text-xs" :
                        "bg-red-100 text-red-700 text-xs"
                  }>
                    {getScoreForCategory('sections', 25) >= 70 ? "Strong" :
                      getScoreForCategory('sections', 25) >= 50 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={getScoreForCategory('sections', 25)} className="h-2 mt-1" />
                <p className="text-xs text-gray-500 mt-1">Presence of key sections like Experience, Education, Skills</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 text-sm">Keywords & Skills</span>
                  <Badge className={
                    getScoreForCategory('keywords', 30) >= 70 ? "bg-green-100 text-green-700 text-xs" :
                      getScoreForCategory('keywords', 30) >= 50 ? "bg-yellow-100 text-yellow-700 text-xs" :
                        "bg-red-100 text-red-700 text-xs"
                  }>
                    {getScoreForCategory('keywords', 30) >= 70 ? "Strong" :
                      getScoreForCategory('keywords', 30) >= 50 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={getScoreForCategory('keywords', 30)} className="h-2 mt-1" />
                <p className="text-xs text-gray-500 mt-1">Relevant industry keywords and technical skills</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 text-sm">Formatting & Readability</span>
                  <Badge className={
                    getScoreForCategory('formatting', 20) >= 70 ? "bg-green-100 text-green-700 text-xs" :
                      getScoreForCategory('formatting', 20) >= 50 ? "bg-yellow-100 text-yellow-700 text-xs" :
                        "bg-red-100 text-red-700 text-xs"
                  }>
                    {getScoreForCategory('formatting', 20) >= 70 ? "Strong" :
                      getScoreForCategory('formatting', 20) >= 50 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={getScoreForCategory('formatting', 20)} className="h-2 mt-1" />
                <p className="text-xs text-gray-500 mt-1">Use of bullet points, action verbs, and proper structure</p>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-3 mt-4">
                {/* Strengths */}
                {atsAnalysis.strengths && atsAnalysis.strengths.length > 0 && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h3 className="font-semibold text-green-700 text-sm mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Strengths
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {atsAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {atsAnalysis.improvements && atsAnalysis.improvements.length > 0 && (
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-700 text-sm mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Areas for Improvement
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {atsAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-1">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Keywords Found */}
                {atsAnalysis.keywords && atsAnalysis.keywords.found && atsAnalysis.keywords.found.length > 0 && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <h3 className="font-semibold text-blue-700 text-sm mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Keywords Found
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {atsAnalysis.keywords.found.map((keyword, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}
