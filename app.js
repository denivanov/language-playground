/**
 * Language Learning Playground
 * Main application script
 */

// Global state
const appState = {
    currentLanguage: 'es', // Default language: Spanish
    userLevel: 'beginner',
    userProgress: 25,
    activeScenario: null,
    vocabulary: {
        learned: [],
        practicing: [],
        new: []
    },
    conversationHistory: []
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }

    // Initialize modal functionality
    const modal = document.getElementById('conversationModal');
    const closeButton = modal?.querySelector('.close-button');
    const scenarioButton = document.querySelector('.scenario-card .secondary-button');
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (scenarioButton) {
        scenarioButton.addEventListener('click', () => {
            modal.classList.add('active');
            startConversationScenario('cafe'); // This is the line that causes the issue, fixed by scenario-fix.js
        });
    }

    // Attach event listeners to all response options
    const responseOptions = document.querySelectorAll('.response-option');
    responseOptions.forEach(option => {
        option.addEventListener('click', () => handleUserResponse(option.textContent));
    });

    // Initialize send button
    const sendButton = document.querySelector('.send-button');
    const textInput = document.querySelector('.text-input-container input');
    if (sendButton && textInput) {
        sendButton.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (text) {
                handleUserResponse(text);
                textInput.value = '';
            }
        });
    }
});

/**
 * Handle language change in the selector
 */
function handleLanguageChange(event) {
    appState.currentLanguage = event.target.value;
    console.log(`Language changed to: ${appState.currentLanguage}`);
    
    // Update UI elements based on selected language
    updateUIForLanguage(appState.currentLanguage);
}

/**
 * Start a conversation scenario
 */
