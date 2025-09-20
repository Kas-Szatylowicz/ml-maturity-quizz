exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { email, score, maturityLevel, totalQuestions } = data;

    // Validate required fields
    if (!email || !score || !maturityLevel) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Log the submission (in production, you'd save to a database)
    console.log('Quiz submission received:', {
      email,
      score,
      maturityLevel,
      totalQuestions,
      timestamp: new Date().toISOString()
    });

    // Here you would typically:
    // 1. Save to a database (Airtable, Firebase, etc.)
    // 2. Send email via EmailJS, SendGrid, etc.
    // 3. Add to mailing list

    // For now, we'll just return success
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({
        success: true,
        message: 'Quiz results submitted successfully!',
        data: {
          email,
          maturityLevel,
          score: `${score}/${totalQuestions * 4}`
        }
      })
    };

  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};