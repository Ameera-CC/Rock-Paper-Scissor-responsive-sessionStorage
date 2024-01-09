/*
In this we are replacing the localStorage by using sessionStorage 
 1.localStorage  : 
    The value is stored or keeping UNTIL USER MANUALLY CLEAR the browser data.
    It has MORE storage than sessionStorage

 2.sessionStorage : 
    The value is stored or keeping UNTIL USER CLOSES THE TAB/PAGE/WINDOW .If we refresh the browser it should not clear the stored value.
    It has LESS storage than sessionStorage


*/  

let score = JSON.parse(sessionStorage.getItem('savedLocalStorage'))
console.log("Local Storage Value : " , JSON.parse(sessionStorage.getItem('savedLocalStorage'))) 
if(score === null){
    score = {
        win : 0, 
        lose : 0,
        tie : 0,
        moves : 0 //number of moves
    }

    console.log("If localstorage value is NULL  : " , score)
}

updatedScore();

// function displayResultOption() is designed to display Result(NOT scores) and selected options after the refresh
// displayResultOption()


function playGame(playerMove){
score.moves += 1; 
 const computerMove = pickComputerMove();
let result = '';
if(playerMove === 'rock' )
{
    if(computerMove === 'rock'){
        result = 'Tie';
    }
    else if (computerMove === 'paper'){
        result = 'Lose';

    }
    else if (computerMove === 'scissor'){
        result = 'Win';

    } 
    console.log("result is : " + result)       
}
else if (playerMove === 'paper')
{
    if (computerMove === 'paper'){
        result = 'Tie';
    }
    
    else if(computerMove === 'rock'){
        result = 'Win';
    }

    else if (computerMove === 'scissor'){
        result = 'Lose';
    }  
    console.log("result is : " + result)       

}
else if (playerMove === 'scissor')
{
    if (computerMove === 'scissor'){
        result = 'Tie';
    }
    
    else if(computerMove === 'rock'){
        result = 'Lose';
    }
     
    else if (computerMove === 'paper'){
        result = 'Win';
    }  
    console.log("result is : " , result)       

}
if(result === 'Tie' ){

    score.tie += 1;  
}
else  if(result === 'Win' ){
    score.win += 1; 
}
else  if(result === 'Lose' ){
    score.lose += 1; 
}

console.log("Moves total : " , score.moves);


sessionStorage.setItem('savedLocalStorage', JSON.stringify(score)) 

document.querySelector('.js-result').innerHTML = (`You  ${result}`);

document.querySelector('.js-selection').innerHTML = `<span class="display-selection-text">You picked : <span>
<img src="./images/${playerMove}-emoji.png" alt="${playerMove} img err" class="display-selection-icon">
<span class="display-selection-text">Computer picked :<span>
<img src="./images/${computerMove}-emoji.png" alt="${computerMove} img err" class="display-selection-icon">`




updatedScore();

// values of Result and selected moptions are stored in variable, for reusing those values to display after refresh (Not Restore)
var gameStatus = document.querySelector('.js-result').innerHTML;
var gameSelection = document.querySelector('.js-selection').innerHTML;

sessionStorage.setItem('GameStatus', JSON.stringify(gameStatus)) 
sessionStorage.setItem('GameSelection', JSON.stringify(gameSelection)) 


}


function pickComputerMove(){
const randomNumber = Math.random();
let computerMove = '';
if(randomNumber >=0 && randomNumber < 1/3){
    computerMove = 'rock';
}
else if(randomNumber >=1/3 && randomNumber < 2/3){
    computerMove = 'paper';
}
else if(randomNumber >=2/3 && randomNumber < 1){
    computerMove = 'scissor';
}

return computerMove;
}


function resetScore(){
score.win = 0 , 
score.lose = 0, 
score.tie = 0, 
score.moves = 0;
console.log('Reset score : ' + score.win,score.tie,score.lose);
console.log(score)
sessionStorage.removeItem('savedLocalStorage')
sessionStorage.removeItem('GameStatus')
sessionStorage.removeItem('GameSelection')
document.querySelector('.js-result').innerHTML="";
document.querySelector('.js-selection').innerHTML="";


updatedScore()

}


function updatedScore(){

document.querySelector('.js-score').innerHTML = (`Total moves : ${score.moves} , Win : ${score.win} ,  Tie : ${score.tie} , Lose : ${score.lose} `);
//  console.log(document.querySelector('.js-score').innerHTML)
}

// function to display Result and selected moptions after the refresh
function displayResultOption(){
updatedScore();

if( score != null){
    // alert("i am not null")
    console.log("Not null", score)
let refreshResult =JSON.parse(sessionStorage.getItem('GameStatus'))
let refreshSelection = JSON.parse(sessionStorage.getItem('GameSelection'))
document.querySelector('.js-result').innerHTML = refreshResult;
document.querySelector('.js-selection').innerHTML = refreshSelection;
}
else
{
    alert("i am  null")
    console.log(" null", score)

sessionStorage.removeItem('GameStatus')
sessionStorage.removeItem('GameSelection')

}

}