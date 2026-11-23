const db = require('../config/db');

async function updateTrainer(trainerId, specialization, bio, experienceYears) {
        const query = `
            UPDATE trainers 
            SET specialization = ?, bio = ?, experience_years = ? 
            WHERE trainer_id = ?
        `;
        const [result] = await db.execute(query, [specialization, bio, experienceYears, trainerId]);
        return result.affectedRows;
    }

async function  getAllTrainers() {
        const query = `
            SELECT 
                trainers.trainer_id,
                trainers.specialization,
                trainers.bio,
                trainers.experience_years,
                users.first_name,
                users.last_name,
                users.email,
                users.username
            FROM trainers
            JOIN users ON trainers.user_id = users.id
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
async function getTrainerById(trainerId) {
    const query = `
        SELECT 
            trainers.trainer_id,
            trainers.user_id,
            trainers.specialization,
            trainers.bio,
            trainers.experience_years,
            users.first_name,
            users.last_name,
            users.email,
            users.username
        FROM trainers
        JOIN users ON trainers.user_id = users.id
        WHERE trainers.trainer_id = ?
    `;
    const [rows] = await db.execute(query, [trainerId]);
    return rows[0];
}
module.exports=[updateTrainer,
    getAllTrainers,
    getTrainerById,
]