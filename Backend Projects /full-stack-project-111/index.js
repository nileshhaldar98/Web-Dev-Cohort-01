import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './utils/db.js'  
import userRoutes from './routes/user.routes.js' // import user routes



dotenv.config() //root directory 
const app = express()
const port = process.env.PORT || 3000;

// USER Routes
 



app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db() //connect to mongodb

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/v1/users", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})