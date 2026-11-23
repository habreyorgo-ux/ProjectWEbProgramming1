const db= require('../config/db');



async function getPaymentByMember(memberId){

      const query = `
            SELECT * FROM payments 
            WHERE member_id = ?
            ORDER BY payment_date DESC
        `;
        const [rows] = await db.execute(query, [memberId]);
        return rows;

}