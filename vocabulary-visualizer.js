/**
 * Language Learning Playground
 * Vocabulary Visualizer Module
 * 
 * This module handles vocabulary visualization functionality.
 */

// Initialize vocabulary visualization
function initVocabularyVisualization() {
    // This would create interactive word maps and visual connections
    // For now, we'll just add some hover effects to the word cloud
    
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.1)';
            item.style.backgroundColor = 'var(--primary-light)';
            item.style.color = 'var(--white)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = '';
            item.style.backgroundColor = '';
            item.style.color = '';
        });
    });
}

// Create vocabulary network
function createVocabularyNetwork(words, container) {
    // In a real app, this would create an interactive network visualization
    // For now, we'll just create a simple word cloud
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create word items
    words.forEach(word => {
        const wordItem = document.createElement('span');
        wordItem.className = 'word-item';
        wordItem.textContent = word.term;
        
        // Randomly assign size class
        const sizeClasses = ['size-sm', 'size-md', 'size-lg'];
        const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
        wordItem.classList.add(randomSize);
        
        // Add tooltip with definition
        wordItem.title = word.definition;
        
        // Add to container
        container.appendChild(wordItem);
    });
}

// Track vocabulary progress
function trackVocabularyProgress(words, status) {
    // In a real app, this would update the user's vocabulary progress
    // For now, we'll just log the progress
    
    console.log(`Tracking vocabulary progress: ${words.length} words marked as ${status}`);
    
    // Return simulated progress data
    return {
        totalWords: words.length,
        status: status,
        mastered: Math.floor(Math.random() * words.length),
        practicing: Math.floor(Math.random() * words.length),
        new: Math.floor(Math.random() * words.length)
    };
}

// Export functions
window.vocabularyVisualizer = {
    initVocabularyVisualization,
    createVocabularyNetwork,
    trackVocabularyProgress
};
