import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler.js";

const app = express()

//core middlewares//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes//

app.get('/health', (req, res)=>{
    res.send('ok')
})


//auth 
// import authRoute from './module/auth/auth.routes.js'
// app.use("/api/auth", authRoute);



app.use(globalErrorHandler)

export default app