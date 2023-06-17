function CreatePayment() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sourceSheet = spreadsheet.getSheetByName("New Entry");
    var destinationSheetName = sourceSheet.getRange("A14").getValue();
    var destinationSheet = spreadsheet.getSheetByName(destinationSheetName);
    
    var newRow = sourceSheet.getRange("B14:J14").getValues()[0];
    var destinationRange = destinationSheet.getRange("A1:I");
    
    var lastRow = destinationSheet.getLastRow();
    var destinationEmptyRow = lastRow + 1;
    var destinationRangeToPaste = destinationRange.offset(destinationEmptyRow - 1, 0, 1, newRow.length);
    
    destinationRangeToPaste.setValues([newRow]);
  }
  

  function CreateLanding() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sourceSheet = spreadsheet.getSheetByName("New Entry");
    var destinationSheetName = sourceSheet.getRange("B42").getValue();
    var destinationSheet = spreadsheet.getSheetByName(destinationSheetName);
    
    var newRow = sourceSheet.getRange("A45:E45").getValues()[0];
    var destinationRange = destinationSheet.getRange(destinationSheet.getLastRow() + 1, 1, 1, newRow.length);
    
    destinationRange.setValues([newRow]);
  }
  