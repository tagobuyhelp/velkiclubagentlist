import express, { request, Router } from 'express';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';




const app = express();




app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookiesParser());
app.use(errorMiddleware);



app.get('/', (req, res) => {
    res.send('Welcome to the Velki Club Agent List server')
})


//import routes
import userRouter from './routes/user.routes.js';
import siteAdminRouter from './routes/site-admin.routes.js';
import subAdminRouter from './routes/sub-admin.routes.js';
import superAgentRouter from './routes/super-agent.routes.js';
import masterAgentRouter from './routes/master-agent.routes.js';
import customerServiceRouter from './routes/customer-service.routes.js';
import oldNewRoutes from './routes/old-new.routes.js';

//route diclaration
app.use("/user", userRouter);
app.use( siteAdminRouter);
app.use(subAdminRouter);
app.use(superAgentRouter);
app.use(masterAgentRouter);
app.use(customerServiceRouter);
app.use(oldNewRoutes);

export {app}