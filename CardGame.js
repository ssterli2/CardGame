'use strict';

$(document).ready(function(){
  var newDeck = new Deck();
  var Dealer = new Player('Dealer');
  var Player1 = new Player('Player1');

// When you click the start button
  $('#start').click(function() {
    // New deck is instantiated
    var newDeck = new Deck();
    // Deck is shuffled
    newDeck.shuffle();
    newDeck.shuffle();
    newDeck.shuffle();
    // Dealera nd player each receive 2 cards
    Dealer.hand.push(newDeck.deal(), newDeck.deal());
    Player1.hand.push(newDeck.deal(), newDeck.deal());
    // Initial check for win or loss
    var dealer = Dealer.winLoss();
    console.log(dealer);
    var player = Player1.winLoss();
    console.log(player);
    
    if (!player){
      $('#player').append('<h1> YOU LOSE :( </h1>');
    }
    else if (!dealer){
      $('#player').append('<h1> YOU WIN!!!!!!!!!!!!!!!!! </h1>');
      $('#back').remove();
      $('#dealer').append('<img src="./images/' + Dealer.hand[1].name() + '.png" alt="img">');
    }
    else if (player === true) {
      $('#player').append('<h1> YOU WIN!!!!!!!!!!!!!!!!! </h1>');
    }
    for (var i = 0; i < 2; i ++){
      $('#player').append('<img src="./images/' + Player1.hand[i].name() + '.png" alt="img">');
    }
    $('#dealer').append('<img src="./images/' + Dealer.hand[0].name() + '.png" alt="img">');
    $('#dealer').append('<img src="./images/b1fv.png" alt="img" id="back">');
  });

// When you click the hit button
  $('#hit').click(function() {
    var card = newDeck.deal();
    $('#player').append('<img src="./images/' + card.name() + '.png" alt="img">');
    Player1.hand.push(card);
    var player = Player1.winLoss();
    console.log(player);
    if (player === true) {
      $('#player').append('<h1> YOU WIN!!!!!!!!!!!!!!!! </h1>');
    }
    else if (!player){
      $('#player').append('<h1> YOU LOSE :( </h1>');
    }
  });

// When you click the stay button
  $('#stay').click(function() {
    while (Dealer.sum < 18){
      var card = newDeck.deal();
      $('#dealer').append('<img src="./images/' + card.name() + '.png" alt="img">');
      Dealer.hand.push(card);
      var dealer = Dealer.winLoss();
      if (dealer === true){
        $('#player').append('<h1> YOU LOSE :( </h1>');
        return;
      }
      else if (!dealer) {
        $('#player').append('<h1> YOU WIN!!!!!!!!!!!!!!!!! </h1>');
        return;
      }
      console.log(card.name());
    }
    var outcome = Player1.sumCompare(Dealer);
    if (!outcome){
      $('#player').append('<h1> YOU LOSE :( </h1>');
    }
    else
    {
      $('#player').append('<h1> YOU WIN!!!!!!!!!!!!!!!!! </h1>');
    }
  });

});

// Function to creat a card
function Card(suit, value){
  this.suit = suit;
  this.value = value;
// The name needs to match the naming conventions of the card images "s" = Spades, "h" = Hearts, "c" = Clubs, "d" = Diamonds
  this.name = function(){
    var suits = ['s', 'h', 'c', 'd'];
    return suits[this.suit] + this.value;
  };
};

// Function to create a new deck
function Deck() {
  this.newDeck = function(){
    cards = [];
    for (var i = 0; i < 4; i++){
      for (var j = 2; j < 10; j++){
        cards.push(new Card(i, j));
      }
    }
    cards.push(new Card(1, 1));
    cards.push(new Card (0, 10));
  };

  var cards = [];
  this.newDeck();

  this.shuffle = function(){
    for (var i = 0; i < cards.length; i++){
      var randomNum = Math.floor(Math.random() * (cards.length));
      var temp = cards[i];
      cards[i] = cards[randomNum];
      cards[randomNum] = temp;
    }
  };

  this.deal = function() {
    return cards.pop();
  };
}
// Function to create a player (the dealer is also a player)
function Player(name){
  this.name = name;
  this.hand = [];
  this.sum = 0;
  this.deckDeal = function(deck){
    this.hand.push(deck.deal());
  };
  this.discard = function(cardIndex){
    this.hand.splice(cardIndex, 1);
  };
  this.winLoss = function(){
    var newSum = 0;
    var ten = false;
    var ace = false;
    for (var i = 0; i < this.hand.length; i++){
      console.log(this.hand[i].value);
      newSum += this.hand[i].value;
      if (this.hand[i].value === 10){
        ten = true;
      }
      else if (this.hand[i].value === 1){
        ace = true;
      }
    }
    this.sum = newSum;
    if (newSum === 10 || newSum > 21 || ten){
      return false;
    }
    else if (newSum === 21 || ace){
      return true;
    }
    return newSum;
  };

  this.sumCompare = function(Dealer){
    if (Dealer.sum > this.sum){
      return false;
    }
    else {
      return true;
    }
  };
}
