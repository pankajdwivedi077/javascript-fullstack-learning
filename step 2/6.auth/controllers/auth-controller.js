const User = require('../models/user')
const bcrypt = require('bcryptjs');

// register controller
const registerUser = async(req, res) => {
    try{
      // extract user information from our request body
      const {username, email, password, role} = req.body;

      // check if the user is already exists in our database
      const checkExistingUser = await User.findOne({$or: [{username, email}]});

      if(checkExistingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exists either with same email or username, Please try with different username or email'
        })
      }

       // hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

       // create a new user and save in db
       const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
       })

       await newlyCreatedUser.save();

       if(newlyCreatedUser){
        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        })
       }else{
           res.status(400).json({
            success: false,
            message: 'Unable to register user'
        })
       }

    }catch(e){
        console.log('error in registerUser ', e);
        res.status(500).json({
            success: false,
            message: 'some error occured! please try again'
        })
    }
}

// login 
const loginUser = async(req, res) => {
    try{

    }catch(e){
        console.log('error in loginUser ', e);
        res.status(500).json({
            success: false,
            message: 'some error occured! please try again'
        })
    }
}

module.exports = {
    loginUser,
    registerUser
};