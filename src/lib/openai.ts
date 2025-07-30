import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateContentIdeas(niche: string, platform: string, count: number = 5) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are an expert social media marketing strategist specializing in ${platform}. Generate viral content ideas that create pattern interrupts - content that stops users from scrolling by being unexpected, emotionally charged, or representing opportunity/threat.`
      },
      {
        role: "user",
        content: `Generate ${count} viral content ideas for the ${niche} niche on ${platform}. Each idea should include:
        1. A hook/title that creates pattern interrupt
        2. Brief description of the content
        3. Why it would stop users from scrolling
        
        Focus on trending topics and unexpected angles that would make someone stop scrolling immediately.`
      }
    ],
    temperature: 0.8,
  })

  return response.choices[0].message.content
}

export async function generateScript(idea: string, brand: string, tone: string = "casual") {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a viral video script writer. Create scripts that hook viewers in the first 3 seconds and maintain engagement throughout. Use the ${tone} tone and align with ${brand} brand voice.`
      },
      {
        role: "user",
        content: `Create a video script for this content idea: "${idea}"
        
        The script should:
        - Hook viewers in first 3 seconds
        - Include visual cues and directions
        - Be optimized for short-form content (15-60 seconds)
        - Create pattern interrupt to stop scrolling
        - Include a clear call-to-action
        
        Brand: ${brand}
        Tone: ${tone}`
      }
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content
}

export async function generateHashtags(content: string, platform: string, niche: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a hashtag optimization expert for ${platform}. Generate hashtags that maximize reach and engagement for the ${niche} niche.`
      },
      {
        role: "user",
        content: `Generate optimized hashtags for this content: "${content}"
        
        Platform: ${platform}
        Niche: ${niche}
        
        Provide:
        - 5 high-volume hashtags (broad reach)
        - 10 medium-volume hashtags (targeted audience)
        - 5 low-volume hashtags (niche community)
        
        Format as a simple list without explanations.`
      }
    ],
    temperature: 0.3,
  })

  return response.choices[0].message.content
}

export default openai