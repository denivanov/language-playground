/**
 * Language Learning Playground
 * Pronunciation Analyzer Module
 * 
 * This module handles pronunciation analysis functionality.
 * In a real application, this would connect to a speech recognition
 * and pronunciation analysis API.
 */

// Initialize speech recognition
function initSpeechRecognition() {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }
    
    // Create speech recognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    window.recognition = new SpeechRecognition();
    
    // Configure recognition
    window.recognition.continuous = false;
    window.recognition.interimResults = false;
    
    // Set language based on current language
    window.recognition.lang = 'es-ES'; // Default to Spanish
    
    // Handle results
    window.recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log(`Speech recognized: ${transcript}`);
        
        // Use the transcript as user input
        const textInput = document.querySelector('.text-input-container input');
        if (textInput) {
            textInput.value = transcript;
        }
    };
    
    // Handle errors
    window.recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
    };
}

// Start speech recognition
function startSpeechRecognition() {
    // Update mic button appearance
    const micButton = document.querySelector('.conversation-controls .mic-button');
    if (micButton) {
        micButton.style.backgroundColor = 'var(--accent-color)';
        micButton.querySelector('.mic-text').textContent = 'Listening...';
    }
    
    // Start recognition
    if (window.recognition) {
        window.recognition.start();
        
        // Reset button after a timeout (in case recognition doesn't trigger onend)
        setTimeout(() => {
            if (micButton) {
                micButton.style.backgroundColor = '';
                micButton.querySelector('.mic-text').textContent = 'Speak';
            }
        }, 5000);
        
        // Reset button when recognition ends
        window.recognition.onend = function() {
            if (micButton) {
                micButton.style.backgroundColor = '';
                micButton.querySelector('.mic-text').textContent = 'Speak';
            }
        };
    }
}

// Analyze pronunciation
function analyzePronunciation(audioData, text, language) {
    // In a real app, this would call a pronunciation analysis API
    // For now, we'll return a simulated result
    
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
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
            
            resolve({
                overallScore,
                fluencyScore,
                accuracyScore,
                feedback,
                phonemeAnalysis
            });
        }, 1000);
    });
}

// Initialize pronunciation analysis
function initPronunciationAnalysis() {
    // This would integrate with a pronunciation analysis API
    // For now, we'll just set up the UI elements
    
    const waveformPlaceholder = document.querySelector('.waveform-placeholder');
    if (waveformPlaceholder) {
        // Create a simple animated waveform effect
        let opacity = 0.6;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                opacity += 0.01;
                if (opacity >= 0.8) increasing = false;
            } else {
                opacity -= 0.01;
                if (opacity <= 0.4) increasing = true;
            }
            
            waveformPlaceholder.style.opacity = opacity;
        }, 50);
    }
}

// Export functions
window.pronunciationAnalyzer = {
    initSpeechRecognition,
    startSpeechRecognition,
    analyzePronunciation,
    initPronunciationAnalysis
};
