
import db from "../config/connect.js";
import jwt from 'jsonwebtoken'


// To get followers on the 
export const getRelationships = async (req,res)=>{
        

        const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;



        db.query(q, [req.query.followedUserId], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            // return res.status(200).json(data);
            // for directly containing id instead of an object first with userId
            // it will return an object and we will transfer this object into userId
            return res.status(200).json(data.map(relationship=>relationship.followerUserId));
        })
};



// to add like to a post
export const addRelationship =  (req,res)=> {

    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
    
        const q = 'INSERT INTO relationships (`followerUserId` , `followedUserId`) VALUES (?)';

        // moment to play around with dates and also to have some format easily to put in to get or show the date
        const values = [
            userInfo.id,
            req.body.userId
        ];

        // it was (userInfo.id) not userId 

        db.query(q, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json('Following');
        })
    })
}


// to remove like on the post 
export const deleteRelationship =(req , res)=>{
    // console.log("works")
    

    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = "DELETE FROM relationships WHERE `followerUserId` = ?  AND `followedUserId`=?";

        // query from the url means the user we are seeing , userInfo.id is the id of currently logged in user , as we
        db.query(q, [userInfo.id , req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Unfollow');
        })
    })

}