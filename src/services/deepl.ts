const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY || '';

export const deeplService = {
  async translate(text: string, targetLang: string, sourceLang?: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('target_lang', targetLang.toUpperCase());
    if (sourceLang) params.append('source_lang', sourceLang.toUpperCase());

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) throw new Error('Translation failed');
    const data = await response.json();
    return data.translations[0]?.text || text;
  }
};
