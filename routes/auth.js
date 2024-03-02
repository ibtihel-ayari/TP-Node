//create router register, login 
const express =require ('express');
const bcrypt =require ('bcryptjs');
const jwt =require ('jsonwebtoken');
const User =require ('../models/user');
const router =express.Router();

router.post('/register', async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user =new User ({username, password})
        await user.save();
        res.status(201).send(error.message)
    }catch(error){
        res.status(400).send(error.message)
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("User not found.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }
        const token = jwt.sign({ username: user.username }, 'your_secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
