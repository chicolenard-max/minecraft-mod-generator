// Get DOM elements
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
const minecraftVersionSelect = document.getElementById('minecraft-version');
const editionRadios = document.querySelectorAll('input[name="edition"]');
const modDescriptionInput = document.getElementById('mod-description');
const modNameInput = document.getElementById('mod-name');
const resultsSection = document.getElementById('results-section');
const resultContent = document.getElementById('result-content');
const loadingDiv = document.getElementById('loading');

// API configuration - Dynamic URL detection for mobile and desktop
let API_URL;

function getAPIUrl() {
    // Check if running on localhost (desktop development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api/generate-mod';
    }
    
    // For production, use your deployed backend URL
    // Replace with your Vercel, Railway, or other deployment URL
    const deployedBackend = window.location.origin.replace('minecraft-mod-generator', 'minecraft-mod-generator-api');
    return `${deployedBackend}/api/generate-mod`;
}

API_URL = getAPIUrl();

let currentModData = null;

// Event listeners
generateBtn.addEventListener('click', generateMod);
resetBtn.addEventListener('click', resetForm);
downloadBtn.addEventListener('click', downloadMod);

// Improve touch responsiveness
if ('ontouchstart' in window) {
    document.body.classList.add('touch-enabled');
}

// Get selected edition
function getSelectedEdition() {
    const selected = document.querySelector('input[name="edition"]:checked');
    return selected ? selected.value : 'java';
}

// Main generate function
async function generateMod() {
    const version = minecraftVersionSelect.value;
    const edition = getSelectedEdition();
    const description = modDescriptionInput.value.trim();
    const modName = modNameInput.value.trim();

    // Validation
    if (!version) {
        alert('Please select a Minecraft version');
        minecraftVersionSelect.focus();
        return;
    }
    if (!description) {
        alert('Please describe what you want your mod to do');
        modDescriptionInput.focus();
        return;
    }
    if (!modName) {
        alert('Please enter a mod name');
        modNameInput.focus();
        return;
    }

    // Show results section and loading
    resultsSection.style.display = 'block';
    loadingDiv.style.display = 'block';
    resultContent.innerHTML = '';
    downloadBtn.style.display = 'none';
    generateBtn.disabled = true;

    // Scroll to results on mobile
    if (window.innerWidth <= 600) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
        // Call backend API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version,
                edition,
                description,
                modName
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const modData = await response.json();
        currentModData = modData;

        // Hide loading and display results
        loadingDiv.style.display = 'none';
        displayModResults(modData);
        downloadBtn.style.display = 'inline-block';
    } catch (error) {
        loadingDiv.style.display = 'none';
        let errorMessage = error.message;
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Backend server is not running. Please ensure the API is deployed and accessible.';
        }
        
        resultContent.innerHTML = `<p style="color: #e74c3c;">❌ Error: ${errorMessage}</p>`;
        console.error('Error:', error);
        console.error('API URL being used:', API_URL);
    } finally {
        generateBtn.disabled = false;
    }
}

// Display mod results
function displayModResults(modData) {
    const featuresHtml = Array.isArray(modData.features)
        ? modData.features.map(f => `<li>${f}</li>`).join('')
        : `<li>${modData.features}</li>`;

    const html = `
        <h3>✅ Mod Generated Successfully!</h3>
        <p><strong>Mod Name:</strong> ${modData.name}</p>
        <p><strong>Minecraft Version:</strong> ${modData.version}</p>
        <p><strong>Edition:</strong> ${modData.edition === 'java' ? 'Java Edition' : 'Bedrock Edition'}</p>
        <p><strong>Description:</strong> ${modData.description || 'Custom mod'}</p>
        
        <h4>Features:</h4>
        <ul>${featuresHtml}</ul>
        
        <h4>Generated Code Sample:</h4>
        <pre style="background: #000; padding: 15px; border-radius: 5px; overflow-x: auto; max-height: 300px; font-size: 0.9em;"><code>${escapeHtml(modData.code)}</code></pre>
        
        <h4>Installation & Recipes:</h4>
        <p>${escapeHtml(modData.recipes)}</p>
        
        <h4>Installation Instructions:</h4>
        <p>${escapeHtml(modData.instructions)}</p>
        
        <p><em>📦 Click download to get your complete mod package!</em></p>
    `;
    resultContent.innerHTML = html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Download mod
function downloadMod() {
    if (!currentModData) {
        alert('No mod data available');
        return;
    }

    const modName = currentModData.name.replace(/\s+/g, '_');
    const timestamp = new Date().getTime();
    const filename = `${modName}-${timestamp}.json`;
    
    // Create a JSON file with mod data
    const modJson = JSON.stringify(currentModData, null, 2);
    const blob = new Blob([modJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert(`📦 Downloaded: ${filename}`);
}

// Reset form
function resetForm() {
    minecraftVersionSelect.value = '';
    modDescriptionInput.value = '';
    modNameInput.value = '';
    resultsSection.style.display = 'none';
    resultContent.innerHTML = '';
    downloadBtn.style.display = 'none';
    document.querySelector('input[name="edition"][value="java"]').checked = true;
    currentModData = null;
    
    // Scroll back to top on mobile
    if (window.innerWidth <= 600) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize
window.addEventListener('load', () => {
    console.log('🎮 Minecraft Mod Generator loaded successfully!');
    console.log('API URL:', API_URL);
});
