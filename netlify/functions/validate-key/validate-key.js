exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { key } = JSON.parse(event.body);
        
        if (!key || !key.startsWith('Garou-')) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    valid: false, 
                    error: 'Invalid key format' 
                })
            };
        }

        // For now, always return valid - we'll add real validation later
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                valid: true,
                key: key,
                attacksLeft: 50,
                maxAttacks: 100,
                expires: '2024-12-31'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                valid: false, 
                error: 'Server error' 
            })
        };
    }
};
