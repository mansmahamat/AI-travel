import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: "",
})
const openai = new OpenAIApi(configuration)

const generatePrompt = (req: NextApiRequest): string => {
  const {
    destinationCountry,
    budget,
    travelStyle,
    accommodationType,
    interestsNew,
    transportationType,
    tripDuration,
    activityType,
    language,
    cuisineType,
  } = req.body
  let prompt = `Generate a personalized travel itinerary for a trip to ${destinationCountry} with a budget of ${budget}. The traveler is interested in a ${travelStyle} vacation and enjoys ${interestsNew}. They are looking for ${accommodationType} accommodations and prefer ${transportationType} transportation. The itinerary should include ${activityType} activities and ${cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${language}. `
  return prompt
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req),
      temperature: 0.6,
      max_tokens: 2048,
    })
    res.status(200).json({
      result: completion.data.choices[0].text,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        message: "An error occurred during the request.",
      },
    })
  }
}

export default handler
