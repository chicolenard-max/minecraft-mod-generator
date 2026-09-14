// backend.js - Node.js server with Gemini AI integration
// Install dependencies: npm install express cors dotenv @google/generative-ai

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Route to generate mod
app.post('/api/generate-mod', async (req, res) => {
    try {
        const { version, edition, description, modName } = req.body;

        // Validation
        if (!version || !edition || !description || !modName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create prompt for Gemini AI
        const prompt = `You are an expert Minecraft mod developer. Generate a detailed Minecraft ${edition} mod called "${modName}" for version ${version}.

Mod Description: ${description}

Please provide:
1. A detailed list of features (5-7 features)
2. Sample code appropriate for ${edition} edition (Java for Java Edition, JSON for Bedrock)
3. Crafting recipes or configuration details
4. Installation instructions

Format your response clearly with sections for FEATURES, CODE, RECIPES, and INSTRUCTIONS.

Make it detailed and realistic for a Minecraft mod.`;

        // Call Gemini AI
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse the response
        const modData = {
            name: modName,
            version: version,
            edition: edition,
            features: extractFeatures(text),
            code: extractCode(text),
            recipes: extractRecipes(text),
            instructions: extractInstructions(text),
            fullResponse: text
        };

        res.json(modData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate mod', details: error.message });
    }
});

// Helper functions to extract information from text
function extractFeatures(text) {
    const featureSection = text.split(/FEATURES|Features/i)[1] || text;
    const lines = featureSection.split('\n').filter(line => line.trim() && line.includes('-'));
    return lines.slice(0, 7).map(line => line.replace(/^[\-\*]\s*/, '').trim());
}

function extractCode(text) {
    const codeMatch = text.match(/```([\s\S]*?)```/);
    if (codeMatch) return codeMatch[1].trim();
    
    const codeSection = text.split(/CODE|Code/i)[1] || text;
    const lines = codeSection.split('\n').slice(0, 15);
    return lines.join('\n').trim();
}

function extractRecipes(text) {
    const recipeSection = text.split(/RECIPES|Recipes/i)[1] || '';
    return recipeSection.split(/INSTRUCTIONS|Installation/i)[0].trim() || 'Crafting recipes available in mod config files';
}

function extractInstructions(text) {
    const instrSection = text.split(/INSTRUCTIONS|Installation/i)[1] || text;
    const lines = instrSection.split('\n').filter(line => line.trim()).slice(0, 5);
    return lines.join('\n').trim() || '1. Download the mod file\n2. Place in mods folder\n3. Launch Minecraft';
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Minecraft Mod Generator server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/generate-mod`);
    console.log(`✅ Gemini AI connected`);
});
