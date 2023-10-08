import User from "../model/userModel.js"
import bcrypt from "bcrypt"

export const createNewUser = async (req) => {

    // console.log({name,age,gender});

    // if (!name || !gender || !age){
    //     res.status(400).json({message:"All Fields are mandatory"})
    // }
    const { firstname, lastname, username, email, password, contact, address, age, gender } = req.body;   // req users field for new user creation

    const hashedPassword = await bcrypt.hash(password, 10); // password encryption, 10 means password length

    // new user created
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
    return newUser;

}

export function getAllUserData() {
    return User.find()
}

export function getSingleUserData(req) {
    const { username } = req.params;
    return User.findOne({ username: username });
}

export function updateSingleUserData(req) {
    const { id } = req.params;
    return User.findByIdAndUpdate(id, req.body, {
        new: true
    })
}

export function deleteSingleUserData(req) {
    const { id } = req.params;
    return User.findByIdAndDelete(id);
}