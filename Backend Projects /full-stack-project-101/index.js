import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js";
//import all the routes
import userRoutes from "./routes/user.routes.js"
//cookie import 
import cookieParser from "cookie-parser";


dotenv.config();

const app = express()

app.use(cors ({
        origin:process.env.BASE_URL,
        methods:['GET','POST','DELET','OPTIONS']
}))
app.use(express.json());
app.use(express.urlencoded({extended:true }))
//to accept from the cookie parser
app.use(cookieParser());

const port =  process.env.PORT|| 4000;

app.get('/', (req, res) => {
  res.send('Cohort!')
})

app.get('/nilesh',(req,res)=>{
        res.send('hey Nilesh!');
})

app.get('/piyush',(req,res)=>{
        res.send('hey Piyush'); 
})
app.get('/haldar',(req,res)=>{
        res.send('hey Haldar from!');
})
//connect to db
db();

//user Routes to transfer after /api/v1/users whaterever comes
app.use("/api/v1/users",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
