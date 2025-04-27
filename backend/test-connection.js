import { Pool } from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set!');
    console.log('Current environment variables:', process.env);
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log('กำลังทดสอบการเชื่อมต่อฐานข้อมูล...');
        console.log('Database URL:', process.env.DATABASE_URL);
        
        const client = await pool.connect();
        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ!');
        
        // ทดสอบการอ่านข้อมูล
        const result = await client.query('SELECT NOW() as current_time');
        console.log('เวลาปัจจุบันในฐานข้อมูล:', result.rows[0].current_time);
        
        // ทดสอบการอ่านตาราง chat_history
        try {
            const chatResult = await client.query('SELECT COUNT(*) FROM chat_history');
            console.log('จำนวนข้อมูลในตาราง chat_history:', chatResult.rows[0].count);
        } catch (error) {
            console.log('ตาราง chat_history ยังไม่มีข้อมูล');
        }
        
        client.release();
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
    } finally {
        await pool.end();
    }
}

testConnection(); 