/**
 * Language Learning Playground
 * API Simulation
 * 
 * This file simulates backend API responses for the language learning application.
 * In a real application, these would be actual API endpoints.
 */

// Simulated API class
class LanguageLearningAPI {
    constructor() {
        // Initialize with some sample data
        this.scenarios = {
            'cafe': {
                title: 'At the Café',
                difficulty: 'beginner',
                language: 'es',
                characters: [
                    {
                        id: 'waiter',
                        name: 'Carlos',
                        role: 'Waiter',
                        avatar: 'assets/character-waiter.png',
                        personality: 'friendly, helpful'
                    }
                ],
                initialMessage: '¡Hola! Bienvenido a nuestro café. ¿Qué desea ordenar hoy?',
                vocabulary: [
                    { term: 'ordenar', definition: 'to order' },
                    { term: 'café', definition: 'coffee' },
                    { term: 'recomendar', definition: 'to recommend' },
                    { term: 'menú', definition: 'menu' },
                    { term: 'bebida', definition: 'drink' },
                    { term: 'comida', definition: 'food' },
                    { term: 'pagar', definition: 'to pay' },
                    { term: 'cuenta', definition: 'bill' }
                ],
                culturalNotes: [
                    'In Spanish cafés, it\'s common to greet with "¡Hola!" rather than a more formal greeting when entering casual establishments.',
                    'In Spain, coffee is often enjoyed slowly while sitting down, rather than taken to go.',
                    'Tipping is not as common in Spanish cafés as in some other countries, but rounding up the bill is appreciated.'
                ],
                responseOptions: [
                    'Me gustaría un café, por favor.',
                    '¿Qué recomiendas?',
                    'Solo estoy mirando el menú.'
                ]
            },
            'airport': {
                title: 'At the Airport',
                difficulty: 'intermediate',
                language: 'es',
                characters: [
                    {
                        id: 'agent',
                        name: 'Elena',
                        role: 'Check-in Agent',
                        avatar: 'assets/character-agent.png',
                        personality: 'professional, efficient'
                    }
                ],
                initialMessage: 'Buenos días. ¿A dónde viaja hoy?',
                vocabulary: [
                    { term: 'vuelo', definition: 'flight' },
                    { term: 'pasaporte', definition: 'passport' },
                    { term: 'facturar', definition: 'to check in' },
                    { term: 'equipaje', definition: 'luggage' },
                    { term: 'tarjeta de embarque', definition: 'boarding pass' },
                    { term: 'puerta', definition: 'gate' },
                    { term: 'retraso', definition: 'delay' },
                    { term: 'aduana', definition: 'customs' }
                ],
                culturalNotes: [
                    'In Spanish-speaking countries, airport security may be stricter about liquids than in some other regions.',
                    'It\'s common to hear announcements in both Spanish and English at international airports.',
                    'Many Spanish airports have designated smoking areas outside the terminals.'
                ],
                responseOptions: [
                    'Viajo a Madrid hoy.',
                    'Aquí está mi pasaporte.',
                    'Tengo una maleta para facturar.'
                ]
            },
            'hotel': {
                title: 'At the Hotel',
                difficulty: 'beginner',
                language: 'es',
                characters: [
                    {
                        id: 'receptionist',
                        name: 'Marta',
                        role: 'Receptionist',
                        avatar: 'assets/character-receptionist.png',
                        personality: 'friendly, professional'
                    }
                ],
                initialMessage: 'Bienvenido a nuestro hotel. ¿Tiene una reserva?',
                vocabulary: [
                    { term: 'habitación', definition: 'room' },
                    { term: 'reserva', definition: 'reservation' },
                    { term: 'llave', definition: 'key' },
                    { term: 'recepción', definition: 'reception' },
                    { term: 'desayuno', definition: 'breakfast' },
                    { term: 'wifi', definition: 'wifi' },
                    { term: 'ascensor', definition: 'elevator' },
                    { term: 'servicio de habitación', definition: 'room service' }
                ],
                culturalNotes: [
                    'In many Spanish-speaking countries, it\'s customary to leave your room key at reception when you leave the hotel.',
                    'Breakfast is often included in the room rate in Spanish hotels.',
                    'Tipping hotel staff is appreciated but not always expected in Spain.'
                ],
                responseOptions: [
                    'Sí, tengo una reserva a nombre de...',
                    '¿Tienen habitaciones disponibles?',
                    '¿A qué hora es el desayuno?'
                ]
            }
        };
        
        this.users = {
            'default': {
                name: 'User',
                level: 'beginner',
                progress: 25,
                languages: ['es'],
                vocabulary: {
                    learned: ['hola', 'gracias', 'por favor', 'sí', 'no'],
                    practicing: ['café', 'agua', 'comida', 'restaurante'],
                    new: ['ordenar', 'menú', 'cuenta', 'bebida']
                },
                history: []
            }
        };
    }
    
