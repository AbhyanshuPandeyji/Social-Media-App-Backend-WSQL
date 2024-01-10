// he had already imported the database connection 
import db from '../config/connect.js';
// import { db } from "../connect.js";

// and the bcrypt too 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// watch the video a little further and with focus 
// to see that solution to the problem is already been explored
// const db = database;




export const register = (req ,res) =>{
    
    // check user if exists
        // ? instead of req.body.username - because it provides extra security for our values
    const  q = "SELECT * FROM users WHERE username = ?"

    db.query(q , [req.body.username] , (error , data)=>{
            if(error) res.status(500).json(error);
            // this response will be inside the data - thats why 
            // when we hit  it shows the message in frontend - to call it we use -err.response.data
            if(data.length) return res.status(409).json("User already exists!");
            // console.log(data)
            
            // create new user
                // hash the password
                // this line is the method to hashing our password
                const salt  = bcrypt.genSaltSync(10);
                // passing above salt here - and it will return our encrypted password 
                const hashedPassword = bcrypt.hashSync(req.body.password,salt);

                // this work as a template for the query to fill up , 
                // and the value as question mark to take up data when running the query function 
                const  q = "INSERT INTO users (`username` , `email` , `password` , `name` ) VALUE (?)";

                // passing values as an array
                const values = [ req.body.username , req.body.email , hashedPassword , req.body.name];

                db.query(q ,[values] , (error ,data)=>{
                    if(error) res.status(500).json(error)
                    return res.status(200).json("User Has been created")
                } )

        }  
    )







}


// login 
export const login = (req ,res) =>{

    const q = "SELECT * FROM users WHERE username = ?";

    // you can use email to login also , so if thats the case you also need to change it in the frontend
    // the type of input and the type of data you will intake depends up on this data incoming , and receiving in the frontend
    db.query(q , [req.body.username] , (error , data)=>{
        if(data.length === 0) return res.status(404).json("User not Found!!");

        // because we are selecting all from users -  it gives us an data , it will be an array 
        // thats why we need to specify the number of that data in array - and in  this array there will be only one username
        const checkPassword = bcrypt.compareSync(req.body.password , data[0].password );

        if(!checkPassword) return res.status(400).json("Wrong Password or Username!");
    
        // jwt token before - returning data
        // in case of secret key you can use an env file - there are many more way to do it , 
        // go to another file and check the user authentication its a simple one here
        const token = jwt.sign({id : data[0].id }, "secretKey");


        // to only send other data and not the password
        const { password , ...others }  = data[0];

        res.cookie("accessToken" , token , {
            httpOnly: true,

        }).status(200).json(others);
        
    
    });

}

// Logout User
export const logout = (req ,res) =>{

    // access token is to key name for value of the jwt token 
    res.clearCookie("accessToken" , {
        secure: true , 
        sameSite: "none"
    }).status(200).json("User has been logged out!")

}



// why cors -
// so nobody else could reach our api, 
// and if anybody tries to reach our api address , it will throw an error
// for that you need to give the url for your app