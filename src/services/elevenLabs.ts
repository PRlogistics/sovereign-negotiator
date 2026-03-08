/// <reference types="vite/client" />

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

export interface VoiceCloneResponse {
  voice_id: string;
  name: string;
}

export const elevenLabsService = {
  async cloneVoice(audioBlob: Blob, voiceName: string): Promise<VoiceCloneResponse> {
    const formData = new FormData();
    formData.append('name', voiceName);
    formData.append('files', audioBlob, 'voice_sample.webm');

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: { 'xi-api-key': ELEVENLABS_API_KEY },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to clone voice');
    return response.json();
  },

  async generateSpeech(voiceId: string, text: string): Promise<Blob> {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      }),
    });

    if (!response.ok) throw new Error('Failed to generate speech');
    return response.blob();
  }
};
