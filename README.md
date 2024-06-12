# Birthday Email Automation Script 🎂📧

## Overview
Birthday Email Sender is a Google Apps Script that automatically sends personalized birthday greetings via email. The script retrieves recipient details from a Google Spreadsheet and sends a custom HTML email on their birthday. This project helps ensure no birthday is missed, offering a delightful way to connect with people on their special day.

## Features
- **Automated Emails**: Automatically sends birthday emails to recipients.
- **Personalized Content**: Uses recipient data to personalize each email.
- **HTML Template**: Includes an HTML template for the email body that can be customized.
- **Tracking**: Updates the Google Spreadsheet to indicate which emails have been sent.
- **Scheduled Execution**: Can be set up to run daily.

## Setup

### Prerequisites
- Google Account
- Google Sheets
- Google Apps Script (access via Google Drive)

### Instructions

1. **Create a Google Spreadsheet**:
    - Create a new Google Spreadsheet.
    - Add the following headers in the first row: `First Name`, `Last Name`, `Email`, `Birthday`, `Email Sent`.

2. **Populate the Spreadsheet**:
    - Enter the details for each recipient in the corresponding columns. 
    - The `Birthday` column should be in `MM/DD/YYYY` format.
    - Leave the `Email Sent` column empty initially.

3. **Access Google Apps Script**:
    - Open the spreadsheet.
    - Click on `Extensions` -> `Apps Script`.

4. **Create the HTML Template**:
    - Click on `+` -> `HTML` to create a new HTML file named `email.html`.
    - Paste the following code into `email.html`:

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
      </head>
      <body>
        <p>Dear <?= firstName ?> <?= lastName ?>,</p>
        <p>It's your special day, and we couldn't let it pass without sending our best wishes your way!</p>
        <p>Many More Happy returns of the day!</p>
        <p>We hope you have a wonderful day filled with joy and celebration.</p>
        <p>Best regards,<br>Avk</p>
        <p>P.S. "Count your life by smiles, not tears. Count your age by friends, not years." – John Lennon</p>
      </body>
    </html>
    ```

5. **Add the Script**:
    - Click on `+` -> `Script` to create a new script file.
    - Name the file `Code.gs`.
    - Paste the following code into `Code.gs`:

    ```javascript
    function sendEmail() {
      //accessing the html file
      var template = HtmlService.createTemplateFromFile("email");

      //accessing the spreadsheet: active sheet
      var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data  = ws.getRange("A2:E" + ws.getLastRow()).getValues();
   
      //accessing today's date
      var today = new Date();
      var todayMonth = today.getMonth() + 1; 
      var todayDate = today.getDate();

      data.forEach(function(row, idx) {
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
    ```

6. **Test the Script**:
    - Save the script.
    - Click on the `Run` button to test the script.
    - Check the log for any errors and ensure emails are sent correctly.

7. **Set Up Daily Trigger**:
    - Click on the clock icon in the toolbar to open the `Triggers` page.
    - Click `Add Trigger`.
    - Select `sendEmail` function to run, choose `Time-driven` trigger, and set it to run `Daily`.


## Contributions
Contributions are welcome! Please feel free to fork this repository and submit a pull request with your improvements.

---

By following these steps, you will have a fully functional Birthday Email Sender up and running. Happy coding!
