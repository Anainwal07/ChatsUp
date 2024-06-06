import jwt from "jsonwebtoken" ; 


//generating tokens 
const generateTokenAndSetCookie = (userId , res) => {

    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn : '5d'//you  token will get expires in 5 day !
    })

    res.cookie("jwt" , token , {
        maxAge : 5 * 24 * 60 * 1000 , 
        httpOnly : true ,//prevent XSS (cross-site scripting attacks) 
        sameSite : "strict", //CSRF attacks cross-site forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
    
};

export default generateTokenAndSetCookie ;