function startConversationScenario(scenarioId) {
    appState.activeScenario = scenarioId;
    
    console.log(`Starting scenario: ${scenarioId}`);
    
    // In a real application, we would fetch scenario data from an API
    // For now, we'll use the languageApi simulation
    window.languageApi.getScenarioDetails(scenarioId)
        .then(response => {
            if (response.status === 200 && response.data) {
                const scenario = response.data;
                
                // Update initial message
                const initialMessage = document.querySelector('.character-message p');
                if (initialMessage) {
                    initialMessage.textContent = scenario.initialMessage;
                }
                
                // Update character info
                const characterAvatar = document.querySelector('.character-avatar');
                const characterName = document.querySelector('.character-details h4');
                const characterRole = document.querySelector('.character-role');
                
                if (scenario.characters && scenario.characters.length > 0) {
                    const character = scenario.characters[0];
                    
                    if (characterAvatar) {
                        characterAvatar.src = character.avatar || 'assets/character-default.png';
                        characterAvatar.alt = character.name;
                    }
                    
                    if (characterName) {
                        characterName.textContent = character.name;
                    }
                    
                    if (characterRole) {
                        characterRole.textContent = character.role;
                    }
                }
                
                // Add initial message to history
                appState.conversationHistory = [{
                    speaker: 'ai',
                    text: scenario.initialMessage
                }];
                
                // Update vocabulary sidebar based on scenario
                updateVocabularySidebar(scenarioId, scenario.vocabulary);
                
                // Update cultural note based on scenario
                updateCulturalNote(scenarioId, scenario.culturalNotes);
                
                // Update response options
                const responseOptions = document.querySelectorAll('.response-option');
                if (scenario.responseOptions && responseOptions) {
                    responseOptions.forEach((option, index) => {
                        if (index < scenario.responseOptions.length) {
                            option.textContent = scenario.responseOptions[index];
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error loading scenario:', error);
        });
}

/**
 * Update vocabulary sidebar based on active scenario
 */
function updateVocabularySidebar(scenarioId, vocabulary) {
    const vocabularyList = document.querySelector('.vocabulary-list');
    
    if (vocabularyList && vocabulary) {
        vocabularyList.innerHTML = '';
        vocabulary.slice(0, 5).forEach(item => { // Show first 5 vocabulary items
            const li = document.createElement('li');
            li.innerHTML = `<span class="term">${item.term}</span> - ${item.definition}`;
            vocabularyList.appendChild(li);
        });
    } else {
        // Fallback to hardcoded vocabulary if API data is not available
        const vocabularyByScenario = {
            'cafe': [
                { term: 'ordenar', definition: 'to order' },
                { term: 'café', definition: 'coffee' },
                { term: 'recomendar', definition: 'to recommend' },
                { term: 'menú', definition: 'menu' }
            ],
            'airport': [
                { term: 'vuelo', definition: 'flight' },
                { term: 'pasaporte', definition: 'passport' },
                { term: 'facturar', definition: 'to check in' },
                { term: 'equipaje', definition: 'luggage' }
            ],
            'hotel': [
                { term: 'habitación', definition: 'room' },
                { term: 'reserva', definition: 'reservation' },
                { term: 'llave', definition: 'key' },
                { term: 'recepción', definition: 'reception' }
            ]
        };
        
        const fallbackVocabulary = vocabularyByScenario[scenarioId] || vocabularyByScenario['cafe'];
        
        if (vocabularyList) {
            vocabularyList.innerHTML = '';
            fallbackVocabulary.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="term">${item.term}</span> - ${item.definition}`;
                vocabularyList.appendChild(li);
            });
        }
    }
}

/**
 * Update cultural note based on active scenario
 */
function updateCulturalNote(scenarioId, culturalNotes) {
    const culturalNoteP = document.querySelector('.cultural-note p');
    
    if (culturalNoteP && culturalNotes && culturalNotes.length > 0) {
        // Use the first cultural note
        culturalNoteP.textContent = culturalNotes[0];
    } else {
        // Fallback to hardcoded notes if API data is not available
        const culturalNotesByScenario = {
            'cafe': 'In Spanish cafés, it\'s common to greet with "¡Hola!" rather than a more formal greeting when entering casual establishments.',
            'airport': 'In Spanish-speaking countries, airport security may be stricter about liquids than in some other regions.',
            'hotel': 'In many Spanish-speaking countries, it\'s customary to leave your room key at reception when you leave the hotel.'
        };
        
        const note = culturalNotesByScenario[scenarioId] || culturalNotesByScenario['cafe'];
        
        if (culturalNoteP) {
            culturalNoteP.textContent = note;
        }
    }
}

/**
 * Handle user response in conversation
 */
function handleUserResponse(text) {
    console.log(`User response: ${text}`);
    
    // Add user message to history
    appState.conversationHistory.push({
        speaker: 'user',
        text: text
    });
    
    // In a real app, we would send this to an AI API and get a response
    // For now, we'll simulate a response
    simulateAIResponse(text);
}

/**
 * Simulate AI response (in a real app, this would call an AI API)
 */
function simulateAIResponse(userText) {
    // This is where we would integrate with OpenAI API in a real application
    
    // For demo purposes, we'll use some predefined responses
    const responses = {
        'Me gustaría un café, por favor.': '¡Claro! ¿Lo prefiere solo o con leche?',
        '¿Qué recomiendas?': 'Recomiendo nuestro café especial de Colombia. Es muy aromático.',
        'Solo estoy mirando el menú.': 'Por supuesto, tómese su tiempo. Avíseme cuando esté listo para ordenar.'
    };
    
    // Default response if no match
    let aiResponse = 'Disculpe, no entendí bien. ¿Puede repetirlo, por favor?';
    
    // Check for exact matches first
    if (responses[userText]) {
        aiResponse = responses[userText];
    } else {
        // Check for partial matches
        for (const key in responses) {
            if (userText.toLowerCase().includes(key.toLowerCase())) {
                aiResponse = responses[key];
                break;
            }
        }
    }
    
    // Add AI response to history
    appState.conversationHistory.push({
        speaker: 'ai',
        text: aiResponse
    });
    
    // Update the conversation UI
    updateConversationUI(aiResponse);
}

/**
 * Update conversation UI with new message
 */
function updateConversationUI(aiResponse) {
    const conversationMessages = document.querySelector('.conversation-messages');
    
    // Create AI message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message character-message';
    
    const messageP = document.createElement('p');
    messageP.textContent = aiResponse;
    
    const translationButton = document.createElement('button');
    translationButton.className = 'translation-button';
    translationButton.textContent = 'See translation';
    translationButton.addEventListener('click', handleTranslationRequest);
    
    messageDiv.appendChild(messageP);
    messageDiv.appendChild(translationButton);
    
    // Add to conversation
    if (conversationMessages) {
        conversationMessages.appendChild(messageDiv);
    
        // Create new user options
        const userOptionsDiv = document.createElement('div');
        userOptionsDiv.className = 'message user-options';
        
        // Generate dynamic response options based on context
        const responseOptions = [
            'Gracias por la información.',
            '¿Puede repetir eso, por favor?',
            'Entiendo, gracias.'
        ];
        
        responseOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'response-option';
            button.textContent = option;
            button.addEventListener('click', () => handleUserResponse(option));
            userOptionsDiv.appendChild(button);
        });
        
        conversationMessages.appendChild(userOptionsDiv);
        
        // Scroll to bottom
        conversationMessages.scrollTop = conversationMessages.scrollHeight;
    }
}

/**
 * Handle translation request
 */
function handleTranslationRequest(event) {
    const button = event.target;
    const messageP = button.previousElementSibling;
    const originalText = messageP.textContent;
    
    // In a real app, we would call a translation API
    // For now, we'll use some predefined translations
    const translations = {
        '¡Hola! Bienvenido a nuestro café. ¿Qué desea ordenar hoy?': 'Hello! Welcome to our café. What would you like to order today?',
        '¡Claro! ¿Lo prefiere solo o con leche?': 'Of course! Would you prefer it black or with milk?',
        'Recomiendo nuestro café especial de Colombia. Es muy aromático.': 'I recommend our special Colombian coffee. It\'s very aromatic.',
        'Por supuesto, tómese su tiempo. Avíseme cuando esté listo para ordenar.': 'Of course, take your time. Let me know when you\'re ready to order.',
        'Disculpe, no entendí bien. ¿Puede repetirlo, por favor?': 'Sorry, I didn\'t understand well. Can you repeat that, please?'
    };
    
    if (button.textContent === 'See translation') {
        // Show translation
        const translation = translations[originalText] || 'Translation not available';
        const originalContent = messageP.textContent;
        messageP.innerHTML = `<span class="original-text" style="display: none;">${originalContent}</span><span class="translated-text">${translation}</span>`;
        button.textContent = 'Show original';
    } else {
        // Show original
        const originalText = messageP.querySelector('.original-text').textContent;
        messageP.innerHTML = originalText;
        button.textContent = 'See translation';
    }
}

/**
 * Update UI elements for the selected language
 */
function updateUIForLanguage(languageCode) {
    // This function would update various UI elements based on the selected language
    console.log(`Updating UI for language: ${languageCode}`);
    
    // Example: Update the conversation content if modal is open
    const modal = document.getElementById('conversationModal');
    if (modal && modal.classList.contains('active') && appState.activeScenario) {
        // Re-load the scenario with the new language
        startConversationScenario(appState.activeScenario);
    }
}
