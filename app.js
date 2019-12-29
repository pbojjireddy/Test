

var scores, roundScore, activePlayer, dice, dice_1, gameOver, dice_prev, target_score, dice1, dice2;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameOver === false)
    {  
        if(dice2 === true ){
            dice = Math.floor(Math.random() * 6 + 1);
            dice_1 = Math.floor(Math.random() * 6 + 1);
            if(dice === 1 || dice_1 === 1 ){
                changePlayer();
            }
            else{
                updateRoundScore();
            }
        }else if(dice1 === true ){
            dice = Math.floor(Math.random() * 6 + 1);
            if(dice !== 1){
                if( dice === 6 ) {
                    if( dice_prev === dice ){
                        scores[activePlayer] = 0;
                        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                        changePlayer();
                    }
                    else {
                        updateRoundScore();
                    }
                }
                else {
                    updateRoundScore();
                }
            }else {
                changePlayer();
            }
        }
    }
} );

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gameOver === false){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if ( scores[activePlayer] >= target_score) {

            document.getElementById('name-' + activePlayer).textContent = 'WINNER !!!'
            document.getElementById('name-' + activePlayer).classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            gameOver = true;
        }else {
            changePlayer();    
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.getElementById('btnSearch').addEventListener('click', function(){
    setTarget();
})

document.getElementById('target_score').addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        setTarget();
    }
});

document.getElementById('r1').addEventListener('change', function(){
    init();
});

document.getElementById('r2').addEventListener('change', function(){
    init();
})

function changePlayer(){
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');        
    document.querySelector('.dice').style.display = 'block';
   
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    if(dice2 === true){
    document.querySelector('.dice2').src = 'dice-' + dice_1 + '.png';  
     document.querySelector('.dice2').style.display = 'block';    
    }
    
    roundScore = 0;
    dice_prev = 0;
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameOver = false;
    dice_prev = 0;
    dice1 = false;
    dice2 = false;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    dice2 = document.getElementById('r2').checked;
    if(dice2 === false){
            document.getElementById('r1').checked = true;
    }
    dice1 = document.getElementById('r1').checked;
    
}

function updateRoundScore(){
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    roundScore += dice;
    dice_prev = dice;
    if(dice2 === true ){
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice2').src = 'dice-' + dice_1 + '.png';
        roundScore += dice_1;
    }
    document.getElementById('current-' + activePlayer).textContent = 'roundScore';

}

function setTarget(){
    target_score = document.getElementById('target_score').value;
    document.getElementById('set-target').textContent = target_score;
}