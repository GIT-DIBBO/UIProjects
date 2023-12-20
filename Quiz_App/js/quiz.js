$(document).ready(function() {
  createQuizLayout();
  initQuiz();
});

// Quiz Function
function createQuizLayout() {

  //declare arrays of countries and their capitals.
  const countries = ["USA", "UK", "India", "Germany", "Turkey", "France", "Nepal", "Japan", "South Africa", "Maldives"];

  const capitals = ["Washington", "London", "Delhi", "Berlin", "Istanbul", "Paris", "Kathmandu", "Tokyo", "Capetown", "Male"];


  let arrCountry = [];

  for (let i = 0; i < countries.length; i++) {
    arrCountry.push('<li data-index="' + (i + 1) + '">' + countries[i] + '</li>');
  }


  let arrCapital = [];

  for (var i = 0; i < capitals.length; i++) {
    arrCapital.push('<li data-index="' + (i + 1) + '">' + capitals[i] + '</li>');
  }


  // Shuffle Function
  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };


  //shuffle the arrays  
  arrCountry = shuffle(arrCountry);
  arrCapital = shuffle(arrCapital);

  // once country and capital items are ready, we insert them into DOM  
  $('#source').html(arrCountry.join(''));
  $('#target').html(arrCapital.join(''));

}


// Initial Quiz function
function initQuiz() {

  // Draggable Code
  $('#source li').draggable({
    revert: true,
    revertDuration: 200,
    cursor: 'move'
  });

  // Droppable Code
  let totalScore = 0;

  $('#score').text(totalScore + ' points');

  $('#target li').droppable({

    accept: function(draggable) {
      if (parseInt(draggable.data('index'), 10) === parseInt($(this).data('index'), 10)) {

        return true;
      } else {

        return false;
      }
    },

    drop: function(event, ui) {

      let that = $(this);

      that.addClass("ui-state-highlight").html('Correct!').effect('bounce');

      that.droppable('disable');

      ui.draggable.addClass('correct ui-state-error');

      (ui.draggable).draggable('disable');

      totalScore++;

      $('#score').text(totalScore + ' points');

      if ($('li.correct').length == 10) {
        $('#dialog-complete').dialog({
          resizable: false,
          modal: true
        });
      }
    }
  })
}