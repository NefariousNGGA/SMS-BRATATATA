const { neon } = require('@neondatabase/serverless');

// Get database connection
const getSQL = () => {
  return neon(process.env.NETLIFY_DATABASE_URL);
};

// Save a new key to database
exports.saveKey = async (key, duration, maxAttacks) => {
  const sql = getSQL();
  
  const expires = duration === 9999 ? null : new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
  
  await sql`
    INSERT INTO garou_keys (key, duration, max_attacks, expires)
    VALUES (${key}, ${duration}, ${maxAttacks}, ${expires})
  `;
};

// Get a key from database
exports.getKey = async (key) => {
  const sql = getSQL();
  
  const result = await sql`
    SELECT * FROM garou_keys WHERE key = ${key}
  `;
  
  return result[0] || null;
};

// Get all keys from database
exports.getAllKeys = async () => {
  const sql = getSQL();
  
  const result = await sql`
    SELECT * FROM garou_keys ORDER BY created DESC
  `;
  
  return result;
};