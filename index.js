// this is the main server file

// import express from 'express'

// const app = express();

// app.get('/' , function(req,res){
//     res.status(200)
//     res.send("hello the backend server is working")
// })


// app.listen(4000 , ()=>{
//     console.log('server started on port 4000')
// })

// until now this was a simple express server in isolation


// now original server


// modules imports

// remember its not a destructure but express is whole library - don't use { express } to import
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"

// connection
// import {db} from './config/connect.js'


// routes import
import userRoutes from './routes/users.js'
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"


// using mutler for image upload
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


const app = express();


// middleware

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

// to read the req and body queries - if you don't do that you wont be able to send any json object
app.use(express.json());
// later we will give it our used url - either hosted one or local one - which will be frontend one -3000
// so in index cors we give the frontend hosting url
app.use(cors({origin: "http://localhost:3000"}));

app.use(cookieParser())

// this will act as our initial line for the routes
// app.use('/api/v1');

// for now - this will act as our test route - without separating api/v1 , or having a / route
// this will work as it will take the /api/users as initial route , then it will go to the userRoutes ,
// in that it will take the /test , or any other route we defined , then we use the browser to go to that url
// and we get the data for the url we have access to and can work with
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);


// we won't be writing all this operations here its - it wont be a good idea , so we will define the initial point for the routes to hit
// like users , else and then their sub routes in file , nesting url hit points in each other


// db();


app.listen(8800, () => {
    console.log("API working!")
})
