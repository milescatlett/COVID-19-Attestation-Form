function makeAdmitScreen(e) {
  var name = e.range.getSheet().getName();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  var id = sheet.getSheetId();
  var url = ss.getUrl();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var range = sheet.getRange(lastRow, 1, 1, lastCol);
  var values = range.getValues();
  var rowVals = values[0];
  var len = rowVals.length - 1;
  var timestamp = rowVals[0];
  var email = rowVals[1]+'@godavie.net';
  var emailSheet = ss.getSheetByName('Student Emails');
  var emailVals = emailSheet.getRange(1, 1, emailSheet.getLastRow(), 8).getValues();
  var stuName = [];
  for (var j = 0; j < emailVals.length; j++) {
    if (emailVals[j][0] == email) {
      stuName.push(emailVals[j][6]+', '+emailVals[j][7]);
    }
  }
  var child = [];
  child.push(rowVals[2],rowVals[3],rowVals[4],rowVals[5],rowVals[6],rowVals[7],rowVals[8]);
  var color = [];
  var insideColor = [];
    for (var k = 0; k < child.length; k++) {
      if (child[k] == "Yes") {
        insideColor.push('red'); 
      } 
    }
    if (insideColor[0] != undefined && insideColor[0] == 'red') {
      color.push('style="background-color:red;color:white;font-size:36px;"'); 
    } else { color.push('style="background-color:green;color:white;font-size:36px;"'); }
  var emailLine = ['<p style="font-size:36px;">'+timestamp+'</p>'];
  emailLine.push('<p '+color[0]+'>'+stuName+': '+child+'</p>');
  var subject = 'COVID-19 Attestation Responses for '+timestamp+ '-'+stuName;
  var body = emailLine.join(' ');
             
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
  
  for (var m = 0; m < color.length; m++) {
    if (color[m] == 'style="background-color:red;color:white;font-size:36px;"') {
      var nurseMsg = url+'#gid='+id;
      MailApp.sendEmail({
        to: 'Email',
        //to: 'Email',
        subject: 'Alert: YES COVID response',
        htmlBody: nurseMsg
      });
    }
  }
}

function sendADay1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var emailSheet = ss.getSheetByName('A Day 1');
  var emailVals = emailSheet.getRange(1, 1, emailSheet.getLastRow(), 1).getValues();
  var bcc = emailVals.join(',');
  var subject = 'Your Covid-19 Attestation Link';
  var body = '<p>Please click here to submit your Covid-19 attestation for entry to school today.</p>'+
             '<p>https://docs.google.com/forms/d/e/FormKey/viewform</p>'+
             '<p>You will receive an email shortly with the date, and your name and responses on a green or red background.'+
             'Show the email to gain access to the school building. Staff will still take your temperature.'+
             'If you do not receive an email, you may answer the questions at the door. Please contact the school if you are experiencing'+
             'difficulties with the form.</p><p>Thank you.</p>';
  MailApp.sendEmail({
    bcc: bcc,
    subject: subject,
    htmlBody: body,
    noReply: true
  });
}
function sendADay2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var emailSheet = ss.getSheetByName('A Day 2');
  var emailVals = emailSheet.getRange(1, 1, emailSheet.getLastRow(), 1).getValues();
  var bcc = emailVals.join(',');
  var subject = 'Your Covid-19 Attestation Link';
  var body = '<p>Please click here to submit your Covid-19 attestation for entry to school today.</p>'+
             '<p>https://docs.google.com/forms/d/e/FormKey/viewform</p>'+
             '<p>You will receive an email shortly with the date, and your name and responses on a green or red background.'+
             'Show the email to gain access to the school building. Staff will still take your temperature.'+
             'If you do not receive an email, you may answer the questions at the door. Please contact the school if you are experiencing'+
             'difficulties with the form.</p><p>Thank you.</p>';
  MailApp.sendEmail({
    bcc: bcc,
    subject: subject,
    htmlBody: body,
    noReply: true
  });
}
function sendBDay1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var emailSheet = ss.getSheetByName('B Day 1');
  var emailVals = emailSheet.getRange(1, 1, emailSheet.getLastRow(), 1).getValues();
  var bcc = emailVals.join(',');
  var subject = 'Your Covid-19 Attestation Link';
  var body = '<p>Please click here to submit your Covid-19 attestation for entry to school today.</p>'+
             '<p>https://docs.google.com/forms/d/e/FormKey/viewform</p>'+
             '<p>You will receive an email shortly with the date, and your name and responses on a green or red background.'+
             'Show the email to gain access to the school building. Staff will still take your temperature.'+
             'If you do not receive an email, you may answer the questions at the door. Please contact the school if you are experiencing'+
             'difficulties with the form.</p><p>Thank you.</p>';
  MailApp.sendEmail({
    bcc: bcc,
    subject: subject,
    htmlBody: body,
    noReply: true
  });
}
function sendBDay2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var emailSheet = ss.getSheetByName('B Day 2');
  var emailVals = emailSheet.getRange(1, 1, emailSheet.getLastRow(), 1).getValues();
  var bcc = emailVals.join(',');
  var subject = 'Your Covid-19 Attestation Link';
  var body = '<p>Please click here to submit your Covid-19 attestation for entry to school today.</p>'+
             '<p>https://docs.google.com/forms/d/e/FormKey/viewform</p>'+
             '<p>You will receive an email shortly with the date, and your name and responses on a green or red background.'+
             'Show the email to gain access to the school building. Staff will still take your temperature.'+
             'If you do not receive an email, you may answer the questions at the door. Please contact the school if you are experiencing'+
             'difficulties with the form.</p><p>Thank you.</p>';
  MailApp.sendEmail({
    bcc: bcc,
    subject: subject,
    htmlBody: body,
    noReply: true
  });
}
