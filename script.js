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

// Event listeners
generatBtn.addEventListener('click', generateMod);
resetBtn.addEventListener('click', resetForm);
downloadBtn.addEventListener('click', downloadMod);

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
        return;
    }
    if (!description) {
        alert('Please describe what you want your mod to do');
        return;
    }
    if (!modName) {
        alert('Please enter a mod name');
        return;
    }

    // Show results section and loading
    resultsSection.style.display = 'block';
    loadingDiv.style.display = 'block';
    resultContent.innerHTML = '';
    downloadBtn.style.display = 'none';

    try {
        // Simulate API call to AI service
        // In a real implementation, this would call your backend/AI API
        const modData = await callAIModGenerator({
            version,
            edition,
            description,
            modName
        });

        // Hide loading and display results
        loadingDiv.style.display = 'none';
        displayModResults(modData);
        downloadBtn.style.display = 'inline-block';
    } catch (error) {
        loadingDiv.style.display = 'none';
        resultContent.innerHTML = `<p style="color: #e74c3c;">Error: ${error.message}</p>`;
    }
}

// Simulated AI mod generation (replace with real API call)
async function callAIModGenerator(modConfig) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock mod data
    const modTemplates = {
        'custom_tools': `
            A custom tools mod that adds:
            - ${modConfig.edition === 'java' ? 'Diamond and Netherite' : 'Copper and Amethyst'} tools
            - Enhanced durability and efficiency
            - Special abilities for each tool type
            - Custom crafting recipes
        `,
        'biome_expansion': `
            A biome expansion mod featuring:
            - 5 new unique biomes with custom terrain
            - New mobs and animals
            - Exclusive resources and ores
            - New vegetation and structures
        `,
        'magic_system': `
            An enchantment and magic mod with:
            - New spell casting mechanics
            - Mystical items and artifacts
            - Custom mana/energy system
            - Advanced enchanting recipes
        `,
        'dimension_addon': `
            A new dimension expansion with:
            - Custom dimension with unique terrain
            - Special blocks and materials
            - Challenging bosses and mobs
            - Rare loot and treasures
        `
    };

    const modTypes = Object.keys(modTemplates);
    const randomType = modTypes[Math.floor(Math.random() * modTypes.length)];

    return {
        name: modConfig.modName,
        version: modConfig.version,
        edition: modConfig.edition,
        description: modConfig.description,
        features: modTemplates[randomType],
        generatedCode: generateSampleCode(modConfig),
        downloadUrl: `#download-${Math.random().toString(36).substr(2, 9)}`
    };
}

// Generate sample mod code
function generateSampleCode(config) {
    if (config.edition === 'java') {
        return `public class ${config.modName.replace(/\s+/g, '')}Mod {
    
    @Mod.EventBusSubscriber(modid = MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD)
    public static class CommonEvents {
        @SubscribeEvent
        public static void onServerStarting(FMLServerStartingEvent event) {
            // Initialize mod content
        }
    }
    
    // Custom item registration
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MOD_ID);
    
    // Custom block registration
    public static final DeferredRegister<Block> BLOCKS = DeferredRegister.create(ForgeRegistries.BLOCKS, MOD_ID);
}`;
    } else {
        return `// Bedrock Edition Addon Manifest
{
    "format_version": 2,
    "header": {
        "name": "${config.modName}",
        "description": "${config.description}",
        "version": [1, 0, 0],
        "min_engine_version": [1, 20, 0]
    },
    "modules": [
        {
            "type": "resources",
            "uuid": "00000000-0000-0000-0000-000000000001",
            "version": [1, 0, 0]
        },
        {
            "type": "data",
            "uuid": "00000000-0000-0000-0000-000000000002",
            "version": [1, 0, 0]
        }
    ]
}`;
    }
}

// Display mod results
function displayModResults(modData) {
    const html = `
        <h3>✅ Mod Generated Successfully!</h3>
        <p><strong>Mod Name:</strong> ${modData.name}</p>
        <p><strong>Minecraft Version:</strong> ${modData.version}</p>
        <p><strong>Edition:</strong> ${modData.edition === 'java' ? 'Java Edition' : 'Bedrock Edition'}</p>
        <p><strong>Description:</strong> ${modData.description}</p>
        <p><strong>Features:</strong></p>
        <p>${modData.features}</p>
        <p><strong>Generated Code Sample:</strong></p>
        <pre style="background: #000; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>${modData.generatedCode}</code></pre>
        <p><em>📝 Full mod files are ready for download!</em></p>
    `;
    resultContent.innerHTML = html;
}

// Download mod
function downloadMod() {
    // Create a mock zip file download
    const modName = modNameInput.value.replace(/\s+/g, '_');
    const timestamp = new Date().getTime();
    const filename = `${modName}-${timestamp}.zip`;
    
    // In a real implementation, this would trigger an actual download from your server
    alert(`📦 Downloading: ${filename}\n\nIn a production environment, this would download your complete mod package!`);
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
}

// Initialize
window.addEventListener('load', () => {
    console.log('Minecraft Mod Generator loaded successfully!');
});