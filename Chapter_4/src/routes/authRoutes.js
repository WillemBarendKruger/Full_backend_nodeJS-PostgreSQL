import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  prisma  from "../prismaClient.js";

const router = express.Router();

// Register a new user endpoint /auth/register
router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    // save the usee@gmail.com,  and unreversable password: y28yerb3yb

    //enrypt the password
    const hasedPassword = bcrypt.hashSync(password, 8);
    // console.log(hasedPassword);

    //save teh new user and secure password to the db
    try {
        const user = await prisma.user.create({
            data:{
                username,
                password: hasedPassword
            }
        })

        // A default todo
        const defaultTodo = `Hello :) Add your first todo`;
        await prisma.todo.create({
            data:{
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({token})
    } catch (error) {
        console.log(error.message);
        req.sendStatus(503);
    }
});

router.post("/login", async (req, res) => {
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it's encrypted, which means that we cannot
    // compare it to the one the user just used trying to login
    // so what we can to do, is again, one way encrypt the password the user just entered

    const {username, password} = req.body;

    try {
        
        const user = await prisma.user.findUnique({
            where:{
                username: username,
            }
        })

        if(!user){
            return res.status(404).send({message: "User not found"});
        };

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        // if password is incorrect return out of the function
        if(!passwordIsValid){
            return res.status(401).send({message: "Invalid password"});
        };
        console.log(user);

        // then we have a susefull auth
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }

});

export default router