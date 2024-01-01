const mongoose = require("mongoose");
const Login = require("./loginModel");

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *         - age
 *         - email
 *         - password
 *         - date
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *           default : abhinav51
 *           unique: true
 *           required: true
 *         firstname:
 *           type: string
 *           description: The first name of the user.
 *           default : prateek
 *           required: true
 *         lastname:
 *           type: string
 *           description: The last name of the user.
 *           default :  verma
 *           required: true
 *         age:
 *           type: number
 *           description: The age of the user.
 *           default : 21
 *           required: true
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           default : vikramsi213@gmail.com
 *           unique: true
 *           required: true
 *         password:
 *           type: string
 *           description: The password of the user.
 *           default : qwert123
 *           required: true
 */



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('remove', async function (next) {
    try {
        // Use deleteOne instead of deleteMany for a single document
        await Login.deleteOne({ email: this.email });
        next();
    } catch (error) {
        return res.status(402).json({
            message:"failed to delete login Details",
            error:error.message
        })
    }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
