import db from '../config/connect.js'
import jwt from 'jsonwebtoken';
import moment from 'moment';


// to add comment on a post
export const addComment = (req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = 'INSERT INTO comments (`desc` , `createdAt` , `userId` , `postId` ) VALUES (?)';

        // moment to play around with dates and also to have some format easily to put in to get or show the date
        const values = [
            req.body.desc, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id , req.body.postId
        ];

        // it was (userInfo.id) not userId 

        db.query(q, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json('Comment Has been Created has been created');
        })
    })
} 




/// to get comments 

export const getComments = (req,res)=>{

        const q = `SELECT c.*, u.id AS userId , name , profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postId = ? ORDER BY c.createdAt DESC`;

        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data)
        })
    
}