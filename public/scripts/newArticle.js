var sectionCounter = $('#hidden-value').val() || 1;
var $newSection = $('#new-section');
$newSection.on('click', function () {
  event.preventDefault();
  var $divOne = $('<div class="input-field">');
  var $divTwo = $('<div class="input-field">');
  var $newSectionLabel =
    $('<label for="section' + sectionCounter + '">');
  var $newContentLabel =
    $('<label for="content' + sectionCounter + '">');
  var $newInput =
    $('<input id="section' + sectionCounter + '" type="text" name="article[content][' + sectionCounter + '][title]"><br/>');
  var $newTextArea =
    $('<textarea id="content' + sectionCounter + '" name="article[content][' + sectionCounter + '][content]">');

  $newSectionLabel.text('Section Title:').append($('<br/>'));
  $newContentLabel.text('Section Content:').append($('<br/>'));
  $newTextArea.append($('<br/>'))
  $divOne.append($newSectionLabel)
         .append($newInput)
         .append($('<br/>'));
  $divTwo.append($newContentLabel)
         .append($newTextArea)
         .append($('<br/>'));
  $('fieldset').append($divOne)
               .append($divTwo);
  sectionCounter++;
});
