const { neon } = require('@neondatabase/serverless');

exports.handler = async (event) => {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    
    // Check if tables exist
    const keysTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'garou_keys'
      )
    `;
    
    const logsTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'attack_logs'
      )
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        garou_keys_table: keysTable[0].exists,
        attack_logs_table: logsTable[0].exists,
        message: 'Database check complete'
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};