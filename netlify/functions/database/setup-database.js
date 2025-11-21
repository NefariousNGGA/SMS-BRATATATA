const { neon } = require('@neondatabase/serverless');

exports.handler = async (event) => {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    
    console.log('🔧 Setting up database tables...');
    
    // Create garou_keys table
    await sql`
      CREATE TABLE IF NOT EXISTS garou_keys (
        key TEXT PRIMARY KEY,
        created TIMESTAMP DEFAULT NOW(),
        active BOOLEAN DEFAULT TRUE,
        duration INTEGER DEFAULT 30,
        max_attacks INTEGER DEFAULT 100,
        used_attacks INTEGER DEFAULT 0,
        expires TIMESTAMP,
        owner TEXT DEFAULT 'admin'
      )
    `;
    
    // Create attack_logs table
    await sql`
      CREATE TABLE IF NOT EXISTS attack_logs (
        id SERIAL PRIMARY KEY,
        key TEXT REFERENCES garou_keys(key),
        target_number TEXT,
        service_used TEXT,
        success BOOLEAN,
        attacked_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('✅ Database tables created successfully!');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Database setup complete! Tables are ready.' 
      })
    };
    
  } catch (error) {
    console.error('❌ Database setup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};