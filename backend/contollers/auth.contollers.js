
export const loginUser = (req, res) => {
    try {
        res.send("Login User")
    } catch (err) {
        console.log(err) ; 
    }
    console.log("Login User") ; 
}

export const singupUser = async(req, res) => {
    try {
        const {fullName , userName , password , confirmPassword , gender} = req.body ; 
    } catch (error) {
        
    }
}

export const logoutUser = (req, res) => {
    console.log("Logout User") ; 
}