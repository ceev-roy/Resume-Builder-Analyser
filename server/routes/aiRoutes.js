import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, enhanceProject, uploadResume } from "../controllers/aiController.js";
import { analyzeResume, getResumeAnalysis } from "../controllers/atsController.js";
import upload from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/enhance-web-proj', protect, enhanceProject)
aiRouter.post('/upload-resume', protect, uploadResume)
// Add ATS analysis routes
aiRouter.post('/analyze-resume', upload.single('resumeFile'), protect, analyzeResume);
aiRouter.get('/analysis/:resumeId', protect, getResumeAnalysis);

export default aiRouter;