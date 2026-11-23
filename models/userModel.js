const db=require('../config/db');
const bcrypt=require('bcrypt');
async function findByUsername(username) {
    
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.execute(query, [username]);
        return rows[0];
    }
 
 async function create(username,email,firstname,lastname,password){
    
    const existingUser = await this.findByUsername(username);
if (existingUser) {
    throw new Error('Username is already taken.');
}

    const saltRounds=10;
    const hashpass=await bcrypt.hash(password,saltRounds);
    const query ='INSERT INTO users (username,password_hash,first_name,last_name,email,role) VALUES (?,?,?,?,?,"member")';
    const result=db.execute(query,[username,hashpass,firstname,lastname,email]);
    return result.resultId

}

async function findbyId(id){

    const query = 'SELECT id, username, first_name, last_name, email, role, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];

    }
module.exports={findByUsername,create,findbyId};