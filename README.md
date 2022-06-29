# Interactive-Form
 Interactive form for a conference

## Features
### Real-time error messages
The form supports real-time error messages displayed to users. Each required input field was given two event listeners: one for `submit`, preventing users from submitting the form without all required fields, and one for `blur`, to notify users that a field input is incorrect before they try to submit the form.

### Conditional error message 
The form supports a conditional error message for the email address field. If a user doesn't enter their email, or they format it incorrectly, the form will display a useful error message based on the input.

### Accessibility features
Error messages are displayed with accessibility in mind by providing the user with red display warnings, error messages, and warning icons. 