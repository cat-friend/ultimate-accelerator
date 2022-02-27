# Ultimate Accelerator

<a href="https://ultimate-accelerator.herokuapp.com">Live Site</a>  |  <a href="https://github.com/cat-friend/ultimate-accelerator/wiki"> Project Wiki</a> | <a href="https://github.com/cat-friend/ultimate-accelerator/issue">Report Bug</a>

Ultimate Accelerator is a companion application to Respawn Entertainment's _Apex Legends_ video game. Ultimate Accelerator is a companion application for Respawn Entertainment's video game _Apex Legends_. In _Apex Legends_, the Battle Pass is a system that rewards players for accruing stars and "leveling up" their Battle Pass. Players can unlock character cosmetics and in-game currency by advancing their Battle Pass levels. Battle Pass levels increase when the player has accrued enough stars to "level up." Players earn stars by completing daily, weekly, and/or event challenges. This full stack application was designed as my capstone project for App Academy's 24-week Full Stack Software Engineering Bootcamp. It is my best work to date and the, ahem, _apex_ of my abilities.

## Technologies Used
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | [Node.js](https://nodejs.org/en/) | [Flask](https://flask.palletsprojects.com/en/2.0.x/) | [React](https://reactjs.org/) | [Redux](https://redux.js.org/) | [SQLAlchemy](https://www.sqlalchemy.org/) | [PostgreSQL](https://www.postgresql.org/) | [Docker](https://www.docker.com/)

## Launching Locally

### Prerequisites
 - [Node.js 16.13.1](https://nodejs.org/en/)

### Getting Started

1. Clone the project repository
```
   git clone https://github.com/cat-friend/ultimate-accelerator.git
```
2. Install dependencies
```
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

3.  Create a local .env file modeled after the .env.example file in the root directory
```
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=<<YOUR-SECRET_KEY>>
   DATABASE_URL=postgresql://ultimate_accel_dev:<<PASSWORD>>@localhost/ultimate_accel_db
```
4. Set up your PostgreSQL user (`ultimate_accel_dev`), password, and database (`ultimate_accel_db`). Make sure that these values match your .env file!

5. Access your `pipenv shell`, migrate your database, seed your database, and run your flask app with the following commands:
```
pipenv shell
```
```
flask db upgrade
```
```
flask seed all
```
```
flask run
```

   In the future, if you'd like to unseed and reseed the database, you can run
   ```
   flask seed reset
   ```
   Caution! This will delete _all_ data in your database.

5. To run the React App, `cd` into the `react-app` directory, install `react-app`, and then start React:
 ```
    cd react-app
 ```
  ```
    npm install
 ```
  ```
    npm start
 ```

## Ultimate Accelerator In Action
Full user stories for the initial development phase are available on the [User Stories](https://github.com/cat-friend/ultimate-accelerator/wiki/User-Stories-&-Acceptance-Criteria) section of the project wiki. A feature list for the initial development phase is available on the [Feature List](https://github.com/cat-friend/ultimate-accelerator/wiki/Feature-List) section of the project [wiki](https://github.com/cat-friend/ultimate-accelerator/wiki).

### User Registration and Authentication
New users can register for an account by entering a unique username, email address, and password. If the username is already taken, the email address provided is invalid or already in use, and/or the password is invalid, the user will be notified of the specific errors.

## < Add images >


Existing users can log in to their account by submitting their credentials via the login form. If there are any issues with their provided credentials, the user will be notified of the errors. Users may log out of their account by clicking the **LOGOUT** button on the site-wide navigation bar.

## < Add images >


### Creating and Modifying A Battlepass Challenge

Authenticated users can create a battlepass challenge with a title, mode type, and value (stars). If there are any issues with their provided data, the user will be notified of the errors.

## < Add images >

All authenticated users can view the other user's Battle Pass Challenge information.

## < Add images >

When viewing their own Battle Pass Challenges, they may add, edit, or delete challenges. Users can edit the status of their Battle Pass Challenge to a status of `open`, `in progress`, or `completed`.

## < Add images >


### Creating and Modifying A Clan

If a user is not currently a member of a clan, they may create one (1) clan.

## < Add images >

If a user does not wish to create their own clan, they can join a clan by navigating to that clan's page. Their name will immediately appear in the clan members list.

## < Add images >

If a user would like to leave their clan, they can do so by navigating to their clan's page and clicking the `Leave` button. Their name will immediately disappear from the clan members list.

## < Add images >

## < Add images >


<!-- ### Adding and Removing Decks From Their `Study List` Collection

Users can mark any as to-be-studied and it will be added to their to-study collection.

Users can remove any from their to-study collection.



### Search By Tags

Each deck will have its tags visible. Users can click on the tags to do a search of all decks with that tag.

## < Add images >


## Technical Implementation
### Database Design
The full database schema is available to view [on dbdiagram.io](https://dbdiagram.io/d/61f9be7485022f4ee524eb6f), or as a [list of tables on the Database Schema page](https://github.com/cat-friend/ultimate-accelerator/wiki/Database-Schema) of the wiki. -->



### Frontend Routes
# COME BACK AND FIX LINKS
All frontend routes are covered in detail on the [Fronted Routes section of our project wiki](https://github.com/cat-friend/ultimate-accelerator/wiki/Frontend-Routes). Frontend routes were designed to enable users access to basic functionality such as:
   * registration;
   * authentication;
   * viewing, creating, updating and deleting challenges;
   * viewing, creating, updating, deleting, joining, and leaving clans (groups).

### API Routes
# COME BACK AND FIX LINKS
All frontend routes are covered in detail on the [API Routes section of our project wiki](https://github.com/cat-friend/ultimate-accelerator/wiki/API-Documentation). API routes were designed for users to interact with a page without being redirected.
   </br>

## Data analysis
Battle Pass Challenges are based on play modes, playable characters (legends), or weapons and challenge types. I analyzed relevant raw data from _Apex Legends_ in order to programmatically identify, categorize, and create new database entries based on user input challenge data. For a full write up, see [Data Analysis](https://github.com/cat-friend/ultimate-accelerator/wiki/Battle-Pass-Challenges-Data-Analysis).


### Future Improvements

#### Optimization calculator

The website is currently functional on all screen sizes, but is styled for screens greater than 900 px in width. New smaller-scale layouts will be implemented so that the user experience on mobile or tablet devices is comparable to the desktop user experience.

### Improved Maintainability

#### **Normalization of Tag Names**

Currently, all tags are stored as rows on a database. If a user types in a new tag for a deck that is not already in the database, a new tag is created. However, the addition of new tags does not currently account for spelling or capitalization variations. For example, JavaScript, Javascript, and JS would all be stored in the database as separate tags. In order to support future functionality, tag names may undergo a pattern-matching normalization process or third-party name API validation to prevent duplicate entries within our database.

## Acknowledgements

Big thank you to everyone who's been with me along the way. Specifically:
* Blueberry Smith for helping me simplify my database schema and raw SQL queries _after_ I've struggled with it. Giving me room to grow is the best gift;
* Dolph Squid for the inspiration and for being a great frond, good job I love you!;
* Green Pepper for dependable moral support;
* Yellow Yoshi for our late night talks;
* Austin McDonald for giving me the courage to _finally_ pivot out of science after two (2) years of indecision;
* Barry Mattern for being the best cohort lead that anyone in the history of bootcamps anywhere could ever ask for. Thank you for your compassion and understanding. October 2022 cohort doesn't know it yet but they will soon know how lucky they are;
* Suhayl & Co for everything--this bootcamp has been one of the most enjoyable experiences of my life and you and Barry Mattern played a huge role in that. I wake up every morning and open palm slam a giant smile on my face because I am blessed with the opportunity to make you laugh so hard in Discord that you have to shut your camera off in Zoom and to learn and develop alongside very compassionate, talented, and intelligent people.
