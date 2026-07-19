const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");
const { validateRegistration, validateLogin } = require("../utils/validation")

// user registration 
const registerUser = async(req,res)=> {

    logger.info("Registraction endpoint hit");

     try{
       // validate the schema
  

    const {error} = validateRegistration(req.body);

    if(error){
        logger.warn("Validation error", error.details[0].message);
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({ $or: [{email}, {username}] });

    if(user){
        logger.warn("User already exists");
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    user = new User({username, email, password});
    await user.save();

    logger.warn("User saved successfully", user._id);

    const { accessToken, refreshToken } = await generateToken(user);

    res.status(201).json({
        success: true,
        message: "User register successfully",
        accessToken,
        refreshToken
    })
    }
   catch(e){
        logger.error("Registration error occured ", e);
        res.status(500).json({
            success: false,
            message: "Internal server on register user"
        })
    }
}

// user login
const loginUser = async (req, res)=> {

   logger.info("logging endpoint hit");

   try{
      
      const {error} = validateLogin(req.body);

        if(error){
        logger.warn("Validation error", error.details[0].message);
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(!user){
        logger.warn("Invalid user")
        return res.status(400).json({
            success: false,
            message: "User does not exists"
        })
    }

    // check validate password
    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword){
        logger.warn("Invalid  password")
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const { accessToken, refreshToken } = await generateToken(user);

    logger.warn("User logged in ", user._id);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
        refreshToken,
        userId: user._id
    })

   }catch(e){
      logger.error("logging error occured ", e);
        res.status(500).json({
            success: false,
            message: "Internal server on logging user"
        })
   }

}

// refresh token
const createRefreshToken = async(req, res)=> {

    logger.info("Refresh Token endpoint hit");

    try{
       
        const { refreshToken } = req.body;

        if(!refreshToken){
            logger.warn("Refresh token missing");
            return res.json({
                success: false,
                message: "Refresh token missing"
            })
        }

        const storedToken = await RefreshToken.findOne({token: refreshToken});

        if(!storedToken || storedToken.expiresAt < new Date()){
            logger.warn("Invalid or expired refresh token")
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token"
            })
        }

        const user = await User.findById(storedToken.user);

        if(!user){
            logger.warn("User not found")
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateToken(user);

        // delete the old refresh token
        await RefreshToken.deleteOne({_id: storedToken._id});

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })

    }catch(e){
        logger.error("refreshToken error occured ", e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

// user logout
const logoutUser = async(req,res)=> {

    logger.info("loggout endpoint hit");

    try{
      
       const { refreshToken } = req.body;

          if(!refreshToken){
            logger.warn("Refresh token missing");
            return res.json({
                success: false,
                message: "Refresh token missing"
            })
        }

        await RefreshToken.deleteOne({token: refreshToken});

        logger.info("refresh deleted for loggout");

        res.json({
            success: true,
            message: "logged out"
        })

    }catch(e){
        logger.error("Error while loggout ", e);
        res.status(500).json({
            success: false,
            message: "Error while loggout"
        })
    }
}


module.exports = { registerUser, loginUser, createRefreshToken, logoutUser };