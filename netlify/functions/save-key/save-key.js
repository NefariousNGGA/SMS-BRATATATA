const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { key, duration, maxAttacks } = JSON.parse(event.body);
    
    // Calculate expiration
    const expires = duration === 9999 ? null : new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString();
    
    const keyData = {
      created: new Date().toISOString(),
      active: true,
      duration: duration,
      maxAttacks: maxAttacks,
      usedAttacks: 0,
      expires: expires
    };

    // In a real app, we'd use a proper database
    // For now, we'll simulate with a simple object
    const keys = {
      ...keyData,
      // This is where we'd save to a real database
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        key: key,
        data: keyData 
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};