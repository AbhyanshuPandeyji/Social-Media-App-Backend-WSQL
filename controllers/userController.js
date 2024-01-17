import db from '../config/connect.js'
import cookies from 'cookie-parser'
// mf jwt import creating error - wow have some ability to debug the app
import jwt from 'jsonwebtoken'




// User 
export const getUser = (req,res)=>{
    // res.send("api request in user routes works !");
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";

    db.query(q , [userId] , (err,data)=>{
        if(err) return res.status(500).json(err);
        const { password , ...info } = data[0];
        return res.json(info);
    })
}

// To update user Profile - same can be applied for the posts
export const updateUser = (req , res )=>{

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Authenticated");

    // userInfo is just another way to write data in the query - the user that we got from the access token 
    // now representing it as a data in name of userInfo - more readable and understandable and tells what is data is about

    jwt.verify(token , "secretKey" , (err , userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        // there was an extra backtick
        const q = "UPDATE users SET `name` =? , `city` =? , `website` =? ,  `profilePic` =? , `coverPic`=? WHERE id = ?";

    db.query(q , [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id
    ] , 
    (err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0 ) return res.json("Updated!");
        return res.status(403).json("You can only update Your profile");
        // read more about what is https , how to use it its some major errors or the status res
    })

    // res.send("api request in user routes works !");
    // const userId = req.params.userId;
    
    })
}