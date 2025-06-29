/**
 * Language Learning Playground - Scenario Selection Fix
 * 
 * This script fixes the issue where all conversations start with the cafe scenario
 * regardless of which scenario button is clicked.
 */

// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scenario selection fix loaded');
    
    // Find the original startConversationScenario function
    const originalStartConversationScenario = window.startConversationScenario;
    
    if (typeof originalStartConversationScenario !== 'function') {
        console.error('Could not find startConversationScenario function');
        return;
    }
    
    // Override the click handler for scenario buttons
    const scenarioButtons = document.querySelectorAll('.scenario-card .secondary-button');
    
    scenarioButtons.forEach(button => {
        // Store the original click handler
        const originalOnClick = button.onclick;
        
        // Replace the click handler
        button.onclick = function(event) {
            // Find the scenario card
            const scenarioCard = this.closest('.scenario-card');
            if (!scenarioCard) {
                // If we can't find the scenario card, use the original handler
                if (typeof originalOnClick === 'function') {
                    return originalOnClick.call(this, event);
                }
                return;
            }
            
            // Get the scenario title from the card
            const scenarioTitle = scenarioCard.querySelector('.scenario-info h4')?.textContent.trim();
            
            // Determine the scenario ID based on the title
            let scenarioId = 'cafe'; // Default to cafe
            
            if (scenarioTitle) {
                if (scenarioTitle.toLowerCase().includes('airport')) {
                    scenarioId = 'airport';
                } else if (scenarioTitle.toLowerCase().includes('hotel')) {
                    scenarioId = 'hotel';
                }
                // Add more scenario mappings as needed
            }
            
            console.log(`Starting scenario: ${scenarioId} based on title: ${scenarioTitle}`);
            
            // Open the modal
            const modal = document.getElementById('conversationModal');
            if (modal) {
                modal.classList.add('active');
            }
            
            // Start the conversation with the correct scenario
            originalStartConversationScenario(scenarioId);
            
            // Prevent default action if this is a link
            event.preventDefault();
            return false;
        };
    });
    
    // Also handle scenario buttons on the scenarios page
    const scenariosPageButtons = document.querySelectorAll('.scenario-list .scenario-item .start-button');
    scenariosPageButtons.forEach(button => {
        const scenarioItem = button.closest('.scenario-item');
        if (scenarioItem) {
            const scenarioTitle = scenarioItem.querySelector('h3')?.textContent.trim() || '';
            
            // Set data-scenario attribute based on title
            if (scenarioTitle.toLowerCase().includes('café') || 
                scenarioTitle.toLowerCase().includes('cafe')) {
                button.setAttribute('data-scenario', 'cafe');
            } else if (scenarioTitle.toLowerCase().includes('airport')) {
                button.setAttribute('data-scenario', 'airport');
            } else if (scenarioTitle.toLowerCase().includes('hotel')) {
                button.setAttribute('data-scenario', 'hotel');
            } else if (scenarioTitle.toLowerCase().includes('restaurant')) {
                button.setAttribute('data-scenario', 'restaurant');
            }
            
            // Add click handler
            button.addEventListener('click', function(event) {
                const scenarioId = this.getAttribute('data-scenario') || 'cafe';
                console.log(`Starting scenario from scenarios page: ${scenarioId}`);
                
                // Store the selected scenario ID in sessionStorage to pass between pages
                sessionStorage.setItem('selectedScenarioId', scenarioId);
            });
        }
    });
    
    // Check if we need to start a conversation from a stored scenario ID
    const storedScenarioId = sessionStorage.getItem('selectedScenarioId');
    if (storedScenarioId) {
        console.log(`Found stored scenario ID: ${storedScenarioId}`);
        
        // Clear the stored ID
        sessionStorage.removeItem('selectedScenarioId');
        
        // Open the conversation modal
        const modal = document.getElementById('conversationModal');
        if (modal) {
            modal.classList.add('active');
            
            // Update the modal title
            const modalTitle = modal.querySelector('.modal-header h3');
            if (modalTitle) {
                const titles = {
                    'cafe': 'Conversation: At the Café',
                    'airport': 'Conversation: At the Airport',
                    'hotel': 'Conversation: At the Hotel',
                    'restaurant': 'Conversation: At the Restaurant'
                };
                modalTitle.textContent = titles[storedScenarioId] || 'Conversation';
            }
            
            // Start the conversation with the correct scenario
            if (typeof window.startConversationScenario === 'function') {
                window.startConversationScenario(storedScenarioId);
            }
        }
    }
});
