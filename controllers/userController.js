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