
const startEl = document.getElementById("start");
const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");


const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");

const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("highScore");

let questions = [
    {
        question : "How does a WHILE loop start?", 
        choiceA : "While(i <= 10)",
        choiceB : "While i <= 10",
        choiceC : "While(i <= 10; i++)",
        choiceD : "While(i <= 10; i < 5; i++)",
        correct : "A"
    },{
        question : "Which operator is used to assign a value to a variable?",
        choiceA : "*",
        choiceB : "-",
        choiceC : "~",
        choiceD : "=",
        correct : "D"
    },{
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "<script>  ",
        choiceB : "<javascript>",
        choiceC : "<js>",
        choiceD : "<scripting>",
        correct : "A"
    },{
        question : "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choiceA : "<script src='xxx.js'> ",
        choiceB : "<script href='xxx.js>",
        choiceC : "<script name='xxx.js'>",
        choiceD : "<script id='xxx.js'>",
        correct : "A"
    
    },{
        question : "How do you create a function in JavaScript?",
        choiceA : "function myFunction()  ",
        choiceB : "function:myFunction()",
        choiceC : "function = myFunction()",
        choiceD : "function = myFunction[]",
        correct : "A"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 100; 
const gaugeUnit = 150 / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    questionEl.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

// start quiz
function startQuiz(){
    startEl.style.display = "none";
    renderQuestion();
    quizEl.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
       
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;    
        answerIsCorrect();
    }else{
        // answer is wrong
        //timer - 10secs
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    // document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    // document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    //highScore.innerHTML += "<p>"+ +"</p>";
}
start.addEventListener("click",startQuiz);