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



// routes import 
import userRoutes from './routes/users.js'

const app = express();

// this will act as our initial line for the routes
// app.use('/api/v1');


// for now - this will act as our test route - without separating api/v1 , or having a / route
// this will work as it will take the /api/users as initial route , then it will go to the userRoutes , 
// in that it will take the /test , or any other route we defined , then we use the browser to go to that url
// and we get the data for the url we have access to and can work with 
app.use("/api/users" , userRoutes)


// we won't be writing all this operations here its - it wont be a good idea , so we will define the initial point for the routes to hit
// like users , else and then their sub routes in file , nesting url hit points in each other

app.listen(8800 , ()=>{
    console.log("API working!")
})