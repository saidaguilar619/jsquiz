let startEl = document.getElementById("start");
let quizEl = document.getElementById("quiz");
let pqEl = document.getElementById("pq");

let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");

let counter = document.getElementById("counter");
let timeGauge = document.getElementById("timeGauge");
let progress = document.getElementById("progress");
let scoreEl = document.getElementById("highScore");

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
        choiceA : "<script>",
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

let lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 100;
let questionTime = 100; 
let gaugeUnit = 150;
let timer;
let score = 0;

function renderQuestion(){
    console.log(currentQuestion);
    let q = questions[currentQuestion];
    pq.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function startQuiz(){
    startEl.style.display = "none";
    quizEl.style.display = "block";
    timer = setInterval(renderCounter,1000); 
    renderQuestion(); 
}

function renderCounter(){
    if(count !== 0 || currentQuestion === lastQuestion ){
        counter.innerHTML = count;
        btimeGauge.style.width -= 1 ;
        count--;
    }
}

function checkAnswer(answer){
    if( answer === questions[currentQuestion].correct){   
        score++;
    }else{
        count -= 10;
    }

    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    }else{        
        scoreRender();
    }
}

function scoreRender(){
    quizEl.style.display = "none";
    scoreEl.innerHTML += "<p>"+ score +"</p>";
    scoreEl.style.display = "block";
}

startEl.addEventListener("click",startQuiz);
