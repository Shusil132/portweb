document.addEventListener('DOMContentLoaded', () => {
    // Mobile Tab Navigation Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const cards = document.querySelectorAll('.card');

    if (window.innerWidth <= 768) {
        document.querySelector('.summary-card').classList.add('active');
        document.querySelector('.nav-btn[data-target="summary-card"]').classList.add('active');
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetClass = btn.getAttribute('data-target');
            const contentCards = document.querySelectorAll('.summary-card, .experience-card, .skills-card, .projects-card, .education-card');
            contentCards.forEach(card => card.classList.remove('active'));

            const targetCard = document.querySelector(`.${targetClass}`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // Chatbot Logic
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatWindow.classList.remove('open');
    });

    // Send Message
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Add User Message -> UI
        addMessage(userMessage, 'user');
        chatInput.value = '';

        // Show loading state
        const loadingId = addMessage('Thinking...', 'bot', true);

        try {
            const response = await fetchChatResponse(userMessage);
            // Remove loading, add bot response
            removeMessage(loadingId);
            addMessage(response, 'bot');
        } catch (error) {
            console.error(error);
            removeMessage(loadingId);
            addMessage("Sorry, I'm having trouble connecting right now.", 'bot');
        }
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(text, sender, isLoading = false) {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerText = text;
        if (isLoading) div.id = 'loading-msg';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div.id;
    }

    function removeMessage(id) {
        const msg = document.getElementById(id);
        if (msg) msg.remove();
    }

    // Groq API Integration
    const API_KEY = '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'; // Use proxy in production!

    // System Context
    const SYSTEM_PROMPT = `
    You are an AI assistant for Shusi Kumar Nayak's portfolio website. 
    Your goal is to answer questions about Shusi's professional background, skills, and experience based on the resume data below.
    Keep answers concise, professional, and friendly.

    RESUME DATA:
    Name: SHUSIL KUMAR NAYAK
    Phone: 9114021466
    Email: shusilnayak38@gmail.com
    Place: Berhampur

    Objective:
    Looking forward to building a professional career as a Data Analyst / Scientist.

    Skills & Interests:
    - Data Analysis
    - Data Mining
    - Python
    - Digital Twins in Smart City
    - Analytic Thinking

    If asked about something not in this list, say you don't have that specific information but you can tell them about Shusi's core skills and experience.
    `;

    async function fetchChatResponse(userMessage) {
        const url = 'https://api.groq.com/openai/v1/chat/completions';

        const headers = {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        };

        const body = JSON.stringify({
            model: "llama3-8b-8192", // Fast and efficient model
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }
});
