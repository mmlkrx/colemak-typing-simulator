$(document).ready(function(){

  var letters = [];
  var current_letter = "";
  var $input = $("#input");
  var $translation = $("#translation");
  var $output = $("#output");

  function translateText(event) {
    if(event.which > 0) {
      var charStr = String.fromCharCode(event.which)
      letters.push(charStr);
    }
  }

  function deleteLetter() {
    $translation.val(($translation.val()).slice(0,-1));
  }

  function drawLetter() {
    $translation.append(letters.slice(-1))
  }

  $input.keypress(function(event){
    translateText(event);
    drawLetter();
  });
  
  $input.keyup(function(event){
    if (event.keyCode === 8) {
      deleteLetter();
    } 
  });
 

});