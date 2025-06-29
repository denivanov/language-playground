# Language Learning Playground

An interactive web application for language learning with AI-powered conversation scenarios, vocabulary practice, pronunciation feedback, and custom stories.

## Features

- **Conversation Scenarios**: Practice real-world conversations with AI characters that adapt to your level
- **Visual Vocabulary**: Learn new words with visual connections and interactive exercises
- **Pronunciation Coach**: Get real-time feedback on your pronunciation with visual guides
- **Custom Stories**: Read and interact with AI-generated stories using your vocabulary
- **Cultural Insights**: Learn about cultural contexts and customs related to the language

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Simulated API for language learning features (in a real application, this would connect to backend services)

## Scenarios

The application includes multiple conversation scenarios:

- **At the Café**: Practice ordering food and drinks in a casual setting (Beginner level)
- **At the Airport**: Navigate travel situations and check-in procedures (Intermediate level)
- **At the Hotel**: Learn how to check in, ask questions, and request services (Beginner level)

## Recent Fixes

- Fixed an issue where all conversations were starting with the café scenario regardless of which scenario was selected
- Added proper scenario detection based on the conversation title
- Improved the user experience by ensuring each scenario loads its appropriate content

## Setup Instructions

1. Clone this repository
2. Open index.html in your browser
3. No build process or dependencies required - this is a pure frontend application

## Project Structure

- `index.html` - Main landing page
- `scenarios.html` - Page with all available conversation scenarios
- `stories.html` - Custom story generator and reader
- `api-simulation.js` - Simulated API for language learning features
- `app.js` - Main application logic
- `scenario-fix.js` - Fix for scenario selection issue
- `styles.css` - Application styling

## Future Enhancements

- Add more language options beyond Spanish
- Implement real API connections to language models
- Add user accounts and progress tracking
- Develop mobile application version

## License

MIT License
