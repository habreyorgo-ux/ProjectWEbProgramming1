const db=require('../config/db');


async function getAllClasses() {

        const query = 'SELECT * FROM classes';
        const [rows] = await db.execute(query);
        return rows;

    }

async function findByIdClass(id) {
        const query = 'SELECT * FROM classes WHERE class_id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    } 

async function createClass(className, trainerId,day, StartTime,EndTime, capacity) {

        const query = `
            INSERT INTO classes (class_name, trainer_id,schedule_day, start_time,end_time, capacity) 
            VALUES (?, ?, ?, ?,?,?)
        `;
        const [result] = await db.execute(query, [className, trainerId,day, StartTime,EndTime, capacity]);
        return result.insertId;
    }

    async function SearchByClassName(ClassName){

        const query = 'SELECT * FROM classes WHERE classes.class_name=?';
        const [rows] = await db.execute(query,ClassName);
        return rows;


    }
    module.exports=[getAllClasses,createClass,SearchByClassName];