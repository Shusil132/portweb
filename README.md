# Minimalist Dashboard Portfolio with AI Chatbot

A single-page, unscrollable portfolio website featuring a dashboard layout and an AI chatbot trained on resume data.

## Features

- **Unscrollable Dashboard**: Grid layout that fits the viewport on desktop.
- **Mobile Responsive**: Adapts to a tabbed interface on smaller screens.
- **AI Chatbot**: Integrated floating chat widget powered by Groq API (Llama 3) to answer questions about the portfolio owner.
- **Minimalist Design**: Clean UI with dark mode aesthetics.

## Project Structure

- `index.html`: Main entry point and structure.
- `style.css`: All styling, including responsive design and chatbot specific styles.
- `script.js`: Logic for mobile tabs and chatbot API integration.

## Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   ```
2. **Open `index.html`** in your browser.
   - Or run a simple local server:
     ```bash
     python -m http.server
     ```

## Deployment on Render

This project is a static site (HTML/CSS/JS) and can be deployed easily on [Render](https://render.com/).

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Push this code to the repository.

2. **Deploy**:
   - Go to Render Dashboard.
   - Click **New +** -> **Static Site**.
   - Connect your GitHub repository.
   - **Build Command**: (Leave empty)
   - **Publish Directory**: `.` (Current directory)
   - Click **Create Static Site**.

## API Key Security Note

⚠️ **Important**: The Groq API key is currently embedded in `script.js` for demonstration purposes. For a production environment, it is highly recommended to move the API call to a backend proxy function (e.g., Netlify Functions, Vercel Serverless, or a Render Web Service) to keep your key secret.
