var sectionCounter = $('#hidden-value').val() || 1;
var $newSection = $('#new-section');
$newSection.on('click', function () {
  event.preventDefault();
  var $divOne = $('<div>');
  var $divTwo = $('<div>');
  var $newSectionLabel =
    $('<label for="section' + sectionCounter + '">');
  var $newContentLabel =
    $('<label for="section-content' + sectionCounter + '">');
  var $newInput =
    $('<input id="section' + sectionCounter + '" type="text" name="article[content][' + sectionCounter + '][title]"><br/>');
  var $newTextArea =
    $('<textarea id="section-content' + sectionCounter + '" name="article[content][' + sectionCounter + '][content]">');
  var $newPreview = $('<div class="section section-content' + sectionCounter + '">')
  var $flexdiv = $('<div class="markdown">')

  $newSectionLabel.text('Section Title:').append($('<br/>'));
  $newContentLabel.text('Section Content:').append($('<br/>'));
  $newTextArea.append($('<br/>'))
  $divOne.append($newSectionLabel)
         .append($newInput)
         .append($('<br/>'));
  $divTwo.append($newContentLabel)
         .append($newTextArea)
         .append($('<br/>'));
  $flexdiv.append($divTwo)
          .append($newPreview);
  $('fieldset').append($divOne)
               .append($flexdiv);
  sectionCounter++;
});

$("body").on("keyup", "textarea", function (e) {
  var $ta = $(this);
  var $prev = $("." + $ta.attr('id'));
  $prev.html(marked($ta.val()));
});
