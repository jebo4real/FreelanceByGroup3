# FreelanceByGroup3

A freelance website created by Group 3.

The website has been hosted on the following link and contains the latest features for Phase 1
 - https://jebo-freelance.herokuapp.com/

Requirements
1. Node: Download from https://nodejs.org/en/download/
2. Mysql

Instructions
1. Download or clone the repo
2. Make sure Mysql service is running.
3. Run 'npm install' command in the terminal at the root folder to install the dependencies
4. Go to the config folder in the root folder and open the config.json file and 
   change the values in the development object to your mysql settings.
   
5. Locate the sql file (db_freelance) in the root folder and import it into your mysql server
(If you perform this step, skip the steps 5,6 and 7 and move to step 8 to run the app).
                            OR
5. Run 'sequelize db:create' command to create the database if the db does not exist
6. Run the following command in your terminal to migrate the database 'sequelize db:migrate' 
7. Run the following command to seed the database with the necessary records. 'sequelize db:seed:all'
(This step is important because the registration depends on the records that will be seeded).
8. To start the application run the following command. 'npm startdev' OR 'npm start' to 
                    OR
 - Vist the following link to check it out https://jebo-freelance.herokuapp.com
 
    
Sprint 1 / Phase 1
- Registration and user profile.
- Freelancer Portfolio
- Verification: Email Verification
- Messaging

# FreelanceByGroup3
