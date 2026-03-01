// =============================================
// GOOGLE APPS SCRIPT — Hiring Form to Google Sheets
// =============================================
//
// SETUP INSTRUCTIONS:
// 1. Create a NEW Google Sheet (separate from the client inquiry sheet)
// 2. Name the columns in Row 1:
//    Timestamp | Name | Email | Phone | Role | Portfolio | Instagram | Message
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste THIS entire file
// 5. Click Deploy > New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy and authorize when prompted
// 7. Copy the Web App URL
// 8. Paste it into index.html where it says GOOGLE_SHEET_HIRING_URL = ''
//
// That's it! Job applications will now appear in your Google Sheet.
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
      data.role || '',
      data.portfolio || '',
      data.instagram || '',
      data.message || ''
    ]);

    // Optional: Send email notification for new application
    // Uncomment the lines below and replace with your email
    /*
    MailApp.sendEmail({
      to: 'your-email@gmail.com',
      subject: 'New Job Application — ' + (data.role || 'Unknown Role') + ' — ' + (data.name || 'Unknown'),
      body: 'New job application received!\n\n' +
            'Name: ' + data.name + '\n' +
            'Email: ' + data.email + '\n' +
            'Phone: ' + data.phone + '\n' +
            'Role: ' + data.role + '\n' +
            'Portfolio: ' + data.portfolio + '\n' +
            'Instagram: ' + data.instagram + '\n' +
            'Why Xcelerate: ' + data.message + '\n'
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
    .createTextOutput('Xcelerate Media hiring form backend is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
