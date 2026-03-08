const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const openaiService = {
  async generateStrategy(units: number, maxPrice: number, targetPrice: number, style: string): Promise<any> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are a negotiation expert. Analyze: ${units} units, max $${maxPrice}, target $${targetPrice}, style: ${style}. Return JSON with openingAnchor, concessionStrategy, walkAwayPoint, successProbability.`
        }],
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) throw new Error('Failed to generate strategy');
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  },

  async generateResponse(context: string[], goal: string, maxPrice: number): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are a negotiator. Max price: $${maxPrice}. Goal: ${goal}. Be professional.`
        }, {
          role: 'user',
          content: `History: ${context.join('\n')}\nGenerate next response.`
        }],
        max_tokens: 150
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
};
