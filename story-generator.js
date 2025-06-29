/**
 * Language Learning Playground
 * Story Generator Module
 * 
 * This module handles story generation functionality.
 * In a real application, this would connect to an AI API for story generation.
 */

class StoryGenerator {
    constructor() {
        this.vocabulary = [];
        this.difficulty = 'beginner';
        this.language = 'es';
        this.theme = null;
    }
    
    // Set vocabulary for the story
    setVocabulary(vocabulary) {
        this.vocabulary = vocabulary;
        return this;
    }
    
    // Set difficulty level
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        return this;
    }
    
    // Set language
    setLanguage(language) {
        this.language = language;
        return this;
    }
    
    // Set theme
    setTheme(theme) {
        this.theme = theme;
        return this;
    }
    
    // Generate story
    generateStory() {
        // In a real app, this would call an AI API to generate a story
        // For now, we'll use the API simulation
        
        return window.languageApi.generateStory(
            this.vocabulary.map(v => v.term),
            this.difficulty,
            this.language
        ).then(response => {
            if (response.status === 200 && response.data) {
                return response.data;
            } else {
                throw new Error('Failed to generate story');
            }
        });
    }
    
    // Get predefined stories
    getPredefinedStories() {
        // Return some predefined stories for demo purposes
        return [
            {
                id: 'city-day',
                title: 'Un Día en la Ciudad',
                difficulty: 'beginner',
                language: 'es',
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
            {
                id: 'unexpected-trip',
                title: 'El Viaje Inesperado',
                difficulty: 'intermediate',
                language: 'es',
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
        ];
    }
}

// Export the story generator
window.storyGenerator = new StoryGenerator();
