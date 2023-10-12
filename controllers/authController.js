// he had already imported the database connection 
import db from '../config/connect.js'

// and the bcrypt too 
import bcrypt from 'bcryptjs'


// watch the video a little further and with focus 
// to see that solution to the problem is already been explored
// const db = database;




export const register = (req ,res) =>{
    
    // check user if exists
        // ? instead of req.body.username - because it provides extra security for our values
    const  q = "SELECT * FROM users WHERE username = ?"

    db.query(q , [req.body.username] , (error , data)=>{
            if(error) res.status(500).json(error)
            if(data.length) return res.status(409).json("User already exists!");
            
            
            // create new user
                // hash the password
                // this line is the method to hashing our password
                const salt  = bcrypt.genSaltSync(10);
                // passing above salt here - and it will return our encrypted password 
                const hashedPassword = bcrypt.hashSync(req.body.password,salt);

                // this work as a template for the query to fill up , 
                // and the value as question mark to take up data when running the query function 
                const  q = "INSERT INTO users (`username` , `email` , `password` , `name` ) VAlUE(?) ";

                // passing values as an array
                const values = [ req.body.username , req.body.email , hashedPassword , req.body.name];

                db.query(q ,[values] , (error ,data)=>{
                    if(error) res.status(500).json(error)
                    return res.status(200).json("User Has been created")
                } )

        }  
    )







}

export const login = (req ,res) =>{

}

export const logout = (req ,res) =>{

}