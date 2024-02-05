// Variables to keep track of the current step, direction, and results
let currentStep = 0;
let direction = '';
let results = [];

// Configuration of interview questions
const questions = {
    'common': {
        question: "In which field would you like to work?",
        answers: ["Developer", "Marketer", "Retention", "Product Owner"]
    },
    'Developer': [
        { question: "Which programming languages are you familiar with?", answers: ["JavaScript", "Python", "Java", "C#"] },
        { question: "In which development areas do you have experience?", answers: ["Web development", "Mobile development", "Games", "Data Science"] },
        { question: "What type of development interests you the most?", answers: ["Frontend", "Backend", "Full Stack", "Game development"] },
        { question: "Which technologies or frameworks have you worked with?", answers: ["React", "Angular", "Spring", "Django"] },
        { question: "Would you like to learn new programming languages or technologies?", answers: ["Yes", "No"] }
    ],
    'Marketer': [
        { question: "Which type of marketing interests you the most?", answers: ["SMM", "SEO", "Email marketing", "Content marketing"] },
        { question: "Do you have experience working with data analytics?", answers: ["Yes", "No"] },
        { question: "How do you feel about working with social media?", answers: ["Positive", "Neutral", "Negative"] },
        { question: "Do you have experience running advertising campaigns?", answers: ["Yes", "No"] },
        { question: "How do you rate your copywriting skills?", answers: ["High", "Medium", "Low"] }
    ],
    'Retention': [
        { question: "In your opinion, what is the most important factor for customer retention?", answers: ["Personalization", "Service quality", "Discounts and promotions", "Feedback"] },
        { question: "Do you have experience working with CRM systems?", answers: ["Yes", "No"] },
        { question: "How do you feel about working with large volumes of data?", answers: ["Positive", "Neutral", "Negative"] },
        { question: "Do you have experience conducting customer surveys?", answers: ["Yes", "No"] },
        { question: "What methods of increasing customer loyalty do you know?", answers: ["Loyalty programs", "Personalized offers", "Customer events", "Feedback"] }
    ],
    'Product Owner': [
        { question: "Which aspect of being a Product Owner interests you the most?", answers: ["Project management", "Team collaboration", "Market analysis", "Product planning"] },
        { question: "Do you have experience managing projects?", answers: ["Yes", "No"] },
        { question: "How would you rate your communication skills?", answers: ["High", "Medium", "Low"] },
        { question: "Do you have experience working with a development team?", answers: ["Yes", "No"] },
        { question: "How do you feel about market and competitor analysis?", answers: ["Positive", "Neutral", "Negative"] }
    ]
};

// Update the progress bar based on the current step
function updateProgressBar(step) {
    const progressBar = document.querySelectorAll('.progress');
    progressBar.forEach((bar, index) => {
        if (index <= step) {
            bar.classList.add('completed');
        } else {
            bar.classList.remove('completed');
        }
    });
}

// Start the interview and display the first question
function startInterview() {
    document.querySelector('#progressBar').classList.remove('hidden');
    document.getElementById('beginForm').style.display = 'none';
    renderQuestion('common', 0);
}

// Process the user's answer and move to the next question
function nextStep(answer) {
    if (currentStep === 0) {
        direction = answer;
        renderQuestion(direction, 0);
    } else {
        results.push({ question: questions[direction][currentStep - 1].question, answer });
        if (currentStep < questions[direction].length) {
            renderQuestion(direction, currentStep);
        } else {
            document.getElementById('question').innerHTML = "Interview completed";
            document.getElementById('answers').innerHTML = "";

            // Process and display the results
            let answersContent = ``;
            for (let i = 0; i < results.length; i++) {
                answersContent += `<div class="result-answer">${i + 1}. ${results[i].question} <br> <b>- ${results[i].answer}</b></div>`;
            }
            document.getElementById('answers').innerHTML = answersContent;
            document.querySelector('#progressBar').remove();
        }
    }
    currentStep++;
    updateProgressBar(currentStep - 1);
}

// Render the current question and answer options
function renderQuestion(dir, step) {
    const question = (dir === 'common') ? questions[dir] : questions[dir][step];
    document.getElementById('question').innerHTML = question.question;

    let answersHtml = '';
    question.answers.forEach(answer => {
        answersHtml += `<button class="btn-answer" onclick="nextStep('${answer}')">${answer}</button>`;
    });
    document.getElementById('answers').innerHTML = answersHtml;
}