//importing functions from services file

import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import nodeMailer from "nodemailer"
import crypto from "crypto"

//create user method
export const createUser = async (req, res) => {
    try {

        const { firstname, lastname, username, email, password, contact, address, age, gender } = req.body;   // req users field for new user creation

    const hashedPassword = await bcrypt.hash(password, 10); // password encryption, 10 means password length

        // checking if user already exist by email
        //const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email already exists, please try logging in." });
        }

        // new register user
        const newUser = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            contact,
            address,
            age,
            gender
    
        })

       // const newUser = await createNewUser(req);
        if (newUser) {
            return res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// user log in
export const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body; // req incoming
        const user = await User.findOne({ email }); // finding email and storing email it in variable user
        if (!user) {
            return res.status(400).json({ message: "Email not register" }); //checking if email is register or not
        }
        const comparePassword = await bcrypt.compare(password, user.password); // comparing both password one the client writing and one which is store in database
        if (!comparePassword) {
            return res.status(400).json({ message: "Incorrect Password" }); //checking if password is correct or not
        }

        res.status(200).json({ message: "Login Successfully" }) //all good
    } catch (error) {
        res.status(401).json({ message: error.message }); //something wrong
    }
}

// user forget password, otp is sent it through email
export const userForgetPassword = async (req, res) => {
    try {
        const { email } = req.body; 
        const user = await User.findOne({ email }); // finding email and storing email it in variable user
        if (!user) {
            return res.status(400).json({ message: "Email not register" }); //checking if email is register or not
        }
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "sohailahmedwork1@gmail.com",
                pass: "jokk kqju hpbo weos" // password created from google account app
            }
        })
        const otpLength = 6;
        const otpGeneratorToken = crypto.randomBytes(otpLength).toString('hex'); // random otp generate from crypto  
        user.resetOtpToken = otpGeneratorToken;
        await user.save();
        
        const mailOption = {
            from: "sohailahmedwork1@gmail.com",
            to: email,
            subject: "Sending email",
            text: `your otp is: ${otpGeneratorToken}`,
        }

        transporter.sendMail(mailOption);

        res.status(200).json({ message: `OTP sent to ${email} and this OTP is valid till ???` })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// otp verification, user otp is same as ours. and checking user type otp in given time or not
export const userOtpVerify = async (req, res) => {
    try {
        const {id} = req.params;
        const{otpValue, newPassword, confirmNewPassword} = req.body;
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({ message: "user not register" });
        }
        const expirationTime = Date.now() + 30 * 60 * 1000;
        const otpData = {
            otp: user.resetOtpToken,
            expiresAt: expirationTime,
        };
        const providedOtp = otpValue;  // issue resolve
        const currentTimestamp = Date.now();

        // Check if the OTP is expired
        if (currentTimestamp <= otpData.expiresAt) {
            if (providedOtp === otpData.otp) {
                if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
                    // Update the user's password with the new one
                    const hashedPassword = await bcrypt.hash(newPassword, 10);

                    user.password = hashedPassword;
                    
                    await user.save();
                    return res.status(200).json({ message: "OTP is valid, and password has been updated" });
                } else {
                    return res.status(400).json({ message: "Password and confirm password do not match" });
                }
            } else {
                return res.status(400).json({ message: "Invalid OTP" });
            }
        } else {
            return res.status(400).json({ message: "OTP is expired" });
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}


//get all user function
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
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
        const { username } = req.params;
        const user = await User.findOne({ username: username });
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
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })

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
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ message: "Successfully deleted User" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};