Zeraki Dashboard
Overview
The Zeraki Dashboard is a comprehensive web application that provides detailed metrics and analytics for managing schools. It features real-time data visualization through charts, a modular card-based layout for key metrics, and detailed school-specific data management capabilities.

Features
Dashboard Metrics: Overview of collections, sign-ups, total revenue, and bounced cheques.
Charts: Visualize target achievements and sign-up distributions using Pie and Bar charts.
Invoices Management: View, add, edit, and delete invoices for schools.
Collections Management: Manage collections linked to invoices, including adding new collections and updating their status.
School Details: Detailed view of individual school data, including invoices and collections.
Technologies Used
React: Frontend library for building user interfaces.
Material-UI: UI framework for React components and styling.
Axios: Promise-based HTTP client for making API requests.
Chart.js: Library for creating interactive charts.
React Router: Library for routing in React applications.

Getting Started

Prerequisites
Node.js and npm installed on your local machine.
Backend server running at http://localhost:3001
Installation
Clone the Repository

git clone https://github.com/yourusername/zeraki-dashboard.git
cd zeraki-dashboard
Install Dependencies


npm install
Start the Application

npm start
The application will run on http://localhost:3000.

endpoints

home: http://localhost:3000/
dashboard: http://localhost:3000/dashboard
school data: http://localhost:3000/schools
school details: http://localhost:3000/schools/:id

Detailed School Information
Access detailed information about individual schools, including a list of invoices and collections. Use the navigation links to explore specific school details.


General Design
Consistency
Color Scheme: A consistent color palette (dark blue-gray, white, light gray) creates a professional and cohesive look.
Typography: Uniform font styles and sizes ensure readability and a clean aesthetic.
Spacing: Consistent padding and margins maintain a balanced and uncluttered layout.
Usability
Hover Effects: Visual feedback on interactive elements improves user experience.
Fixed Elements: Fixed sidebar and bottom links provide constant navigation access, enhancing usability.
Visual Hierarchy
Font Sizes and Weights: Differentiated font sizes and weights create a clear visual hierarchy, guiding the user's focus to key information.
Responsiveness
Flexbox Layouts: Use of flexbox ensures that the layout adapts well to different screen sizes and devices, providing a responsive user experience.
