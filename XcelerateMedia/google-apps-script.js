// =============================================
// GOOGLE APPS SCRIPT — Form to Google Sheets
// =============================================
//
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Name the columns in Row 1:
//    Timestamp | Name | Email | Phone | Company | Service | Budget | Instagram | Message
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste THIS entire file
// 5. Click Deploy > New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy and authorize when prompted
// 7. Copy the Web App URL
// 8. Paste it into index.html where it says GOOGLE_SHEET_URL = ''
//
// That's it! Form submissions will now appear in your Google Sheet.
// You can download the sheet as .xlsx (Excel) anytime from File > Download.
// =============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.service || '',
      data.budget || '',
      data.instagram || '',
      data.message || ''
    ]);

    // Optional: Send email notification for new inquiry
    // Uncomment the lines below and replace with your email
    /*
    MailApp.sendEmail({
      to: 'your-email@gmail.com',
      subject: 'New Xcelerate Media Inquiry from ' + (data.name || 'Unknown'),
      body: 'New inquiry received!\n\n' +
            'Name: ' + data.name + '\n' +
            'Email: ' + data.email + '\n' +
            'Phone: ' + data.phone + '\n' +
            'Company: ' + data.company + '\n' +
            'Service: ' + data.service + '\n' +
            'Budget: ' + data.budget + '\n' +
            'Instagram: ' + data.instagram + '\n' +
            'Message: ' + data.message + '\n'
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Xcelerate Media form backend is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
