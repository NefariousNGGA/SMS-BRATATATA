exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { key } = JSON.parse(event.body);
        
        if (!key || !key.startsWith('Garou-')) {
            return {
                statusCode: 400,
                body: JSON.stringify({ valid: false, error: 'Invalid key format' })
            };
        }

        // REAL VALIDATION LOGIC
        // For now, we'll accept any Garou key and track usage
        // In Phase 2, we'll add proper database checks
        
        const attacksLeft = 100; // Default
        const maxAttacks = 100;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                valid: true,
                key: key,
                attacksLeft: attacksLeft,
                maxAttacks: maxAttacks,
                expires: '2024-12-31'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ valid: false, error: 'Server error' })
        };
    }
};