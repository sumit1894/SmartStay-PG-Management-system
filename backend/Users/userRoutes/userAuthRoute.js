import express from "express"
import { register } from "../userController/userRegister.js";
import { login } from "../userController/userLogin.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router=express.Router();

router.post("/register",register)
router.post("/login",login)

router.get("/profile",authMiddleware,(req,res)=>{
    res.json({message:"Welcome to your profile",user:req.user});
})

export default router;