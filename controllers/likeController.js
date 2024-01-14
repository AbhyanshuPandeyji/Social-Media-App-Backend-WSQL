import db from "../config/connect.js";
import jwt from 'jsonwebtoken'


// To get likes on a post
export const getLikes = async (req,res)=>{
        

        const q = `SELECT userId FROM likes WHERE postId = ?`;



        db.query(q, [req.query.postId], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            // return res.status(200).json(data);
            // for directly containing id instead of an object first with userId
            return res.status(200).json(data.map(like=>like.userId));
        })
};



// to add like to a post
export const addLike =  (req,res)=> {

    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
    
        const q = 'INSERT INTO likes (`userId` , `postId`) VALUES (?)';

        // moment to play around with dates and also to have some format easily to put in to get or show the date
        const values = [
            userInfo.id,
            req.body.postId
        ];

        // it was (userInfo.id) not userId 

        db.query(q, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json('Post has been liked');
        })
    })
}


// to remove like on the post 
export const deleteLike =(req , res)=>{
    // console.log("works")
    

    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = "DELETE FROM likes WHERE `userId` = ?  AND `postId`=?";


    //     console.log(req.query)    
    // console.log(req.query.postId)    
    // console.log(req.params)    
    // console.log(req.params.postId)    

        // it was (userInfo.id) not userId 

        db.query(q, [userInfo.id , req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Post has been un-liked');
        })
    })

}