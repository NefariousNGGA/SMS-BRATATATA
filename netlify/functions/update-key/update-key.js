exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { key, action } = JSON.parse(event.body);
        
        // For now, just log the action - we'll implement real database later
        console.log(`Action: ${action} on key: ${key}`);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: `${action} action completed for ${key}` 
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