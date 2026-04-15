import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";


const app = express()


//core middlewares//
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes//

app.get('/health', (req, res)=>{
    res.send('ok')
})


import authRoute from "./modules/auth/auth.routes.js"

app.use("/api/auth", authRoute);


//auth 
// import authRoute from './module/auth/auth.routes.js'
// app.use("/api/auth", authRoute);



app.use(globalErrorHandler)

export default app