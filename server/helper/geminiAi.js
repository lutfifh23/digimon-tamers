const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const gemini = async (digimon) => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `give me a detail about digimon ${digimon}. 
Response must be a JSON format without \`\`\`json and \`\`\`

interface Digimon {
    appearance: {
        description: string;
        color: string;
        size: string;
        "other features": string;
    };
    personality: {
        traits: string[];
        description: string;
    };
    attacks: {
        name: string;
        description: string;
    }[];
    digivolutions: {
        stages: string[];
        description: string;
    };
    notable appearances: {
        series: string;
        role: string;
        partner: string;
    }[];
    trivia: {
        fact: string;
    }[];
}`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log(text);
    text = JSON.parse(text.trim())
    return text
}

module.exports = gemini