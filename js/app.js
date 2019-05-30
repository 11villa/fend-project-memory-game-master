/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function shuffleCards(cardTypes,deck){

    cardTypes=shuffle(cardTypes);
    deck.innerHTML=bulidHtmlDeck(cardTypes,"");
}

//add the list html code for a array given
function bulidHtmlDeck(cardTypes,cardTypesHtml){

    for(i=0; i<cardTypes.length;i++){
        cardTypesHtml=`${cardTypesHtml}
        <li class="card">
            <i class="fa ${cardTypes[i]}"></i>
        </li>`;
    }   
    return cardTypesHtml;
}
function paintStars(number){
    
    let stars=document.querySelector('.stars');
    if(number==0){
        stars.innerHTML=`<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
    if(number==15)
    {
        stars.innerHTML=`<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
    if(number==17)
    {
        stars.innerHTML=`<li><i class="fa fa-star"></i></li>`;
    }
    if(number==19)
    {
        stars.innerHTML=`<li></li>`;
    }
}

function cardsActions(allCards,moves,movesCounter){
    for (const allCard of allCards){
        allCard.addEventListener('click',function(){
            if(!allCard.classList.contains("open")){
                
                if(openCards.length<2){
                    openCards.push(allCard);
                    allCard.classList.add("open","show");
                    if(openCards.length==2){
                        
                        moves+=1;
                        paintStars(moves);
                        
                        movesCounter.innerText=moves;
                        setTimeout(function(){
                            for(openCard of openCards){
                                openCard.classList.remove("open","show");
                                const firstCardClicked=openCards[0].firstElementChild;
                                const secondCardClicked=openCards[1].firstElementChild.classList[1];
                                if(firstCardClicked.classList.contains(secondCardClicked)) {
                                    openCard.classList.add("match","show");
                                }
                            }
                            openCards=[];
                        },1000);
                        
                    } 
                }

            }   
        });
           
    }
}

function restartGame(restart){
    restart.addEventListener('click',function(){

        paintStars(0);
        cardTypes=shuffle(cardTypes);
        deck.innerHTML=bulidHtmlDeck(cardTypes,"");
        
        moves=0;
        movesCounter.innerText=moves;
    
        for(openCard of openCards){
            openCard.classList.remove("open","show","match");
        }
        for(allCard of allCards){
            allCard.classList.remove("open","show","match");
        }
        allCards=document.querySelectorAll('.card');
        
        cardsActions(allCards,moves,movesCounter);
    
        openCards=[];
        allCards=[];
    
    });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



let cardTypes=['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor'
    ,'fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];

//First action, shuffle cards
let deck=document.querySelector('.deck');
shuffleCards(cardTypes,deck);

//set up move counters
let moves=0;    
let movesCounter= document.querySelector('.moves');
movesCounter.innerText=moves;

//set up stars. 0 moves at the beginning
paintStars(0);
//click event listener and open cards logic
let allCards=document.querySelectorAll('.card');
let openCards=[];
cardsActions(allCards,moves,movesCounter);

//click restart listener
let restart=document.querySelector('.restart');
restartGame(restart);








