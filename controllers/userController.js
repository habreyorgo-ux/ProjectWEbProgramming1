const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
class userController{
     static async  register(req,res){
 try{
      const {username,email,firstname,lastname,password}=req.body;
   
     if(!username||!email||!firstname||!lastname||!password){
           return res.status(400).json({error:"error:all fields are required"});
        }
 
     const userCreate =userModel.create(username,email,firstname,lastname,password);
     return res.json({message:'user created successfully'});

    }catch(error){
       return res.error(400).json({error:'error found'});
    }
}

static async  getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await userModel.findbyId(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
static async  checkUsernameAvailability(req, res) {
        try {
            const { username } = req.query;

            if (!username) {
                return res.status(400).json({ error: 'Username is required.' });
            }

            const existingUser = await userModel.findByUsername(username);

            if (existingUser) {
                return res.status(409).json({ error: 'Username already exists.' });
            }

            return res.status(200).json({ available: true, message: 'Username is available.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


static async login(req,res){
    try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required.' });
            }

            const user = await userModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }

            res.cookie('userId', user.id, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                message: 'Logged in successfully.',
                user: {
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
}

static async  logout(req,res) {
    try {
            res.clearCookie('userId');
            return res.status(200).json({ message: 'Logged out successfully.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    
}
static async  getCurrentUser(req,res) {
    try {
            const userId = req.cookies?.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized. Please log in first.' });
            }

            const user = await userModel.findbyId(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    
}
}


module.exports=userController;