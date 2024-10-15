import express, { request, Router } from 'express';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// CORS configuration
const allowedOrigins = ['https://velkiclubagent.com', 'https://velkiclubagentlist.com', 'http://localhost:9000'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookiesParser());
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Velki Club Agent List server');
});

// Import routes
import userRouter from './routes/user.routes.js';
import siteAdminRouter from './routes/site-admin.routes.js';
import subAdminRouter from './routes/sub-admin.routes.js';
import superAgentRouter from './routes/super-agent.routes.js';
import masterAgentRouter from './routes/master-agent.routes.js';
import customerServiceRouter from './routes/customer-service.routes.js';
import oldNewRoutes from './routes/old-new.routes.js';

// Route declaration
app.use("/user", userRouter);
app.use(siteAdminRouter);
app.use(subAdminRouter);
app.use(superAgentRouter);
app.use(masterAgentRouter);
app.use(customerServiceRouter);
app.use(oldNewRoutes);

export { app };
