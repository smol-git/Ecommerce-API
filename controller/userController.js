//importing functions from services file
import { createNewUser, getAllUserData, deleteSingleUserData, getSingleUserData, updateSingleUserData } from "../services/userServices.js";
import User from "../model/userModel.js"
import bcrypt from "bcrypt"

//create user method
export const createUser = async (req, res) => {
    try {

        // checking if user already exist by email
        const{email} =req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
           return res.status(200).json({ message: "Email already exists, please try logging in." });
        }

        // new register user
        const newUser = await createNewUser(req);
        if(newUser){
           return res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// user log in
export const userLogIn = async(req, res) => {
try{
    const {email, password} = req.body; // req incoming
    const user = await User.findOne({email}); // finding email and storing email it in variable user
    if(!user){
        return res.status(400).json({message: "Email not register"}); //checking if email is register or not
    }
    const comparePassword = await bcrypt.compare(password, user.password); // comparing both password one the client writing and one which is store in database
    if(!comparePassword){
        return res.status(400).json({message: "Incorrect Password"}); //checking if password is correct or not
    }

    res.status(200).json({message: "Login Successfully"}) //all good
}catch(error){
    res.status(401).json({message: error.message}); //something wrong
}
}

export const userForgetPassword = async(req, res) => {
 try{
    const{email} = req.body;
    const user = await User.findOne({email}); // finding email and storing email it in variable user
    if(!user){
        return res.status(400).json({message: "Email not register"}); //checking if email is register or not
    }
    if(user){
        res.status(200).json({message: "Email is register, check email for OTP"})  // How to send OTP to user
    }      
    
 }catch(error){
    res.status(400).json({message: error.message})
 }

}


//get all user function
export const getAllUser = async (req, res) => {
    try {
        const users = await getAllUserData();
        if (users) {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//get single user by there specific data 
export const getSingleUser = async (req, res) => {
    try {
        // const {age} = req.params;
        const user = await getSingleUserData(req);
        if (user) {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

//update single user by id
export const updateSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await updateSingleUserData(req);
        if (user) {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

//delete single user by id
export const deleteSingleUser = async (req, res) => {
    try {

        const user = await deleteSingleUserData(req);
        if (user) {
            res.status(200).json({ message: "Successfully deleted User" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};