import jwt  from "jsonwebtoken";
import userModel from "../userModel/userModel.js";
import bcrypt from "bcrypt";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success:false, message: "User not Found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success:false,message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({success:true, message: "Login Successful", token });


    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};