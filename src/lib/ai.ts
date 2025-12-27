import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.SmartFlow_Hub || process.env.ANTHROPIC_API_KEY || '',
});

export async function queryAI(messages: Array<{role: string; content: string}>) {
  try {
    if (!process.env.SmartFlow_Hub && !process.env.ANTHROPIC_API_KEY) {
      return { reply: '⚠️ API key not configured in Replit Secrets' };
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: messages as Array<{role: 'user' | 'assistant'; content: string}>,
    });

    const textContent = response.content.find(block => block.type === 'text');
    return { reply: textContent?.type === 'text' ? textContent.text : 'No response' };
  } catch (error) {
    console.error('Claude API error:', error);
    return { reply: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
