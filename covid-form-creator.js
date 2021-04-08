function createNewForm() {
  // Get the form and all responses
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  // Get the number of responses and subtract header row
  var len = formResponses.length -1;
  // Get the last form response from the most recent submit
  var formResponse = formResponses[len];
  // Get the user's answers to those responses
  var itemResponses = formResponse.getItemResponses();
  // Loop through parental information and place in an array
  var parent = [];
  for (var i = 0; i < 5; i++) {
    var parentInfo = itemResponses[i];
    parent.push(parentInfo.getResponse());
  }
  // Loop through child information in the form and place it in a multidimensional array
  var children = [];
  for (var j = 5; j < itemResponses.length; j += 3) {
    var fname = itemResponses[j];
    if (typeof fname != 'undefined') {
      var first = fname.getResponse();
    }
    var lname = itemResponses[j+1];
    if (typeof lname != 'undefined') {
      var last = lname.getResponse();
    }
    var school = itemResponses[j+2];
    if (typeof school != 'undefined') {
      var sch = school.getResponse();
    }
    if (first != '' && last != '' && sch != '') {
      children.push([first,last,sch]);
    }
  }
  var newForm = FormApp.create(parent[1]+', '+parent[0]);
  newForm.addMultipleChoiceItem()
    .setTitle('Email (to send the results of this form for school entry):')
    .setChoiceValues([parent[2]])
    .showOtherOption(true)
    .setRequired(true);
  newForm.addListItem()
      .setTitle('Name of parent on form registration:')
      .setChoiceValues([parent[0]+' '+parent[1]])
      .setRequired(true);
  newForm.addListItem()
      .setTitle('Phone # of parent on form registration:')
      .setChoiceValues([parent[3]])
      .setRequired(true);
  for (var k = 0; k < children.length; k++) {
    newForm.addSectionHeaderItem()
      .setTitle(children[k][0]+' '+children[k][1]);
    newForm.addListItem()
      .setTitle('Child name:')
      .setChoiceValues([children[k][0]+' '+children[k][1]])
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('In the past 14 days, has your child been in close contact with someone diagnosed with Covid-19, or has any health official advised you to quarantine?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Does your child have a fever?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Does your child have chills?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Does your child have shortness of breath or difficulty breathing?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Does your child have a new cough?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Does your child have new loss of taste or smell?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
    newForm.addMultipleChoiceItem()
      .setTitle('Since they were last at school, has your child been diagnosed with Covid-19?')
      .setChoiceValues(['Yes','No'])
      .showOtherOption(false)
      .setRequired(true);
  }
  var sheets = [
    ['School1', 'Key'],
    ['School2', 'Key'],
    ['School3', 'Key'],
    ['School4', 'Key'],
    ['School5', 'Key'],
    ['School6', 'Key'],
    ['School7', 'Key'],
    ['School8', 'Key'],
    ['School9', 'Key']];
  var sheet = [];
  for (var y = 0; y < sheets.length; y++) {
    if (children[0][2] == sheets[y][0]) {
      sheet.push(sheets[y][1]);
    }
  }
  newForm.setDestination(FormApp.DestinationType.SPREADSHEET, sheet[0]);
  newForm.setRequireLogin(false);
  var id = newForm.getId();
  var file = DriveApp.getFileById(id);
  var folder = DriveApp.getFolderById('Key');
  file.moveTo(folder);
  var url = newForm.getPublishedUrl();    
  var body = '<p>'+parent[0]+',<p>'+
             '<p>Below is a link to the attestation form for your children. '+
             'Please complete the form daily before arriving at school. '+
             'You will receive a message after completing the form. '+
             'Please show this message on your device to the teacher in the car-rider line.</p>'+
             '<p>'+url+'</p>'+
             '<p>Thank you.</p>'
             
  MailApp.sendEmail({
    to: parent[2],
    subject: "A link to your COVID-19 Attestation Form",
    htmlBody: body,
    noReply: true
  });
  var ssSheet = SpreadsheetApp.openById('Key').getSheetByName('Form Responses 1');
  var ssData = ssSheet.getRange(1, 1, ssSheet.getLastRow(), ssSheet.getLastColumn()).getValues();
  for (var x = 0; x < ssData.length; x++) {
    if (parent[2] == ssData[x][3]) {
      var add = ssSheet.getRange(x+1, 35, 1, 1);
      add.setValue(url);
    }
  }
}