    /**
     * Get available scenarios for a language and difficulty level
     */
    getScenarios(language, difficulty = null) {
        const result = Object.entries(this.scenarios)
            .filter(([id, scenario]) => scenario.language === language)
            .filter(([id, scenario]) => !difficulty || scenario.difficulty === difficulty)
            .map(([id, scenario]) => ({
                id,
                title: scenario.title,
                difficulty: scenario.difficulty
            }));
            
        return this._simulateApiResponse(result);
    }
    
    /**
     * Get details for a specific scenario
     */
    getScenarioDetails(scenarioId) {
        const scenario = this.scenarios[scenarioId];
        if (!scenario) {
            return this._simulateApiResponse(null, 404, 'Scenario not found');
        }
        
        return this._simulateApiResponse(scenario);
    }
    
    /**
     * Get user profile
     */
    getUserProfile(userId = 'default') {
        const user = this.users[userId];
        if (!user) {
            return this._simulateApiResponse(null, 404, 'User not found');
        }
        
        return this._simulateApiResponse(user);
    }
    
    /**
     * Update user progress
     */
    updateUserProgress(userId, activityType, score) {
        const user = this.users[userId];
        if (!user) {
            return this._simulateApiResponse(null, 404, 'User not found');
        }
        
        // Calculate progress increment based on activity type and score
        let progressIncrement = 0;
        switch (activityType) {
            case 'conversation':
                progressIncrement = score / 20; // 5% for perfect score
                break;
            case 'vocabulary':
                progressIncrement = score / 10; // 10% for perfect score
                break;
            case 'pronunciation':
                progressIncrement = score / 15; // 6.7% for perfect score
                break;
            case 'story':
                progressIncrement = score / 25; // 4% for perfect score
                break;
        }
        
        // Update progress
        user.progress = Math.min(100, user.progress + progressIncrement);
        
        // Update level if needed
        if (user.progress >= 75) {
            user.level = 'advanced';
        } else if (user.progress >= 40) {
            user.level = 'intermediate';
        } else {
            user.level = 'beginner';
        }
        
        return this._simulateApiResponse({
            newProgress: user.progress,
            newLevel: user.level
        });
    }
    
