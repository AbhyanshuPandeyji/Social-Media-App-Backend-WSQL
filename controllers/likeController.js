import db from "../config/connect.js";
import jwt from 'jsonwebtoken'


// To get likes on a post
export const getLikes = async (req,res)=>{
        

        const q = `SELECT userId FROM likes WHERE postId = ?`;



        db.query(q, [req.query.postId], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            // return res.status(200).json(data.map(like=>like.userId));
            return res.status(200).json(data);
        })
}