# Introduction - how to read this doc

- This exercise is designed to test basic skills in 3 core areas:

1. [SQL databases](#1-database)
2. [React SPA development](#2-react-spa)
3. [Backend API development on Node](#3-backend-api-development-on-node)

- for each section you'll find that it has **problem**, **task**, **solution** sections:

- **problem** :
  - explains the core problem we're trying to solve, and maybe some context

- **task** :
  - gives a list of tasks that MUST be accomplished by you
  - also tells you what are the must-have features in your solution
  - tasks marked with [<ins>**extra**</ins>] are not necessary, consider them as bonus problems

- **techstack instructions**:
  - subsection under task, this tells you what techstack you're expected to use

> [!IMPORTANT]
> please stick to the techstack mentioned; it's a very basic project and does not require an arsenal of libraries, so do not use any other libraries, frameworks, etc.. unless explicitly mentioned

  - however you can use simple libraries that are not mentioned, granted they don't significantly alter the task or do the work for you and that you document the decision-making properly as explained below

- **solution** :
  - once you're done solving the exercise or a part of it, you **MUST** document your solution in this section under the appropriate part of the exercise you solved, so the for the database problem you should edit the solution section under [database](#1-database) only

  - the idea is to document mainly 2 things:

    - key problem solving points: that provide a high level overview of how you solved that problem
      - eg: for the DB problem, what tables you created / altered, how does that accomplish the tasks (if it's not obvious)
    - instructions: you must include all instructions (including code) that will allow us to run and review your solution

## 0. Setup

- fork this repository, you'll be committing all your changes to the forked repo
- clone the fork locally to develop

```bash
git clone https://github.com/<username>/full_stack_assessment_skeleton.git
```

> [!NOTE]
> throughout the readme, we'll be working from within the root directory (full_stack_assessment_skeleton/) of the repo, unless otherwise stated

- use docker to spin up **MySql** db container
- this db instance has some data that will be needed for the exercise, included in it

```bash
docker-compose -f docker-compose.initial.yml up --build -d
```

- the containerized db listens on `localhost:3306`
- the docker compose file has the credentials you will need

> [!WARNING]
> do not change credentials, db name and any configuration, this just adds unnecessary complexity

> [!TIP]
> [mysql docker image docs](https://hub.docker.com/_/mysql)

![mysql creds](images/mysql_creds.png)

- the database is `home_db`, user `db_user` has full read-write access to it
- `home_db.user_home` table has some data populated in it

## 1. Database

<details>
<summary>preview of data in `home_db.user_home` table</summary>

| **username** | **email**          | **street_address**       | **state**     | **zip** | **sqft** | **beds** | **baths** | **list_price** |
|--------------|--------------------|--------------------------|---------------|---------|----------|----------|-----------|----------------|
| user7        | user7@example.org  | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user7        | user7@example.org  | 75246 Cumberland Street  | Arizona       | 08229   | 2278.71  | 2        | 1         | 182092.0       |
| user10       | user10@example.org | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user3        | user3@example.org  | 811 Walker-Bogan Terrace | Rhode Island  | 19219   | 3648.42  | 1        | 2         | 964995.0       |
| user3        | user3@example.org  | 947 Allen Motorway       | Massachusetts | 65353   | 1375.37  | 3        | 3         | 578532.0       |
| user10       | user10@example.org | 7976 W Division Street   | New Mexico    | 99460   | 2510.57  | 1        | 3         | 842529.0       |
| user6        | user6@example.org  | 4679 Horacio Plains      | Texas         | 62631   | 1679.69  | 6        | 3         | 303195.0       |
| user2        | user2@example.org  | 78089 Prospect Avenue    | Nebraska      | 95406   | 4718.9   | 1        | 2         | 358752.0       |
| user2        | user2@example.org  | 5788 Mallie Gateway      | Nebraska      | 37697   | 2236.85  | 3        | 2         | 632165.0       |
| user6        | user6@example.org  | 975 Marty Ridges         | New Jersey    | 28721   | 1310.08  | 6        | 3         | 467656.0       |

</details>

### problem

- as you can see we have data relating users and homes
  - each user is identified by its username, i.e., if two rows have the same username, they're talking about the same user
  - similarly each home is identified by its street_address

- this data relates users on our website and which homes they are interested in

- upon basic inspection you can observe the following:
  - one user may be related to multiple homes
  - also the same home may be related to multiple users

- we gave this data to an [**intern**](https://www.urbandictionary.com/define.php?term=intern), who just threw it into the database, and now it's come to you!

- the intern did not know about relational databases and data normalization, but we expect you do

### task

- refactor the data into a _reasonably_ normalized set of tables
- ensure that the relationship between tables is represented properly using foreign keys -> primary keys  references (as they are usually in relational DBs)
  - you'll need to create _atleast_ 2 tables:

    - `user` : to store `user` attributes: `username`, `email`
    - `home` : to store `home` attributes: all attributes in `user_home` table except for the above `user` attributes

  - you _may_ need to create more tables, alter existing tables to solve the exercise
  - please try to use the names "user" and "home" for "user" and "home" tables, so it's easier for us to understand

- create a **SQL script** `99_final_db_dump.sql` containing all the changes made by you to the DB
- put it inside the `sql` directory under the root directory

- make sure that:
  - the SQL script you have created, takes the DB from its initial state (as it was when you started the docker container for the first time) to the "solved" state, when it's executed

- **techstack instructions**

  - you can use whatever GUI / CLI you want, to interact with database
  - but all the changes you make should be using SQL / MySQL dialect of SQL and should be in the SQL script that you provide
  - so you must **NOT** use Entity first development, where you write your ORM entities and generate SQL migration scripts
  - instead you directly write SQL script, that makes all the changes you want to the DB

### solution
below are steps i've documented to get things started step-by-step. if you only care about testing, head over to [test-database](#test-database)
1. start by spinning up a MySQL db container by docker

```
docker-compose -f docker-compose.initial.yml up --build -d
```

2. go to MySQL workbench and create a new connection with the credentials given in the dockerfile. 
username: 
```
db_user
```
password: 
```
6equj5_db_user
```
3. creating the `99_final_db_dump.sql` 

##### 99_final_db_dump.sql

the solution involves creating a normalized database structure and migrating data from the original table. here's a high-level overview:

1. create separate tables:
   - user table: stores user information (userId, username, email)
   - home table: stores home details (homeId, street_address, state, zip, sqft, beds, baths, list_price)
   - user_home_link: junction table to represent many-to-many relationship between users and homes

2. set up relationships:
   - use foreign keys in user_home_link to reference user and home tables
   - establish a composite primary key in user_home_link for uniqueness

3. migrate data:
   - transfer user data from user_home to user table
   - transfer home data from user_home to home table
   - populate user_home_link with relationships from user_home

4. clean up:
   - drop the original user_home table

5. create sql script:
   - write all necessary sql commands in 99_final_db_dump.sql
   - ensure script transforms database from initial state to solved state

6. verify solution:
   - restart docker container with new configuration
   - connect to database and confirm presence of new tables
   - check data integrity and relationships

this approach normalizes the data, improves data integrity, and establishes proper relationships between users and homes.

#### test database
    
- stop the already running db container:  
```
docker-compose -f docker-compose.initial.yml down
```

- delete the volumes associated with the mysql container (if any):
    
```
docker volume rm full_stack_assessment_skeleton_mysql_vol
```
    
- fire up the new one: 
 ```
docker-compose -f docker-compose.final.yml up --build -d
```
- you may have to stop the MySQL service running if it's already running in the background because MySQL also runs on the same port. Head over to Services, if you're on a windows, and just stop the service and try the above command again. If you're on a mac, it's
```
brew services stop mysql
```
and on linux, 
```
sudo systemctl stop mysql
```
Once you've stopped the MySQL service, try running the docker-compose command again.


- check running containers by 
```
docker ps
```
and if the container stops, run it again: 
```
docker start mysql_ctn_final
```

- once started, head over to MySQL workbench and add credentials: 
username: ```db_user```, password: ```6equj5_db_user```
- you should be able to see the following tables:

   ![home table](https://github.com/user-attachments/assets/73a3c84e-58ef-4d51-95a0-212d4e60bbe3)
   ![user table](https://github.com/user-attachments/assets/6f625939-98d2-4b4d-9eb8-19c898ff91d5)
   ![user_home_link](https://github.com/user-attachments/assets/c0323811-fa6b-4e30-b72f-34a60f769bd1)


## 2. React SPA

- this is a simple SPA, the idea is to show case your state management and some frontend-dev skills

### the problem

- we want to see:
  - for each user what homes they are interested in
  - for each home we also want a way to see what different users are interested in it
- also we want to change / update the users that are associated with a given home

### task

- **homes for user page**
  - create a page to show all homes related to a particular user
  - there should be a single-select dropdown at top, to pick the user for whom we want to view the related homes
  - and below that the related homes should populate in cards

  - [watch the video demo for reference](https://drive.google.com/file/d/1D9Jzzuw38cgL-PVYF8YDE1FEBHcjBpig/view?usp=sharing)

  - make sure that:
    - page is responsive as shown
    - we don't expect any fancy UI, barebones is just fine, but it should be functional
  
- **edit user functionality**

  - each home card has an `Edit User` button attached, this should show a modal on click, this is the `Edit User Modal`:

  - initially all users related to the home should be checked
  - we can edit the related users by toggling the checkboxes
  - if we click `Cancel` then modal should just close without any effect
  - however if we edit the users, and then click `Save`:

    - the users related to that home must be updated in the DB
    - the modal should close and the changes should reflect on the `homes for user page`
    - so for eg: if we had picked `user1` on `homes for user page` then clicked on `Edit User` for any home there and **unchecked** `user1` in the modal and saved, then upon closing of the modal, the home we clicked on previously, should NO longer be visible for `user1`, but should be visible for any other user for whom the checkbox was checked on `Save`
  
  ![edit user modal](images/edit_user_modal.png)

  - make sure:

    - UI is not buggy
    - checkboxes are controlled
    - there is atleast 1 user related to a home

      - if the modal has no users selected, it should show an error and disable `Save` button

- **handle data-fetching properly**

  - to create the above components / pages, you'll fetch data from [backend APIs](#3-backend-api-development-on-node)

  - make sure you're handling data-fetching properly by _preferrably_ using a data-fetching-library:
    - show a loading spinner/skeleton while an API request is progress
    - gracefully handle errors if the API calls error out
    - [<ins>**extra**</ins>] cache API responses, to improve performance 

  - as discussed below it's preferred to use a data fetching library to handle these problems properly

- **techstack instructions**
  - JS frameworks:

    - [Vite (recommended)](https://vitejs.dev/guide/) or [Create React App](https://github.com/facebook/create-react-app)
    - use no other framework, libraries

  - CSS:

    - vanilla CSS or [Tailwind CSS](https://tailwindcss.com/docs/installation)
    - use no other css frameworks, component libs, etc..

  - State Management
    - use [Redux Toolkit](https://redux-toolkit.js.org/) where appropriate for state-management

  - Data Fetching
    - **preferred approach** is to use one of the following data-fetching libraries:
      - [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query)
      - [TanStack Query](https://tanstack.com/query/latest)

    - otherwise, you can use some other data-fetching library, just make sure to document that in README
    - as a last resort, `useEffect()` maybe used, but make sure you're handling data-fetching properly (loading, errors, etc..)

    - for skeletons / spinners - you can use a simple library:
      - eg: [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
      - remember to keep it simple and readable

> [!IMPORTANT]
> even if you can do state-management without Redux, you still must use Redux for the solution, (remember the idea is to showcase the skills)

### solution
below are steps i've documented to get things started step-by-step. if you only care about testing, head over to [test-frontend](#test-frontend)

1. setup:
   - create vite project: ```npm create vite@latest```,name it frontend, choose typescript. 
   - install dependencies: ```cd frontend && npm install```
   - add tailwindcss: ```npm install -D tailwindcss postcss autoprefixer```
   - initialize tailwind: ```npx tailwindcss init -p```

2. redux toolkit and rtk query setup:
   - install: ```npm install @reduxjs/toolkit react-redux```
   - create an api slice `api.ts` - this manages data fetching and api calling using RTK query
   - created user slice `userSlice.ts` that has reducer functions to toggle users and set selected users (in the EditUserModal)
   - created a ```store.ts``` file that adds the api slice and user slice to the redux store. in ```main.tsx```, wrapped the app in the redux provider.
   - also added ```hooks/index.ts``` for typescript and redux types. 
   - define endpoints like getUsers, getHomesByUser, getUsersByHome and updateUsers for user and home data management.

3. components:
   - create the main app component rendering the user selection dropdown and home cards for the selected user. it manages the state for the selected user and controls the opening and closing of the modal.
   - !!! [**extra**] also implemented pagination for homes list
   - create the EditUserModal component that handles modifying the associations between users and homes via checkboxes in a modal.
   - dispatched redux actions to handle selecting/unselecting users and saves the changes to the backend (mutation).

4. data fetching and state management:
   - use rtk query hooks (that redux automatically provides you after writing endpoints) to fetch user and home data from the API (in backend)
   - handle loading states with skeleton loaders (```npm install react-loading-skeleton```)
   - manage local state with useState for modal and selections

5. ui implementation:
   - use tailwindcss for styling
   - create responsive grid layout for home cards
   - 100% responsive by using sm, md, lg, xl breakpoints
   - also added persistence for the selected user in local storage using useEffect

6. error handling and validation:
   - display error messages for failed api calls (eg. if none is the selectedUser)
   - validate user selections in the EditUserModal so that it disables the save button if no user is selected for a home.

#### test frontend
- note that there's an env variable in the frontend directory.
 ```VITE_API_BASE_URL=http://localhost:3000/```

- cd inside frontend in another terminal:
```
cd frontend
```
- install necessary packages:
```
npm install
```
- start the deployment server and see the app running on ```localhost:5173``` (it might say error loading users as you haven't setup the backend yet)
 ```
 npm run dev
 ```

## 3. Backend API development on Node

### problem

- we want the web app to interact with the [DB](#1-database)

### task

- create **REST APIs**, we'll need the following APIs:

  - **/user/find-all**
    - should return all users from DB

  - **/home/find-by-user**
    - should return all homes related to a user
    - this is consumed in UI to show home cards

  - **/user/find-by-home**
    - should return all users related to a home
    - this is consumed in UI, in the `Edit Users` modal

  - **/home/update-users**
    - this API should take in the new bunch of users (from the modal after `Save`) and the home for which the `Edit Users` button was clicked
    - this API should mutate the DB, to reflect the new set of users related to the home

  - make sure:

    - you use suitable HTTP methods for the REST APIs
    - should only use JSON as the interface
    - if possible, sanitize the data sent in the request
    - the `/home/update-users` API is idempotent
  
- **[<ins>extra</ins>] add pagination**

  - for `/home/find-by-user` API add pagination support:

    - page size should be 50
    - add _very_ basic pagination UI to `homes for user page` in [frontend](#2-react-spa)

- **techstack instructions**

  - Backend node frameworks:

    - [NestJS (recommended, if you know it)](https://docs.nestjs.com/) or [Express](https://expressjs.com/en/starter/installing.html)
    - use no other frameworks

  - Interacting with DB:

    - use one of these ORMs, this the **preferred approach**:
      - [TypeORM (recommended)](https://typeorm.io/)
      - [Prisma](https://www.prisma.io/docs/getting-started)
      - [Sequelize](https://sequelize.org/docs/v6/getting-started/)

    - otherwise, you can use [Knex query builder](https://knexjs.org/guide/)

    - we do NOT want raw SQL, if none of above works, you can use any ORM you know, but please mention and link to it in the README

### solution
below are steps i've documented to get things started step-by-step. if you only care about testing, head over to [test-backend](#test-backend)

1. node + express + ts + prisma setup:
    - use commands -  ```npm init -y```, ```npm install -D typescript ts-node nodemon```, ```npm i express dotenv```, ```npm i -D @types/express @types/dotenv``` and modify tsconfig.json to your preferences and create nodemon.json to always watch for updates
    - add a script in package.json to run the server - ```"start": "nodemon"```
    - add a ```PORT=3000``` env variable in the .env file
    - use commands - ```npm install prisma --save-dev``` ```npx prisma init```
    - add ```DATABASE_URL="mysql://db_user:6equj5_db_user@localhost:3306/home_db"``` in .env file
    - generated a prisma schema file in `schema.prisma` by making similar model structure to the one in the DB. 
    - ensure permissions are given or this will give an error. do this by logging in as a root user(user: `root`, password: `6equj5_root`) in MySQL workbench and run the below script:
    ```GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'db_user'@'%';```
    ```FLUSH PRIVILEGES;```
    - do a ```npx prisma db pull``` to pull the schema from the DB and generate the prisma client using ```npx prisma generate``` after installing the prisma client ```npm i @prisma/client```
    - create a singleton file `prisma.ts` in the utils directory to make sure that the prisma client is only initialized once and shared across the application.

2. routing
    - create an organized structure where you have separate routes for `/user` and `/home` and in a routes folder, add individual get and/or put routes for each of the endpoints. these go into controllers and each controller `userController.ts` and `homeController.ts` perform the necessary operations on the DB.
    - `userController.ts` has 2 main functions.`getAllUsers` and `getUsersByHome`. one is to get all users and the other is to get all users for a chosen home. the first one is a simple query to the DB and the second one is applied on the EditUserModal where for each home, (extract the homeId as a query param to the API), you get the all the users which have a relationship with that home by checking if that homeId is present in the user_home_link junction table.
    - the `homeController.ts` has 2 main functions. `getHomesByUser` and `updateUsers`. one is to get all homes related to a user and the other is to update the users based on the new associations. the first one is a simple query to the DB, where you return all homes and the paginatedHomes by taking only the first 50 records. (as given in the problem). the second one is to update the users based on the new associations by starting a transaction and first deleting the existing associations (unchecking the checkboxes) and then inserting the new ones. so you perform createMany and deleteMany operations on the user_home_link junction table.

#### test backend
- note that the .env variable is available and it has: 
```
PORT=3000
DATABASE_URL="mysql://db_user:6equj5_db_user@localhost:3306/home_db"
```
- go inside the backend directory in another terminal:
```
cd backend
```

- start the server by running the command - 
```
npm run start
```

## Submission Guidelines

- once you're done with [DB](#1-database), [frontend](#2-react-spa), [backend](#3-backend-api-development-on-node) it's time to submit your solution :smiley:

### README

- this is the most important part of the submission, without a proper README no submission will be considered

- you must edit this README file in your fork of the repo, and for each problem section, document your solution properly in its **solution** section

### frontend & backend

- all frontend / backend code should go entirely in the `./frontend` / `./backend` directories
- we are fine with testing your solution in either `dev` or `production` mode, just make sure the instructions are properly documented

> [!CAUTION]
> make sure to **commit the .env files** for both backend & frontend, if they are needed to run your solutions

### database

> [!CAUTION]
> The database changes you make while developing the solution, by default will not be visible to us or committed in the repo, so make sure to read and understand this section carefully!

- the database is inside a container, and all it's data (the tables you added, altered, etc..) are only saved inside a docker volume that's on your local system, invisible to us

- to make sure we can run your solution, you have to provide your **SQL script** to us
- write all the DB changes to `99_final_db_dump.sql` in `sql` directory under root folder of repo
- this script should take the DB from its initial state to the solved state

- you can test that easily by following below steps:

- first stop the already running db container, else there will be conflicts!

```bash
docker-compose -f docker-compose.initial.yml down
```

- now fire up the new one

```bash
 docker-compose -f docker-compose.final.yml up --build -d
```

- this is the new db container with your SQL script applied, now test your app, it should work exactly the same with this new replica database, this is how we will be runnning your app

### submit the fork url

- when you've committed everything needed to your github fork, please share the url with us, so we can review your submission
  
