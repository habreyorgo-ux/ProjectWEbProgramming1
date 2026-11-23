const db=require('../config/db');

 async function createBooking(userId,ClassId){

    const query = 'INSERT INTO bookings (user_id, class_id) VALUES (?, ?)';
        const [result] = await db.execute(query, [userId, classId]);
        return result.insertId;

 }

 async function searchBookingsByUserId(userId){

      const query = `
            SELECT bookingsbooking_id, classes.class_name, classes.trainer_id, classes.schedule_time, bookings.booking_date 
            FROM bookings 
            JOIN classes ON bookings.class_id = classes.id 
            WHERE bookings.user_id = ?
        `;
        const [rows] = await db.execute(query, [userId]);
        return rows;

 }

 async function deleteBooking(bookingId,courseId){

    const query = 'DELETE FROM bookings WHERE id = ? AND user_id = ?';
        const [result] = await db.execute(query, [bookingId, userId]);
        return result.affectedRows;
        
 }