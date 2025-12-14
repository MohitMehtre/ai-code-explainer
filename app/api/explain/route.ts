import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !code.trim()) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are a helpful coding instructor. Explain the following ${language} code in a beginner-friendly way.

Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Please provide your explanation in the following JSON format:
{
  "simpleExplanation": "A brief, simple explanation of what the code is (2-3 sentences)",
  "whatItDoes": "A detailed explanation of what the code does step by step (3-5 sentences)",
  "realWorldAnalogy": "A real-world analogy that helps understand the code's purpose (2-3 sentences)"
}

Make sure the explanations are:
- Beginner-friendly and easy to understand
- Clear and concise
- Use simple language, avoiding jargon when possible
- The analogy should be relatable and memorable

Return ONLY valid JSON, no markdown formatting or additional text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful coding instructor. Always respond with valid JSON only, no markdown or additional formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    const explanation = JSON.parse(responseContent);

    // Validate the response structure
    if (
      !explanation.simpleExplanation ||
      !explanation.whatItDoes ||
      !explanation.realWorldAnalogy
    ) {
      throw new Error('Invalid response format from OpenAI');
    }

    return NextResponse.json(explanation);
  } catch (error) {
    console.error('Error explaining code:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse explanation response' },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key is invalid or missing' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to explain code. Please try again.' },
      { status: 500 }
    );
  }
}

