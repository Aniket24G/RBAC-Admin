# **_ROLE BASED ACCESS CONTROL_** #

## Overview
 *This project is an Admin Dashboard that implements Role-based Access Control (RBAC) for managing users, roles, and permissions. It allows admins to:*

 - Add, edit, and delete users.
- Assign roles and permissions to users.
- View a user management dashboard with pagination and filtering.
- Handle login/logout and manage authentication using localStorage.
## Key Features:
- User Management: View, add, edit, and delete users.
 - Role Management: Manage roles for users with different permissions.
- Permission Management: Assign and modify permissions for roles.
- Pagination: Table data is paginated for better usability when managing large datasets.
- Authorization: Only admin users can access the admin-related pages (User Management, Role Management, etc.).
## Tech Stack
- Frontend: React, React Router, Tailwind CSS
- State Management: Context API (AuthContext)
- LocalStorage: For managing user authentication and role-based data storage
- UI Components: Reusable modal, table, and pagination components
Prerequisites
Node.js and npm/yarn installed.

## Setup
1. Clone the repository - 
    ```
    git clone https://github.com/Aniket24G/RBAC-Admin.git

    cd Frontend
    ```
2. Install dependencies  
    ``` 
    npm install
    ```
3. Start the development server  
    ```
    npm run dev
    ```
4. Sample data in localStorage 
    - Admin user: { username: "admin1", password: "admin123" }
    - Regular user" { username: "user1",
    password:"user123" }
5. Login
    - Use above details to login to the application
    - upon logging in the system will detect the role and grant the premissions accordingly
    