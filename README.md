# Secure Web Development: School Clinic Management System

## Project Overview
This project is about a school clinic management system that allows students to register, log in, view their profiles and submit complaints. The main goal is to add security features so that users information will be protected and well handled.

## Features 
- User registration
- Login system
- Profile management
- Complaint submission

## Security Objectives
- Password hashing with the use of bcrypt
- Input validation in the login page 
- Token-based authentication with the use of JSON Web Tokens
- Rate Limiting to prevent DOS and brute force attacks
- Password length validation

## Project Structure
- 'index.js' - the backend code
- 'clinic' - after opening clinic, open 'clinic-frontend', then 'src' to see everything about the frontend, then 'components' to see all the main frontend files.
- 'hospital' - please ignore this, the owner of the original repository said it is not relevant
- 'src' - this contains the CSS files
- 'public' - contains html file

## Setup and Installation
1. Clone this repository
git clone https://github.com/Tobe12345678/secureweb.git

2. Navigate to the project directory on your terminal:
cd your-project-directory

3. Install dependencies on your terminal:
npm install

4. Set up a PostgreSQL database:
- Create a database and name it, let's say 'clinic_database'.
- update the database credentials in 'index.js'.

5. Start the server:
npm start

## Usage 
1. **Registration**: a user will create an account in the registration page
2. **Login**: Log in using email and password
3. **Profile page**: after you log in, you will see your progile details
4. **Submit Complaints**: use the complaints form to submit medical issues

## Security Improvement
- **Password Hashing**: Ensures that passwords are hashed before they are stored in the postgreSQL database
- **Rate Limiting**: helps protect against denial-of-service attacks and brute force attacks
- **Input validation**: this prevents malicious input from being processed
- **Token-Based authentication**: to ensure that only authorized users can access resources
- **Password length validation**: ensures password must be at least 8 characters long

## Testing
- **Testing Tools**: Bearer CLI tool was used for testing
- **Testing Results**: 87 checks, 39 findings                                      
                        CRITICAL: 1 (CWE-798)
                        HIGH: 4 (CWE-134)
                        MEDIUM: 4 (CWE-532, CWE-693)
                        LOW: 30 (CWE-532)

## Contributions and References
- Original application: https://github.com/Salamat200/salamatt.git
- Libraries and frameworks used:
  - Node.js
  - PostgreSQL
  - Express.js
  - Bcrypt
  - JSON Web Tokens
- Security testing tool: Bearer CLI
