import db from '../config/connect.js'
import cookies from 'cookie-parser'
// mf jwt import creating error - wow have some ability to debug the app
import jwt from 'jsonwebtoken'

import moment from 'moment'

// to get the posts - to see only our friends posts and our posts ( excluding the all posts like explore feature )
export const getPosts = (req, res) => {
    const token = req.cookies.accessToken

    if (! token) 
        return res.status(401).json('not logged in!')


    


    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!')


        


        // AS for short form for noting the posts as p & users as u , and join helps to join both table
        // but why - to show our user also on the post made
        // to prevent conflict between post id and user id , we use u.id ad userId - don't get confused the p.userId is still userId saved in the posts

        // this part is not a problem but the token is not coming - question marks take our user id
        const q = `SELECT p.*, u.id AS userId , name , profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships As r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`
        // left join help to take both our posts and followed users posts

        db.query(q, [
            userInfo.id, userInfo.id
        ], (err, data) => {
            if (err) 
                return res.status(500).json(err)

            

            return res.status(200).json(data)
        })
    })
}

// to get user postsd
export const addPost = (req, res) => {
    const token = req.cookies.accessToken
    if (! token) 
        return res.status(401).json('not logged in!')


    


    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) 
            return res.status(403).json('Token is not Valid!');
        

        const q = 'INSERT INTO posts (`desc` , `img` , `createdAt` , `userId` ) VALUES (?)';

        const values = [
            req.body.desc, req.body.img, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userId.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) 
                return res.status(500).json(err)

            

            return res.status(200).json('Post has been created')
        })
    })
}
