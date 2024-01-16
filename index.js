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

// multer is the way to upload your files without cloud storage and upload to just there folders 
import multer from "multer";
// using this upload we are gonna create an endpoint and upload our files
// problem - its not adding the type of extension in the image url of the upload
// to prevent this we are going to use multer dist storage
// const upload = multer({ dest: 'uploads/' })

// connection
// import {db} from './config/connect.js'


// routes import
import userRoutes from './routes/users.js'
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js";
import relationshipRoutes from "./routes/relationships.js";


// using mutler for image upload
// const multer = require('multer');
// import multer from "multer";
// the upload destination doesn't work properly - so we will use multer disk storage
// const upload = multer({dest: 'uploads/'});


const app = express();


// middleware

// help us to send cookies and to allow the others urls for the access control to send in the data
app.use((req, res, next) => {
    // this is to allow the access control of the cors credential to be true by header
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// to read the req and body queries - if you don't do that you wont be able to send any json object
app.use(express.json());
// later we will give it our used url - either hosted one or local one - which will be frontend one -3000
// so in index cors we give the frontend hosting url
app.use(cors({origin: "http://localhost:3000"}));

app.use(cookieParser());

// this will act as our initial line for the routes
// app.use('/api/v1');

// the multer disk storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../client/public/upload')
//     },
//     filename: function (req, file, cb) {
//         cd(null, Date.now() + file.originalname);
//     }
// })

// const upload = multer({storage: storage});

// to prevent the multer storage not including the file type in the end we will use this multer storage
// ok two things , first i didn't have the correct path to which the file is going to be stored in the local storage directory
// and also didn't create the folder in which the images will be stored]
// so its basically an image uploader in the local storage without any inclusion of the internet data base collection
// but to show the data , its need to be uploaded to the database image part , which contains the url so be careful
const storage = multer.diskStorage({
    // specific destination to upload the files 
    destination: function (req, file, cb) {
        // remember this destination is always going to take place from the starting point of where your folder is located in the storage
        // because its stores the images locally and not with the cloud storage
      cb(null, '../client/public/upload')
    },
    // and also to change our file name and create unique name of the file
    filename: function (req, file, cb) {
        // very complex file name 
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)

    // lets use our easy file name - currentDate + filename to not get conflict with the same image name file
    cb(null, Date.now() + file.originalname );
    }
  })
  
  // after the file have been saved with the name in the disk we will post this 
//   data in the backend of the functionality where the images are being used , the images are 
//  remember these functionality are being used in all the folder its just the endpoint to upload the images not to use it
// we will send the uploaded images where its required depending upon where we use to upload the images
  const upload = multer({ storage: storage });


  // just random endpoint 
// app.post('/api/upload', upload.single("file"), (req, res) => {
//     const file = req.file;
//     res.status(200).json(file.filename)
// })



//---------- our image upload endpoint , you can define and create a route for the image upload in a separate file
app.post("/api/upload" , upload.single("file") , (req,res)=>{

    const file = req.file;
    // send back the file name to be uploaded , to can be used in the app with selection name
    res.status(200).json(file.filename);
} )




// for now - this will act as our test route - without separating api/v1 , or having a / route
// this will work as it will take the /api/users as initial route , then it will go to the userRoutes ,
// in that it will take the /test , or any other route we defined , then we use the browser to go to that url
// and we get the data for the url we have access to and can work with
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);


// we won't be writing all this operations here its - it wont be a good idea , so we will define the initial point for the routes to hit
// like users , else and then their sub routes in file , nesting url hit points in each other


// db();


app.listen(8800, () => {
    console.log("API working!")
})
