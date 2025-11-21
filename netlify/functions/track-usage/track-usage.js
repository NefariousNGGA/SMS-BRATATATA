exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { key, attacksUsed = 1 } = JSON.parse(event.body);
        
        console.log(`Tracked ${attacksUsed} attacks for key: ${key}`);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                tracked: attacksUsed,
                message: 'Usage tracked successfully'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false, 
                error: 'Tracking failed' 
            })
        };
    }
};
