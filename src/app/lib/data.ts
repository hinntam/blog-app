import { createClient } from '@vercel/postgres';
import { sql } from '@vercel/postgres';
export async function connectToDB(){
    const client = createClient();
    await client.connect();
    try {
        if(client){
            console.log('Connected to DB');
            return client;
        }
    } catch (error) {
        console.error('Error connecting to DB', error);
    }
}
export async function getPosts(){
    try {
        const data = await sql`SELECT * FROM posts`;
        console.log(data.rows);
        return data.rows;
    } catch (error) {
        console.error('Error getting posts', error);
    }
}