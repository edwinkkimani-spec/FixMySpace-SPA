FIXMYSPACE:



# FixMySpace

*A Campus Issue Reporting and Tracking System*

## About the Project

FixMySpace is a web application designed to help students and staff report campus problems and track their resolution. It provides a central place to report issues such as broken classroom equipment, leaking taps, damaged desks and faulty lights.

The goal is to make campus maintenance reporting easier, more organised and transparent.

## Features

**Dashboard:** Displays the total number of reports and counts for unresolved, in-progress and resolved issues.
**Report an Issue:** Allows users to submit a report with a title, location, category and description.
**Campus Reports:** Displays submitted reports in an organised list.
**Status Tracking:** Allows report statuses to be updated.
**Search:** Helps users find reports by title, location or category.
**API Integration:** Uses JavaScript Fetch API to retrieve and submit data.
 **Error Handling:** Displays messages when an operation fails or required fields are missing.

## Technologies Used

HTML5
CSS3
JavaScript
Firebase Firestore (planned database integration)

## Project Structure

```text
fixmyspace/
├── index.html
├── index.js
├── style/
│   └── style.css
└── README.md
```

## Getting Started

### Prerequisites

A modern web browser
Visual Studio Code or another code editor
Live Server or a local web server

### Installation

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using Live Server.
4. Use the report form to submit a campus issue.
5. Explore the dashboard, search and status-tracking features.

## API and Database

FixMySpace is being developed to use Firebase Firestore to store and retrieve campus reports.

The planned integration will support:

- **GET-style reads:** Retrieve reports stored in Firestore.
- **POST-style writes:** Submit new reports to the database.
- **Persistent storage:** Keep reports available after the page is refreshed.
- **Dashboard updates:** Calculate report totals and status counts from the retrieved records.

Firebase Firestore uses its own JavaScript SDK rather than requiring traditional REST GET and POST requests. If the project requirements specifically require HTTP GET and POST requests, a REST API or custom backend may be needed.

Until persistent database integration is complete, reports stored only in the JavaScript array will be lost when the page is refreshed. JSONPlaceholder may be used for testing API requests, but it does not permanently store submitted posts.

## Future Improvements

- User authentication for students and staff
- Secure database access and role-based permissions
- Report image uploads
- Priority levels for urgent issues
- Notifications when report statuses change
- Duplicate-report detection
- Administrative dashboard and analytics

## Project Goal

FixMySpace aims to improve communication between campus users and maintenance teams by making campus issues easier to report, track and resolve.

## Author

**Edwin Kimani**

FixMySpace — Report it. Track it. Resolve it.
