// Define questions for the JavaScript quiz. Each question is an object with a question text, 
// an array of options, and the index (0-based) of the correct answer.
const questions = [
    {
        question: "JavaScript's language type?",
        options: [
            "Object-Oriented",
            "Object-Based",
            "Assembly-language",
            "High-level"
        ],
        answer: 1 // Index of the correct answer in the options array
    },
    {
        question: "Another name for Conditional Expression?",
        options: [
            "If-else alternative",
            "Switch",
            "If-then-else",
            "Immediate if"
        ],
        answer: 3
    },
    {
        question: "What's a statement block?",
        options: [
            "Conditional",
            "Statements compound",
            "Conditional and single",
            "Single statement"
        ],
        answer: 1
    },
    {
        question: "Interpreter does what with empty statements?",
        options: [
            "Warns",
            "Prompts completion",
            "Errors",
            "Ignores"
        ],
        answer: 3
    },
    {
        question: "'function' and 'var' are?",
        options: [
            "Keywords",
            "Data types",
            "Declarations",
            "Prototypes"
        ],
        answer: 2
    },
    {
        question: "Which variable takes precedence?",
        options: [
            "Global",
            "Local",
            "Both",
            "Neither"
        ],
        answer: 1
    },
    {
        question: "Correct way to call JavaScript code?",
        options: [
            "Preprocessor",
            "Event",
            "RMI",
            "Function"
        ],
        answer: 3
    },
    {
        question: "What's not considered an error?",
        options: [
            "Syntax error",
            "Missing semicolons",
            "Division by zero",
            "Missing Bracket"
        ],
        answer: 1
    },
    {
        question: "Number function returning its value?",
        options: [
            "toString()",
            "valueOf()",
            "toLocaleString()",
            "toPrecision()"
        ],
        answer: 1
    },
    {
        question: "What does x===y imply?",
        options: [
            "Equal value/type",
            "Different",
            "Value only",
            "Type only"
        ],
        answer: 0
    }
];

// Variables to keep track of the quiz state: which question the user is on, and their score.
let currentQuestionIndex = 0;
let score = 0;

// Function to display the current question and its options to the user.
function displayQuestion() {
    // Retrieve relevant DOM elements to update.
    const questionElement = document.getElementById('question');
    const optionsElements = document.getElementsByClassName('option');
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question object.
    const nextButton = document.getElementById('next-button');

    // Set the question text, prefixed with "Question: ".
    questionElement.textContent = "Question: " + currentQuestion.question;

    // Iterate through each option element to set its text and enable it.
    for (let i = 0; i < optionsElements.length; i++) {
        optionsElements[i].textContent = currentQuestion.options[i];
        optionsElements[i].disabled = false; // Ensure options are clickable.
        optionsElements[i].classList.remove('selected'); // Clear any previous selection.
    }

    // Update the quiz progress display (current question number out of total).
    document.getElementById('current-question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;

    // Disable the 'Next' button to prevent skipping questions before selecting an answer.
    nextButton.disabled = true;

    // Initially, the 'Next' button text is set to "Next", and will be dynamically changed to "Show Score" on the last question after an option is selected.
    nextButton.textContent = "Next";
}

// Variable to keep track of the selected option index.
let selectedOptionIndex = null;

// Function called when a user selects an option.
function selectOption(optionIndex) {
    const optionsElements = document.getElementsByClassName('option');
    const nextButton = document.getElementById('next-button');

    // Iterate through options to remove 'selected' class and highlight the selected one.
    for (let optionElement of optionsElements) {
        optionElement.classList.remove('selected');
    }
    optionsElements[optionIndex].classList.add('selected');
    selectedOptionIndex = optionIndex; // Update the tracked selected option index.

    // Log selection for debugging.
    console.log(`Option selected: ${optionIndex}, Correct answer: ${questions[currentQuestionIndex].answer}`);

    // Enable the 'Next' button after a selection is made.
    nextButton.disabled = false;

    // Dynamically change the 'Next' button text to "Show Score" on the last question.
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Show Score";
    } else {
        nextButton.textContent = "Next";
    }
}

// Function to advance to the next question or show the results if the quiz is finished.
function nextQuestion() {
    // Check if the selected option is correct and increment the score if so.
    if (questions[currentQuestionIndex].answer === selectedOptionIndex) {
        score++;
    }

    // Reset selected option index for the next question.
    selectedOptionIndex = null;

    // Move to the next question or show results if on the last question.
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Function to display the quiz results, including the user's score and a grade.
function showResults() {
    // Hide the quiz content and show the result content.
    document.getElementById('header-divider').style.display = 'none';
    document.querySelector('header h1').textContent = "Your Score";
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Clear the question container.
    document.getElementById('next-button').style.display = 'none'; // Hide the 'Next' button.

    // Calculate the score percentage.
    const percentage = (score / questions.length) * 100;

    // Determine the grade based on the score percentage.
    let grade;
    if (percentage <= 60) {
        grade = "Revisit the subject";
    } else if (percentage > 60 && percentage <= 80) {
        grade = "Fair";
    } else if (percentage > 80 && percentage <= 90) {
        grade = "Satisfactory";
    } else if (percentage > 90 && percentage <= 95) {
        grade = "Good";
    } else if (percentage > 95) {
        grade = "Excellent";
    }

    // Display the score and grade within the question container.
    questionContainer.innerHTML = `<div id="score">You got ${score} out of ${questions.length} questions correct (${percentage.toFixed(2)}%).</div>
                                   <div style="margin-top: 20px; padding: 10px; background-color: goldenrod; color: white; text-align: center; border-radius: 5px; font-weight: bold;">Grade: ${grade}</div>`;
}

// Initialize the quiz by displaying the first question.
window.onload = displayQuestion;
