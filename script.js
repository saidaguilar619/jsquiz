// select important divs
let startEl = document.getElementById("start");
let quizEl = document.getElementById("quiz");
let pqEl = document.getElementById("pq");
let counter = document.getElementById("counter");
let scoreEl = document.getElementById("highScore");

// select choices
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");

// array with all of the questions
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

// important variables
const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 60;
let score = 0;
let timer;
let totalScore;

// this function is called when user clicks start button
function startQuiz(){
    startEl.style.display = "none";
    quizEl.style.display = "block";
    timer = setInterval(renderCounter,1000); 
    askQuestion(); 
}

// countdown starts at 60
function renderCounter(){
    if(count > 0 ){
        counter.innerHTML = count;
        count--;
    }else{
        clearInterval(timer);
        scoreRender();
    }
}

// ask user question changes to next after each click
function askQuestion(){
    let q = questions[currentQuestion]; //chooses question from array starting with 0
    pq.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

    setTimeout(function(){     // makes result dissapear after 2 seconds
        document.getElementById("choiceResult").textContent = "";
    },2000);
}

// called after user clicks on any choice
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
        askQuestion();
    }else{        
        scoreRender();
        clearInterval(timer);
    }
}

// called at the end of quiz to show score and check for high score
function scoreRender(){
    totalScore = (score * 10) + count;
    quizEl.style.display = "none"; 
    scoreEl.style.display = "block";
    document.getElementById("display").textContent = "Your Score: " + totalScore + " points";
    if (totalScore > localStorage.getItem("highestScore")){
        document.getElementById("userScore").textContent = "High Score! Please Enter Your Initials" ;
    }else{
        document.getElementById("userScore").textContent = "Sorry No High Score" ;
        document.getElementById("initials").style.display = "none";
        document.getElementById("setHighScore").style.display = "none";
    }
}

// called when user clicks on set score button . dissapears after clicked
function setScore(){
    var userIni = document.getElementById("initials").value;
    let storeInfo = totalScore + " points - " + userIni
    document.getElementById("high").textContent = storeInfo;
    localStorage.setItem("highestInfo", storeInfo);
    localStorage.setItem("highestScore", totalScore);
    document.getElementById("setHighScore").style.display = "none";
    document.getElementById("initials").style.display = "none";
    document.getElementById("userScore").textContent = "Thank You For Playing" ;
}

// called when user clicks on clear button 
function clearScore(){
    localStorage.clear();
    document.getElementById("high").textContent = "";
    document.getElementById("setClear").style.display = "none";
}

// called when user clicks on retry quiz button . reloads document
function retry(){
    location.reload();
}

// displays high score from local storage
document.getElementById("high").textContent = localStorage.getItem("highestInfo");
startEl.addEventListener("click",startQuiz);
