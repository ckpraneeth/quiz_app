const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerButtonsElement = document.getElementById('answer-buttons');

// Creating a result container dynamically
const resultContainer = document.createElement('div');
resultContainer.id = "result-container";
resultContainer.style.display = "none";
resultContainer.style.textAlign = "center";
resultContainer.style.padding = "20px";
resultContainer.style.fontSize = "20px";
resultContainer.style.fontWeight = "600";
document.querySelector(".quiz-container").appendChild(resultContainer);

// Exit button
const exitButton = document.createElement('button');
exitButton.innerText = "Exit";
exitButton.classList.add("btn", "exit-btn");
exitButton.style.marginTop = "10px";
exitButton.style.backgroundColor = "red";
exitButton.addEventListener("click", () => {
    document.getElementById("myDiv").style.display = "block"; // Show welcome message
    questionContainer.classList.add("hide");
    resultContainer.style.display = "none";
    startButton.classList.remove("hide");
    nextButton.innerText = "Next";
});
resultContainer.appendChild(exitButton);


let currentQuestionIndex, selectedQuestions;
let score = 0;

// Question bank
const allQuestions = [
        
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Pb", correct: false },
            { text: "Fe", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Stephen Hawking", correct: false }
        ]
    },
    {
        question: "What is the smallest unit of life?",
        answers: [
            { text: "Atom", correct: false },
            { text: "Molecule", correct: false },
            { text: "Cell", correct: true },
            { text: "Tissue", correct: false }
        ]
    },
    {
        question: "Which country is famous for the Great Wall?",
        answers: [
            { text: "India", correct: false },
            { text: "China", correct: true },
            { text: "Russia", correct: false },
            { text: "Japan", correct: false }
        ]
    },
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "10", correct: false },
            { text: "12", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Gobi Desert", correct: false },
            { text: "Sahara Desert", correct: true },
            { text: "Arabian Desert", correct: false },
            { text: "Thar Desert", correct: false }
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            { text: "0°C", correct: true },
            { text: "100°C", correct: false },
            { text: "-10°C", correct: false },
            { text: "10°C", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "How many sides does a hexagon have?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false }
        ]
    },
    {
        question: "Which famous scientist discovered gravity?",
        answers: [
            { text: "Galileo Galilei", correct: false },
            { text: "Isaac Newton", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Platinum", correct: false }
        ]
    },
    {
        question: "Which continent is the largest by area?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Asia", correct: true },
            { text: "North America", correct: false },
            { text: "Europe", correct: false }
        ]
    },
    {
        question: "Which is the largest planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who invented the telephone?",
        answers: [
            { text: "Thomas Edison", correct: false },
            { text: "Alexander Graham Bell", correct: true },
            { text: "Nikola Tesla", correct: false },
            { text: "Isaac Newton", correct: false }
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "90°C", correct: false },
            { text: "100°C", correct: true },
            { text: "110°C", correct: false },
            { text: "120°C", correct: false }
        ]
    },
    {
        question: "What is the speed of light?",
        answers: [
            { text: "300,000 km/s", correct: true },
            { text: "150,000 km/s", correct: false },
            { text: "450,000 km/s", correct: false },
            { text: "600,000 km/s", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Processing Unit", correct: false },
            { text: "Central Performance Unit", correct: false },
            { text: "Central Processor Utility", correct: false }
        ]
    },
    {
        question: "Which of the following is a programming language?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "Java", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Who is known as the Father of Computers?",
        answers: [
            { text: "Alan Turing", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Tim Berners-Lee", correct: false }
        ]
    },
    {
        question: "Which Indian city is known as the Silicon Valley of India?",
        answers: [
            { text: "Hyderabad", correct: false },
            { text: "Pune", correct: false },
            { text: "Bangalore", correct: true },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Which Indian festival is known as the festival of lights?",
        answers: [
            { text: "Holi", correct: false },
            { text: "Navratri", correct: false },
            { text: "Eid", correct: false },
            { text: "Diwali", correct: true }   
        ]
    },
    {
        question: "Which Indian scientist is known for his contribution to missile technology?",
        answers: [
            { text: "C.V. Raman", correct: false },
            { text: "A.P.J. Abdul Kalam", correct: true },
            { text: "Homi Bhabha", correct: false },
            { text: "Vikram Sarabhai", correct: false }
        ]
    },
    {
        question: "Which Indian state has the highest population?",
        answers: [
            { text: "Maharashtra", correct: false },
            { text: "Uttar Pradesh", correct: true },
            { text: "West Bengal", correct: false },
            { text: "Tamil Nadu", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of an operating system?",
        answers: [
            { text: "Microsoft Word", correct: false },
            { text: "Windows", correct: true },
            { text: "Google Chrome", correct: false },
            { text: "MySQL", correct: false }
        ]
    },
    {
        question: "Which Indian IT company is among the top 3 in the world?",
        answers: [
            { text: "Bajaj", correct: false },
            { text: "Tata Steel", correct: false },
            { text: "Reliance", correct: false },
            { text: "Infosys", correct: true }
        ]
    },
    {
        question: "Which Indian state is famous for tea production?",
        answers: [
            { text: "Punjab", correct: false },
            { text: "Rajasthan", correct: false },
            { text: "Gujarat", correct: false },
            { text: "Assam", correct: true }
        ]
    },
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        showFinalResult();
    }
});

function startGame() {
    document.getElementById("myDiv").style.display = "none";
    startButton.classList.add('hide');
    resultContainer.style.display = "none"; // Hide result screen
    questionContainer.classList.remove('hide'); // Show quiz container
    nextButton.classList.add('hide'); // Hide next button at the start
    score = 0;

    // Shuffle and select a random subset of questions
    selectedQuestions = shuffleArray(allQuestions).slice(0, 15); // Select 10 random questions
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}`;
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    
    if (correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Always mark correct answer green
        }
        button.disabled = true; // Disable buttons after selection
    });

    if (currentQuestionIndex < selectedQuestions.length - 1) {
        nextButton.classList.remove('hide'); // Show next button for all questions except the last one
    } else {
        nextButton.classList.remove('hide'); // Still show next button after the last question
        nextButton.innerText = "Finish"; // Change text to indicate the last step
    }
}

function showFinalResult() {
    questionContainer.classList.add("hide"); // Hide question container
    nextButton.classList.add('hide'); // Hide next button on result screen

    let thankYouMessage = document.createElement('h2');
    thankYouMessage.innerText = "🎉 Thank you for playing!🎉";
    thankYouMessage.style.fontSize = "20px"; // Larger font size for thank-you message
    thankYouMessage.style.fontWeight = "800";
    thankYouMessage.style.color = "#fff"; // Attractive blue color
    thankYouMessage.style.marginBottom = "10px";
    thankYouMessage.style.whiteSpace = "nowrap"; // Ensure single-line display
    thankYouMessage.style.maxWidth = "100%";

    let motivationMessage = document.createElement('p');
    motivationMessage.classList.add("motivation-glow");
    motivationMessage.style.color = "#fff";
    motivationMessage.style.fontSize = "18px"; // Larger text for impact
    motivationMessage.style.fontWeight = "bold";
    motivationMessage.style.textAlign = "center";
    motivationMessage.style.padding = "10px";
    motivationMessage.style.textShadow = "0 0 10px cyan"; // Default glow
    
    
    if (score === 15) {
        motivationMessage.innerText = "🌟 Outstanding! You got a perfect score! You're a genius!";
        startConfetti();
    } else if (score >= 11) {
        motivationMessage.innerText = "🔥 Amazing! You almost nailed it! Keep up the great work!";
        startConfetti();
    } else if (score >= 9) {
        motivationMessage.innerText = "👍 Great job! You're doing really well, just a little more to reach perfection!";
    } else if (score >= 6) {
        motivationMessage.innerText = "🙂 Good effort! You're on the right track. Keep practicing!";
    } else if (score >= 3) {
        motivationMessage.innerText = "💪 Don't give up! You're improving, just keep practicing and you'll get better!";
    } else {
        motivationMessage.innerText = "🚀 Keep trying! Every mistake is a step towards learning. You got this!";
    }
    
    

    let scoreMessage = document.createElement('p');
    scoreMessage.innerText = `🏆 Your Score: ${score} / ${selectedQuestions.length}`;
    scoreMessage.style.color = "#39FF14";
    scoreMessage.style.textShadow = "0 0 10px white"; // Default glow

    resultContainer.innerHTML = ""; // Clear previous content
    resultContainer.appendChild(thankYouMessage);
    resultContainer.appendChild(motivationMessage);
    resultContainer.appendChild(scoreMessage);
    resultContainer.appendChild(exitButton);

    resultContainer.style.display = "block"; // Show result container
}

// Function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}



//Celebration Effect
function startConfetti() {
    var duration = 2 * 1000; // Confetti duration in milliseconds (2 seconds)
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 50,
            origin: { x: 0 } // Left side confetti
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 50,
            origin: { x: 1} // Right side confetti
        });
        confetti({
            particleCount: 5,
            spread: 100,
            startVelocity: 30,
            origin: { x: 0.5, y: 0 }, // Top-center
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function toggleInfo() {
    let content = document.getElementById("info-content");
    content.style.display = content.style.display === "block" ? "none" : "block";
}

