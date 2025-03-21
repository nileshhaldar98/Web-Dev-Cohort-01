import express from "express"
import dotenv from "dotenv"
import cors from"cors"
import db from "./utils/db.js";


dotenv.config();

const app = express()

app.use(cors ({
        origin:process.env.BASE_URL,
        methods:['GET','POST','DELET','OPTION']
}))
app.use(express.json());
app.use(express.urlencoded({extended:true }))

const port = 4000 || process.env.PORT;

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})