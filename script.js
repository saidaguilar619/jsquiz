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
        question : "How do you create a function in JavaScript?",
        choiceA : "function myFunction()  ",
        choiceB : "function:myFunction()",
        choiceC : "function = myFunction()",
        choiceD : "function = myFunction[]",
        correct : "A"
    },{
        question : "How do you round the number 7.25, to the nearest integer?",
        choiceA : "round(7.25) ",
        choiceB : "Math.round(7.25)  ",
        choiceC : "Math.rnd(7.25)",
        choiceD : "rnd(7.25)",
        correct : "B"
    },{
        question : "How do you find the number with the highest value of x and y?",
        choiceA : "ceil(x, y)",
        choiceB : "top(x, y)",
        choiceC : "Math.max(x, y)",
        choiceD : "Math.ceil(x, y)",
        correct : "C"
    },{
        question : "How can you detect the client's browser name?",
        choiceA : "browser.name",
        choiceB : "client.navName",
        choiceC : "navigator.appName  ",
        choiceD : "client.browserName",
        correct : "C"
    }
];

let lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 60;
let questionTime = 60; 
let gaugeUnit = 150;
let timer;
let score = 0;
let totalScore;

function renderQuestion(){
    let q = questions[currentQuestion];
    pq.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    setTimeout(function(){
        document.getElementById("choiceResult").textContent = "";
    },2000);
}

function startQuiz(){
    startEl.style.display = "none";
    quizEl.style.display = "block";
    document.getElementById("high").textContent = localStorage.getItem("highestInfo");
    timer = setInterval(renderCounter,1000); 
    renderQuestion(); 
}

function renderCounter(){
    if(count > 0 ){
        counter.innerHTML = count;
        count--;
    }else{
        clearInterval(timer);
        scoreRender();
    }
}

function checkAnswer(answer){
    if( answer === questions[currentQuestion].correct){   
        document.getElementById("choiceResult").textContent = "Correct";
        score++;
    }else{
        count -= 10;
        document.getElementById("choiceResult").innerHTML = "Incorrect";
    }

    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    }else{        
        scoreRender();
        clearInterval(timer);
    }
}

function setScore(){
    var userIni = document.getElementById("initials").value;
    let storeInfo = totalScore + "points - " + userIni

    document.getElementById("btn1").style.display = "none";
    
    document.getElementById("high").textContent = storeInfo;
    localStorage.setItem("highestInfo", storeInfo);
    localStorage.setItem("highestScore", totalScore);
}

function scoreRender(){
    totalScore = (score * 10) + count;
    quizEl.style.display = "none"; 
    scoreEl.style.display = "block";
    document.getElementById("display").textContent = "Your Score:" + totalScore;
    if (totalScore > localStorage.getItem("highestScore")){
        document.getElementById("userScore").textContent = "High Score! \n Please Enter Your Initials:" ;
    }else{
        document.getElementById("userScore").textContent = "Sorry No High Score" ;
        document.getElementById("initials").style.display = "none";
        document.getElementById("btn1").style.display = "none";
    }
}

startEl.addEventListener("click",startQuiz);
