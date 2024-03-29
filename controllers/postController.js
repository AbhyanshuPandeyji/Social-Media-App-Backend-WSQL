import db from '../config/connect.js'
import cookies from 'cookie-parser'
// mf jwt import creating error - wow have some ability to debug the app
import jwt from 'jsonwebtoken'

import moment from 'moment'

// to get the posts - to see only our friends posts and our posts ( excluding the all posts like explore feature )
export const getPosts = (req, res) => {

    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) 
        return res.status(401).json('not logged in!');


    


    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');


            // its says the userId is undefined but there is id exits because we are taking it from query
            // so its a string now we need to convert it into a number
            
            // this undefined was causing to not show the posts on the timeline , we need to check before it is 
            // undefined or not
            // console.log(userId)

            // const q = `SELECT * FROM posts AS p JOIN users AS u ON (u.id = p.userId)`;
        

            // so code is same the only difference is the positioning of the statement in the query
            // so the definition of what letter represents what type of table in the database is defined later in the query code
            // such as p.* -> means from post.* select all things from the post , same goes for user and relationship table

        // AS for short form for noting the posts as p & users as u , and join helps to join both table
        // but why - to show our user also on the post made
        // to prevent conflict between post id and user id , we use u.id ad userId - don't get confused the p.userId is still userId saved in the posts

        // this part is not a problem but the token is not coming - question marks take our user id
        const q = userId !== "undefined" ? `SELECT p.*, u.id AS userId , name , profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId =? ORDER BY p.createdAt DESC` :
         `SELECT p.*, u.id AS userId , name , profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships As r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`;
        // left join help to take both our posts and followed users posts
        // the p.userId and the r.followerUserId are the both different ids of our id and the user we follow and their id , so we take in both
        // thats why we need two ids in the array , and also it shows how our value intake works , and why we put in the question mark in place of
        // the actual users id for security purposes but used those both id in the array to get the data
       
        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
        db.query(q, values, (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json(data);

        // const q = `SELECT p.*, u.id AS userId , name , profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        // LEFT JOIN relationships As r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        // ORDER BY p.createdAt DESC`;

        
        // db.query(q, [userInfo.id, userInfo.id] , (err, data) => {
        //     if (err) 
        //         return res.status(500).json(err)
        //     return res.status(200).json(data)
        })
    })
}

// to add posts by the users 
export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');


    


    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = 'INSERT INTO posts (`desc` , `img` , `createdAt` , `userId` ) VALUES (?)';

        // moment to play around with dates and also to have some format easily to put in to get or show the date
        const values = [
            req.body.desc, req.body.img, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ];

        // it was (userInfo.id) not userId 

        db.query(q, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json('Post has been created');
        })
    })
}



// to delete post by user
export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) 
    // logged in to add posts
        return res.status(401).json('not logged in!');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = 'DELETE FROM posts WHERE `id` =? AND `userId` =?';


        db.query(q, [req.params.id , userInfo.id], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json('Post has been deleted');
            return res.status(403).json("You can only delete your own posts")
        })
    })
}
