import mongoose from "mongoose";

//user schema/data
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    age:{
        type:Number,
    },
    gender:{
        type: String,
    },
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
    },
    address:{
        type: String,

    }
    // image:{ and isAdmin still remaining
    //     type: String,
    // }

})

//calling model function contain param User name of our schema in mongoDB compass.
const schema = mongoose.model("User", userSchema);
export default schema;