import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';
// import serverless from 'serverless-http'


const app = express();


//Database connection
await connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is live...');
});
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

// export const handler = serverless(app);

module.exports = app;




