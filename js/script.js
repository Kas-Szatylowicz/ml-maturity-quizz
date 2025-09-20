let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

const questions = [
    {
        question: "How would you describe your organization's current approach to machine learning?",
        answers: [
            "We're just starting to explore ML possibilities",
            "We have some pilot ML projects running", 
            "We have ML models in production but limited scale",
            "ML is integrated throughout our organization"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "How is your data currently organized and managed?",
        answers: [
            "Data is scattered across different systems",
            "We have some centralized data storage",
            "We have a data lake/warehouse with good governance",
            "We have real-time data pipelines and automated governance"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "What is your current approach to model deployment and monitoring?",
        answers: [
            "We don't have models in production yet",
            "We manually deploy and monitor a few models",
            "We have automated deployment with basic monitoring",
            "We have full MLOps with continuous monitoring and retraining"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "How does your organization handle ML model governance and compliance?",
        answers: [
            "We don't have formal governance processes",
            "We have basic documentation and approval processes",
            "We have structured governance with defined roles",
            "We have comprehensive governance with automated compliance checks"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "What is your team's ML expertise level?",
        answers: [
            "Limited ML knowledge, mostly learning",
            "Some team members have ML experience",
            "Strong ML team with diverse expertise",
            "Expert-level ML team with specializations"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "How does your organization approach ML model testing and validation?",
        answers: [
            "We don't have formal testing processes for ML models",
            "We do basic accuracy testing before deployment",
            "We have comprehensive testing including bias and fairness checks",
            "We have automated testing pipelines with continuous validation"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "What is your approach to ML infrastructure and scalability?",
        answers: [
            "We use local machines or basic cloud instances",
            "We have some cloud infrastructure but limited scalability",
            "We use scalable cloud platforms with container orchestration",
            "We have fully automated, elastic ML infrastructure"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "How does your organization handle ML model interpretability and explainability?",
        answers: [
            "We don't focus on model explainability",
            "We provide basic explanations when asked",
            "We have standard processes for model interpretation",
            "We have comprehensive explainability frameworks built into our workflow"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "What is your approach to ML ethics and responsible AI?",
        answers: [
            "We haven't established formal AI ethics guidelines",
            "We have basic awareness of AI ethics issues",
            "We have established AI ethics principles and review processes",
            "We have comprehensive responsible AI frameworks with regular audits"
        ],
        scores: [1, 2, 3, 4]
    },
    {
        question: "How does your organization measure and track ML model performance in production?",
        answers: [
            "We don't systematically track model performance",
            "We manually check model performance occasionally",
            "We have automated monitoring with basic alerts",
            "We have comprehensive ML observability with real-time dashboards and automated remediation"
        ],
        scores: [1, 2, 3, 4]
    }
];

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Remove previous selections
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark selected answer
    document.querySelectorAll('.answer-btn')[answerIndex].classList.add('selected');
    
    // Show next button
    document.getElementById('next-btn').style.display = 'inline-block';
    
    // Update progress bar when answer is selected
    updateProgressBar();
}

function nextQuestion() {
    if (selectedAnswer !== -1) {
        score += questions[currentQuestion].scores[selectedAnswer];
        currentQuestion++;
        selectedAnswer = -1;
        
        updateProgressBar();
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        // Subtract the previous score
        currentQuestion--;
        score -= questions[currentQuestion].scores[selectedAnswer];
        selectedAnswer = -1;
        loadQuestion();
        updateProgressBar();
    }
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('question-text').textContent = questionData.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Reset button states
    document.getElementById('next-btn').style.display = 'none';
    
    const backBtn = document.getElementById('back-btn');
    if (currentQuestion > 0) {
        backBtn.style.display = 'inline-block';
    } else {
        backBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    let progress;
    
    // Calculate progress based on completed questions (where answer was selected)
    if (currentQuestion === 0 && selectedAnswer !== -1) {
        // First question answered
        progress = 10;
    } else if (currentQuestion === 0) {
        // First question, no answer selected yet
        progress = 0;
    } else if (selectedAnswer !== -1) {
        // Current question has answer selected
        progress = ((currentQuestion + 1) / questions.length) * 100;
    } else {
        // On a new question but no answer selected yet - show progress for completed questions only
        progress = (currentQuestion / questions.length) * 100;
    }
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}
function showResults() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    
    let maturityLevel;
    let description;
    
if (score <= 16) {
    maturityLevel = "Emerging";
    description = "Your organization is in the early stages of ML adoption. Focus on building foundational data infrastructure and team capabilities.";
} else if (score <= 25) {
    maturityLevel = "Developing";
    description = "You have some ML initiatives underway. Consider establishing more formal processes and expanding your ML team.";
} else if (score <= 34) {
    maturityLevel = "Advanced";
    description = "Your organization has strong ML capabilities. Focus on scaling and optimizing your ML operations.";
} else {
    maturityLevel = "Leading";
    description = "You're at the forefront of ML maturity. Continue innovating and consider sharing best practices with the industry.";
}
    
document.getElementById('results-content').innerHTML = `
    <h3 style="color: #016AC9; font-size: 2.5rem; margin-bottom: 30px; text-align: left;">Your ML Maturity Level: ${maturityLevel}</h3>
    <p style="font-size: 1.2rem; margin-bottom: 30px;">${description}</p>
    <p style="color: #666; font-size: 1rem;">Score: ${score}/${questions.length * 4}</p>
        
        <div id="email-form" style="margin-top: 40px; padding: 30px; background: #f8f9fa; border-radius: 10px;">
            <h4 style="margin-bottom: 20px;">Get Your Detailed Report</h4>
            <p style="margin-bottom: 20px;">Enter your email to receive a comprehensive ML maturity assessment report.</p>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="email" id="email-input" placeholder="Enter your email" 
                       style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
               <button onclick="sendResults()" id="send-button"
                        style="padding: 12px 20px; background: linear-gradient(135deg, #016AC9, #3BD99F); 
                               color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem;">
                    Send Report
                </button>
            </div>
        </div>
        <div id="submit-message" style="margin-top: 15px; font-size: 0.9rem;"></div>
     `;
}

async function sendResults() {
    const email = document.getElementById('email-input').value;
    const submitButton = document.getElementById('send-button');
    const messageDiv = document.getElementById('submit-message');
    
    // Validate email
    if (!email || !email.includes('@')) {
        messageDiv.innerHTML = '<span style="color: #dc3545;">Please enter a valid email address</span>';
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    messageDiv.innerHTML = '<span style="color: #666;">Submitting your results...</span>';
    
    try {
        // Determine maturity level
        let maturityLevel;
        if (score <= 16) {
            maturityLevel = "Emerging";
        } else if (score <= 25) {
            maturityLevel = "Developing";
        } else if (score <= 34) {
            maturityLevel = "Advanced";
        } else {
            maturityLevel = "Leading";
        }
        
        // Send to our Netlify function
        const response = await fetch('/.netlify/functions/submit-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                score: score,
                maturityLevel: maturityLevel,
                totalQuestions: questions.length,
                timestamp: new Date().toISOString()
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            messageDiv.innerHTML = '<span style="color: #28a745;">✓ Thank you! Your ML maturity report will be sent to your email.</span>';
            submitButton.textContent = 'Sent!';
            
            // Optional: Hide the form after successful submission
            setTimeout(() => {
                document.getElementById('email-form').style.opacity = '0.6';
            }, 2000);
        } else {
            throw new Error(result.error || 'Failed to submit');
        }
        
    } catch (error) {
        console.error('Error submitting results:', error);
        messageDiv.innerHTML = '<span style="color: #dc3545;">There was an error submitting your results. Please try again.</span>';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Report';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    updateProgressBar(); // This will reset progress to 0%
    loadQuestion();
}
// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    updateProgressBar();
});