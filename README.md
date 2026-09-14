# 🎮 Minecraft Mod Generator - AI Powered

A free, AI-powered website that generates custom Minecraft mods using Google's Gemini AI. Choose your Minecraft version (Java or Bedrock) and let the AI create a mod for you!

## ✨ Features

- ✨ **AI-Powered Mod Generation** - Uses Google Gemini AI to create realistic mod code
- 🏗️ **Version Support** - Works with Minecraft versions 1.12.x through 1.20.x
- 📦 **Edition Selection** - Generate mods for both Java and Bedrock editions
- 💻 **Code Generation** - Get real, usable mod code samples
- 📥 **Download** - Export your generated mod configuration

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Google Gemini API Key (already configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chicolenard-max/minecraft-mod-generator.git
   cd minecraft-mod-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **API Key is already configured in .env**
   - The Gemini API Key is already set up
   - No additional configuration needed!

4. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

5. **Open the website**
   - Open `index.html` in your browser (or use a local server)
   - You can use Python: `python -m http.server 8000`
   - Then visit: `http://localhost:8000`

## 📝 How to Use

1. **Select Minecraft Version** - Choose from available versions (1.12.x to 1.20.x)
2. **Choose Edition** - Select Java or Bedrock edition
3. **Name Your Mod** - Give your mod a creative name
4. **Describe the Mod** - Tell the AI what features you want
5. **Generate** - Click "Generate Mod with AI"
6. **Download** - Get your generated mod configuration

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js + Express
- **AI**: Google Gemini AI API
- **Styling**: Custom CSS with responsive design

## 📂 Project Structure

```
minecraft-mod-generator/
├── index.html          # Main website
├── styles.css          # Styling
├── script.js           # Frontend logic
├── backend.js          # Express server + Gemini AI
├── package.json        # Node dependencies
├── .env                # API configuration
└── README.md           # This file
```

## 🔑 Environment Variables

The `.env` file contains:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

## ⚠️ Important Notes

- Keep your API key secret! Don't commit it to public repositories
- The backend must be running for the frontend to work
- Make sure both frontend and backend are running on compatible ports
- Generated mods are code samples and templates - additional configuration may be needed for full mod compilation

## 🐛 Troubleshooting

**"Backend server is not running" error**
- Make sure you ran `npm start` in the project directory
- Check that port 5000 is not already in use

**CORS errors**
- Ensure the backend is running on `http://localhost:5000`
- Check that CORS is enabled in `backend.js`

**API errors**
- Verify your Gemini API key is correct in `.env`
- Check your internet connection
- Make sure you have API quota available

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

---

**Made with ❤️ for Minecraft modders everywhere**