    /**
     * Generate AI response to user input
     */
    generateAIResponse(scenarioId, userInput, conversationHistory) {
        const scenario = this.scenarios[scenarioId];
        if (!scenario) {
            return this._simulateApiResponse(null, 404, 'Scenario not found');
        }
        
        // In a real app, this would call an AI API like OpenAI
        // For now, we'll use some predefined responses
        
        // Simple response mapping for demo purposes
        const responses = {
            'Me gustaría un café, por favor.': '¡Claro! ¿Lo prefiere solo o con leche?',
            '¿Qué recomiendas?': 'Recomiendo nuestro café especial de Colombia. Es muy aromático.',
            'Solo estoy mirando el menú.': 'Por supuesto, tómese su tiempo. Avíseme cuando esté listo para ordenar.',
            'Viajo a Madrid hoy.': 'Excelente. ¿Me permite ver su pasaporte, por favor?',
            'Aquí está mi pasaporte.': 'Gracias. Su vuelo sale a las 14:30. ¿Tiene equipaje para facturar?',
            'Tengo una maleta para facturar.': 'Perfecto. Por favor, coloque su maleta en la báscula.'
        };
        
        // Default response if no match
        let aiResponse = 'Disculpe, no entendí bien. ¿Puede repetirlo, por favor?';
        
        // Check for exact matches first
        if (responses[userInput]) {
            aiResponse = responses[userInput];
        } else {
            // Check for partial matches
            for (const key in responses) {
                if (userInput.toLowerCase().includes(key.toLowerCase())) {
                    aiResponse = responses[key];
                    break;
                }
            }
        }
        
        // Generate response options based on the AI response
        let responseOptions = [];
        
        if (aiResponse.includes('¿Lo prefiere solo o con leche?')) {
            responseOptions = [
                'Solo, por favor.',
                'Con leche, gracias.',
                'Con leche y azúcar.'
            ];
        } else if (aiResponse.includes('café especial de Colombia')) {
            responseOptions = [
                'Suena bien. Lo probaré.',
                '¿Cuánto cuesta?',
                'Prefiero algo más suave.'
            ];
        } else if (aiResponse.includes('tómese su tiempo')) {
            responseOptions = [
                'Gracias por su paciencia.',
                'Ahora estoy listo para ordenar.',
                '¿Tienen wifi aquí?'
            ];
        } else {
            // Default options
            responseOptions = [
                'Gracias por la información.',
                '¿Puede repetir eso, por favor?',
                'Entiendo, gracias.'
            ];
        }
        
        return this._simulateApiResponse({
            text: aiResponse,
            character: scenario.characters[0].id,
            responseOptions: responseOptions
        });
    }
    
    /**
     * Translate text between languages
     */
    translateText(text, fromLang, toLang) {
        // In a real app, this would call a translation API
        // For now, we'll use some predefined translations
        
        const translations = {
            'es': {
                'en': {
                    '¡Hola! Bienvenido a nuestro café. ¿Qué desea ordenar hoy?': 'Hello! Welcome to our café. What would you like to order today?',
                    '¡Claro! ¿Lo prefiere solo o con leche?': 'Of course! Would you prefer it black or with milk?',
                    'Recomiendo nuestro café especial de Colombia. Es muy aromático.': 'I recommend our special Colombian coffee. It\'s very aromatic.',
                    'Por supuesto, tómese su tiempo. Avíseme cuando esté listo para ordenar.': 'Of course, take your time. Let me know when you\'re ready to order.',
                    'Disculpe, no entendí bien. ¿Puede repetirlo, por favor?': 'Sorry, I didn\'t understand well. Can you repeat that, please?',
                    'Buenos días. ¿A dónde viaja hoy?': 'Good morning. Where are you traveling to today?',
                    'Excelente. ¿Me permite ver su pasaporte, por favor?': 'Excellent. May I see your passport, please?',
                    'Gracias. Su vuelo sale a las 14:30. ¿Tiene equipaje para facturar?': 'Thank you. Your flight departs at 14:30. Do you have luggage to check in?',
                    'Perfecto. Por favor, coloque su maleta en la báscula.': 'Perfect. Please place your suitcase on the scale.'
                }
            }
        };
        
        let translatedText = 'Translation not available';
        
        if (translations[fromLang] && translations[fromLang][toLang] && translations[fromLang][toLang][text]) {
            translatedText = translations[fromLang][toLang][text];
        }
        
        return this._simulateApiResponse({
            originalText: text,
            translatedText: translatedText,
            fromLang: fromLang,
            toLang: toLang
        });
    }
    
