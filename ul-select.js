$.fn.ulSelect = function(){
  var ul = $(this);

  if (!ul.hasClass('zg-ul-select')) {
    ul.addClass('zg-ul-select');
  }
  // SVG arrow
  var arrow = '<svg id="ul-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><line stroke-width="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""/><path d="M4.131 8.962c-0.434-0.429-1.134-0.429-1.566 0-0.432 0.427-0.432 1.122 0 1.55l12.653 12.528c0.434 0.429 1.133 0.429 1.566 0l12.653-12.528c0.432-0.429 0.434-1.122 0-1.55s-1.136-0.429-1.566-0.002l-11.87 11.426-11.869-11.424z" fill="#111"/></svg>';
  $('li:first-of-type', this).addClass('active').append(arrow);
  $(this).on('click', 'li', function(event){
    // Remove div#selected if it exists
    if ($('#selected--zg-ul-select').length) {
      $('#selected--zg-ul-select').remove();
    }
    // Add a div before the <ul> to hold the selected text
    ul.before('<div id="selected--zg-ul-select">');
    // Store that div
    var selected = $('#selected--zg-ul-select');
    // Remove the arrow
    $('li #ul-arrow', ul).remove();
    // Toggle active class on the <ul>
    ul.toggleClass('active');
    // Remove active class from any <li> that has it...
    ul.children().removeClass('active');
    // And add the class to the <li> that gets clicked
    $(this).toggleClass('active');
    // The text of the click <li>
    var selectedText = $(this).text();
    // If the <ul> dropdown is open, activate the div#selected, and append the clicked <li> text (and SVG arrow)
    if (ul.hasClass('active')) {
      selected.text(selectedText).addClass('active').append(arrow);
    }
    else {
      // Remove div#selected
      selected.text('').removeClass('active'); 
      // Add the SVG arrow to the active <li>
      $('li.active', ul).append(arrow);
    }
    });
    // Close the faux select menu when clicking outside it 
    $(document).on('click', function(event){
      if($('ul.zg-ul-select').length) {
       if(!$('ul.zg-ul-select').has(event.target).length == 0) {
        return;
      }
      else {
        $('ul.zg-ul-select').removeClass('active');
        $('#selected--zg-ul-select').removeClass('active').text('');
        $('#ul-arrow').remove();
        $('ul.zg-ul-select li.active').append(arrow);
      } 
    }
  });
}
