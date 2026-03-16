import bcrypt from "bcrypt"
import userModel from "../userModel/userModel.js";





export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.json({ success: true, message: "User Registered Successfully" })



    } catch (error) {
        res.json({ success: false, message: error.message })

    }
};