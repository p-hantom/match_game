var MatchGame = {};

$(document).ready(function(){
  var $game=$('#game');
  var cardValues=MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues,$game);
});

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardValues=[];
  for(var i=1;i<=8;i++){
    cardValues.push(i);
    cardValues.push(i);
  }
  var randomValues=[];
  for(var i=0;i<16;i++){
    var r=Math.floor(Math.random()*16);
    if(cardValues[r]===-1){
      i--;
      continue;
    }
    randomValues.push(cardValues[r]);
    cardValues[r]=-1;
  }
  return randomValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
var cnt=0;

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

    $game.empty();
    $game.data('flippedCards',[]);

    for(var i=0;i<cardValues.length;i++){
      var value=cardValues[i];
      var color=colors[value-1];
      var data={
        value: value,
        color: color,
        isFlipped: false
      };
      var $cardElement=$('<div class="col-md-3 card"></div>');
      $cardElement.data(data);
      $game.append($cardElement);
    }

    $('.card').click(function(){
      MatchGame.flipCard($(this),$game);
    });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('isFlipped')===true){
    return;
  }

  $card.css('background-color',$card.data('color'));
  $card.data('isFlipped',true);
  $card.html('<span class="number">'+$card.data('value')+'</span>');

  var flippedCards=$game.data('flippedCards');
  flippedCards.push($card);

  if(flippedCards.length===2){
    if(flippedCards[0].data('value')==$card.data('value')){
      //change to the match mode
      cnt++;
      var matchCss={
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css('background-color',matchCss.backgroundColor);
      flippedCards[1].css('background-color',matchCss.backgroundColor);
      flippedCards[0].css('color',matchCss.color);
      flippedCards[1].css('color',matchCss.color);
      if(cnt===8){
        window.alert("You win!");
        cnt=0;
      }
    }
    else{
      $card.data('isFlipped',false);
      flippedCards[0].data('isFlipped',false);
      var card1 = flippedCards[0];
      //change to the unflipped mode
      window.setTimeout(function(){
        $card.empty();
        card1.empty();
        $card.css('background-color','rgb(32,64,86)');
        card1.css('background-color','rgb(32,64,86)');
      },350);
      //

    }
    flippedCards.pop();flippedCards.pop();
    //flippedCards=[];
  }

};

MatchGame.clear = function($game){
  var cardValues=MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues,$game);
}
