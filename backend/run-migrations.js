import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting migrations...');
console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function runMigrations() {
    console.log('Connecting to database...');
    const client = await pool.connect();
    console.log('Connected to database successfully');
    
    try {
        // Start a transaction
        console.log('Starting transaction...');
        await client.query('BEGIN');

        // Read and execute each migration file
        const migrationsDir = path.join(__dirname, 'migrations');
        console.log('Reading migrations from:', migrationsDir);
        
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort();
            
        console.log('Found migration files:', migrationFiles);

        for (const file of migrationFiles) {
            console.log(`\nRunning migration: ${file}`);
            const migrationPath = path.join(migrationsDir, file);
            const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
            console.log('Executing SQL...');
            await client.query(migrationSQL);
            console.log(`Migration ${file} completed successfully`);
        }

        // Commit the transaction
        console.log('\nCommitting transaction...');
        await client.query('COMMIT');
        console.log('All migrations completed successfully');
    } catch (error) {
        // Rollback the transaction on error
        console.error('\nError during migration:', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        console.log('Releasing database connection...');
        client.release();
        console.log('Database connection released');
    }
}

// Run migrations
console.log('Starting migration process...');
runMigrations()
    .then(() => {
        console.log('Migration process completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration process failed:', error);
        process.exit(1);
    }); 