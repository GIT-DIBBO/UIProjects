let rows = 4;
let cols = 4;

$(document).ready(function() {

  let sliceStr = createSlices(true);
  $('#puzzleContainer').html(sliceStr);

  $('#start').on('click', function() {
    let divs = $('#puzzleContainer > div');
    let allDivs = shuffle(divs);
    $('#pieceBox').empty();
    allDivs.each(function() {
      let leftDistance = Math.floor((Math.random() * 280)) + 'px';
      let topDistance = Math.floor((Math.random() * 280)) + 'px';
      $(this).addClass('imgDraggable').css({ position: 'absolute', left: leftDistance, top: topDistance });
      $('#pieceBox').append($(this));
    });

    let sliceStr = createSlices(false);
    $('#puzzleContainer').html(sliceStr);
    $(this).hide();
    $('#reset').show();

    addPuzzleEvents();
  });

  $('#reset').on('click', function() {
    let sliceStr = createSlices(true);
    $('#puzzleContainer').html(sliceStr);
    $('#pieceBox').empty();
    $('#message').empty().hide();
    $(this).hide();
    $('#start').show();
  });

});



function createSlices(useImage) {
  let str = '';
  for (let i = 0, top = 0, c = 0; i < rows; i++, top -= 100) {
    for (let j = 0, left = 0; j < cols; j++, left -= 100, c++) {
      if (useImage) {
        str += '<div style="background-position: ' + left + 'px ' + top + 'px;" class="img" data-sequence="' + c + '">';
      } else {
        str += '<div style="background-image:none;" class="img imgDroppable">';
      }
      str += '</div>';
    }
  }
  return str;
}


function shuffle(o) {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}


function addPuzzleEvents() {
  $('.imgDraggable').draggable({
    revert: 'invalid',
    start: function(event, ui) {
      let $this = $(this);
      if ($this.hasClass('pieceDropped')) {
        $this.removeClass('pieceDropped');
        ($this.parent()).removeClass('piecePresent');
      }
    }
  });
  $('.imgDroppable').droppable({
    hoverClass: "ui-state-highlight",
    accept: function(draggable) {
      return !$(this).hasClass('piecePresent');
    },
    drop: function(event, ui) {
      let draggable = ui.draggable;
      let droppedOn = $(this);
      droppedOn.addClass('piecePresent');
      $(draggable).detach().addClass('pieceDropped').css({ top: 0, left: 0, position: 'relative' }).appendTo(droppedOn);
      checkIfPuzzleComplete();
    }
  });
}


function checkIfPuzzleComplete() {
  if ($('#puzzleContainer div.pieceDropped').length != 16) {
    return false;
  }
  for (let i = 0; i < 16; i++) {
    let puzzlePiece = $('#puzzleContainer div.pieceDropped:eq(' + i + ')');
    let sequence = parseInt(puzzlePiece.data('sequence'), 10);
    if (i != sequence) {
      $('#message').text('Nope! You made the kitty sad :(').show();
      return false;
    }
  }
  $('#message').text('YaY! Kitty is happy now :)').show();
  return true;
}