$(document).ready(function(){
    $.getJSON('https://www.opendota.com/api/live', function(data) {
        buildHtmlTable('#gamesTable', data);
        $('#gamesTable').DataTable();
    });
});

// Builds the HTML Table out of myList.
function buildHtmlTable(selector,myList) {
    var columns = addAllColumnHeaders(myList, selector);

    var rowSet$ = $('<tbody/>');

    for (var i = 0; i < myList.length; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = myList[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
      }
      rowSet$.append(row$);
    }
    $(selector).append(rowSet$);
  }
  
  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
  
    for (var i = 0; i < myList.length; i++) {
      var rowHash = myList[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1) {
          columnSet.push(key);
          headerTr$.append($('<th/>').html(key));
        }
      }
    }
    $(selector).append($('<thead/>').html(headerTr$));
  
    return columnSet;
  }
