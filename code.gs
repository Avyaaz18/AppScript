function sendEmail() {
  //accessing the html file
  var template = HtmlService.createTemplateFromFile("email");

  //accessing the spreadsheet: active sheet
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var data  = ws.getRange("A2:G" + ws.getLastRow()).getValues();
   
  //accessing the today's date
  var today = new Date();
  var todayMonth = today.getMonth() + 1; 
  var todayDate = today.getDate();

  data.forEach(function(row,idx){
    //accessing the b'day date cell for respective rows
    var birthday = new Date(row[3]);
    var birthdayMonth = birthday.getMonth() + 1;
    var birthdayDate = birthday.getDate();
    var emailSent = row[4];
          
    if (birthdayMonth === todayMonth && birthdayDate === todayDate && emailSent !== true) {
      var firstName = row[0];
      var lastName = row[1];
      var email = row[2];

      var emailSubject = "Happy Birthday " + firstName + "!";
      template.firstName = firstName;
      template.lastName = lastName;
      var emailBody = template.evaluate().getContent();
      //sending the mail
      GmailApp.sendEmail(email, emailSubject, "", {name: "Email App", htmlBody: emailBody });
      // Mark the email as sent
      ws.getRange(idx + 2, 5).setValue(true); 
       Logger.log('Email sent to: ' + email);
    }

  });
  Logger.log('Birthday reminder script executed successfully.');
}