    /**
     * Analyze pronunciation
     */
    analyzePronunciation(audioData, text, language) {
        // In a real app, this would call a pronunciation analysis API
        // For now, we'll return a simulated result
        
        // Generate random scores for demo purposes
        const overallScore = Math.floor(Math.random() * 30) + 70; // 70-100
        const fluencyScore = Math.floor(Math.random() * 30) + 70;
        const accuracyScore = Math.floor(Math.random() * 30) + 70;
        
        // Generate feedback based on scores
        let feedback = '';
        if (overallScore >= 90) {
            feedback = 'Excellent pronunciation! Keep up the good work.';
        } else if (overallScore >= 80) {
            feedback = 'Very good pronunciation. Minor improvements could be made.';
        } else {
            feedback = 'Good effort! Try focusing on the rhythm and stress of the words.';
        }
        
        // Generate phoneme-level analysis
        const words = text.split(' ');
        const phonemeAnalysis = words.map(word => ({
            word: word,
            score: Math.floor(Math.random() * 30) + 70,
            issues: overallScore < 85 ? ['stress', 'vowel length'] : []
        }));
        
        return this._simulateApiResponse({
            overallScore: overallScore,
            fluencyScore: fluencyScore,
            accuracyScore: accuracyScore,
            feedback: feedback,
            phonemeAnalysis: phonemeAnalysis
        });
    }
    
    /**
     * Generate custom story
     */
    generateStory(vocabulary, difficulty, language) {
        // In a real app, this would call an AI API to generate a story
        // For now, we'll return a predefined story
        
        const stories = {
            'es': {
                'beginner': {
                    title: 'Un Día en la Ciudad',
                    content: 'María camina por la ciudad. Ella ve una tienda y decide entrar. En la tienda, hay muchas cosas interesantes. María compra un libro y sale de la tienda. Luego, va a un café para leer su nuevo libro. En el café, pide un café con leche. El café está delicioso. María está feliz con su día en la ciudad.',
                    vocabulary: ['ciudad', 'tienda', 'libro', 'café', 'leche', 'delicioso', 'feliz'],
                    questions: [
                        {
                            question: '¿Qué compra María en la tienda?',
                            options: ['Un libro', 'Un café', 'Una camisa', 'Un periódico'],
                            correctAnswer: 0
                        },
                        {
                            question: '¿Dónde lee María su libro?',
                            options: ['En casa', 'En el parque', 'En el café', 'En la tienda'],
                            correctAnswer: 2
                        }
                    ]
                },
                'intermediate': {
                    title: 'El Viaje Inesperado',
                    content: 'Carlos había planeado un tranquilo fin de semana en casa, pero cuando recibió la llamada de su amigo Miguel, todo cambió. Miguel le invitó a un viaje espontáneo a la costa. Aunque Carlos tenía muchas responsabilidades, decidió que necesitaba una aventura. Preparó rápidamente una pequeña maleta y salió hacia la estación de tren. Durante el viaje, contempló el paisaje cambiante por la ventana y sintió una creciente emoción. Al llegar a la costa, el olor del mar y el sonido de las olas le dieron la bienvenida. "A veces, los mejores momentos son los no planificados", pensó mientras caminaba por la playa con su amigo.',
                    vocabulary: ['tranquilo', 'espontáneo', 'responsabilidades', 'aventura', 'maleta', 'estación', 'paisaje', 'emoción', 'olas', 'planificados'],
                    questions: [
                        {
                            question: '¿Por qué cambió el fin de semana de Carlos?',
                            options: ['Por mal tiempo', 'Por una llamada de su amigo', 'Por problemas de trabajo', 'Por una emergencia familiar'],
                            correctAnswer: 1
                        },
                        {
                            question: '¿Cómo viajaron Carlos y Miguel a la costa?',
                            options: ['En coche', 'En autobús', 'En tren', 'En avión'],
                            correctAnswer: 2
                        }
                    ]
                }
            }
        };
        
        // Select appropriate story based on language and difficulty
        const story = stories[language]?.[difficulty] || stories['es']['beginner'];
        
        return this._simulateApiResponse(story);
    }
    
    /**
     * Simulate API response with delay
     */
    _simulateApiResponse(data, status = 200, message = 'OK') {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                resolve({
                    status: status,
                    message: message,
                    data: data,
                    timestamp: new Date().toISOString()
                });
            }, 300); // 300ms delay
        });
    }
}

// Export the API instance
window.languageApi = new LanguageLearningAPI();
