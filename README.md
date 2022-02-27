# Ultimate Accelerator

<a href="https://ultimate-accelerator.herokuapp.com">Live Site</a>  |  <a href="https://github.com/cat-friend/ultimate-accelerator/wiki"> Project Wiki</a> | <a href="https://github.com/cat-friend/ultimate-accelerator/issue">Report Bug</a>

**Ultimate Accelerator** is a companion application for Respawn Entertainment's video game [_Apex Legends_](https://www.respawn.com/games/apex-legends). In _Apex Legends_, the Battle Pass is a system that rewards players for accruing stars and "leveling up" their Battle Pass. Players can unlock character cosmetics and in-game currency by advancing their Battle Pass levels. Battle Pass levels increase when the player has accrued enough stars to "level up." Players earn stars by completing daily, weekly, and/or event challenges. This full stack application was designed as my capstone project for App Academy's 24-week Full Stack Software Engineering Bootcamp. It is my best work to date and the, ahem, _apex_ of my abilities.

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
Full user stories for the initial development phase are available on the [User Stories](https://github.com/cat-friend/ultimate-accelerator/wiki/2.-User-Stories-&-Features-Acceptance-Criteria) section of the project wiki. A feature list for the initial development phase is available on the [Feature List](https://github.com/cat-friend/ultimate-accelerator/wiki/1.-MVP-Features-List) section of the project [wiki](https://github.com/cat-friend/ultimate-accelerator/wiki).

### User Registration and Authentication
New users can register for an account by entering a unique username, email address, and password. If the username is already taken, the email address provided is invalid or already in use, and/or the password is invalid, the user will be notified of the specific errors.

<p align='center'>
<img src='https://raw.githubusercontent.com/cat-friend/ultimate-accelerator/main/documentation/README-images/sign_up.jpg' alt='sign up form'>
</p>


Existing users can log in to their account by submitting their credentials via the login form. If there are any issues with their provided credentials, the user will be notified of the errors. Users may log out of their account by clicking the **LOGOUT** button on the site-wide navigation bar.

<p align='center'>
<img src="https://raw.githubusercontent.com/cat-friend/ultimate-accelerator/main/documentation/README-images/log_in.jpg" alt='log in form'>
</p>



### Creating and Modifying A Battlepass Challenge

Authenticated users can create a battlepass challenge with a title, mode type, and value (stars). If there are any issues with their provided data, the user will be notified of the errors.

<p align='center'>
<img src="https://raw.githubusercontent.com/cat-friend/ultimate-accelerator/main/documentation/README-images/add_challenge.jpg" alt='add challenge form'>
</p>

All authenticated users can view the other user's Battle Pass Challenge information.

<p align='center'>
<img src= alt='sign up form'>
</p>

When viewing their own Battle Pass Challenges, they may add, edit, or delete challenges. Users can edit the status of their Battle Pass Challenge to a status of `open`, `in progress`, or `completed`.

<p align='center'>
<img src= alt='sign up form'>
</p>


### Creating and Modifying A Clan

If a user is not currently a member of a clan, they may create one (1) clan.

<p align='center'>
<img src= alt='sign up form'>
</p>

If a user does not wish to create their own clan, they can join a clan by navigating to that clan's page. Their name will immediately appear in the clan members list.

<p align='center'>
<img src= alt='sign up form'>
</p>

If a user would like to leave their clan, they can do so by navigating to their clan's page and clicking the `Leave` button. Their name will immediately disappear from the clan members list.

<p align='center'>
<img src= alt='sign up form'>
</p>

<p align='center'>
<img src= alt='sign up form'>
</p>


### Frontend Routes
# COME BACK AND FIX LINKS
All frontend routes are covered in detail on the [Fronted Routes section of the project wiki](https://github.com/cat-friend/ultimate-accelerator/wiki/3.-Frontend-Routes). Frontend routes were designed to enable users access to basic functionality such as:
   * registration;
   * authentication;
   * viewing, creating, updating and deleting challenges;
   * viewing, creating, updating, deleting, joining, and leaving clans (groups).

### API Routes
# COME BACK AND FIX LINKS
All frontend routes are covered in detail on the [API Routes section of the project wiki](https://github.com/cat-friend/ultimate-accelerator/wiki/4.-API-Documentation). API routes were designed for users to interact with a page without being redirected.


## Feature Highlights

### Data analysis
Battle Pass Challenges are based on play modes, playable characters (legends), or weapons and challenge types. I analyzed relevant raw data from _Apex Legends_ in order to programmatically identify, categorize, and create new database entries based on user input challenge data. For a full write up, see [Data Analysis](https://github.com/cat-friend/ultimate-accelerator/wiki/Battle-Pass-Challenges-Data-Analysis).


### Accessibility
Almost all text on website has a contrast ratio of at least 7.00 and is sized in `rem` units.


## Future Improvements

### Automatic Battle Pass Challenge Data Archival
Battle Passes are season-specific. A season in _Apex Legends_ usually lasts about 11 weeks. Prior to the launch of a new season, Respawn announces when the next season will launch and end. A future feature will be database archival of season data, creation of a new season's challenges database, and updating user statistics.

## Acknowledgements

Big thank you to everyone who's been with me along the way. Specifically:
* Blueberry Smith for helping me simplify my database schema and raw SQL queries _after_ I've struggled with it. Giving me room to grow is the best gift;
* Dolph Squid for the inspiration and for being a great frond, good job I love you!;
* Green Pepper for dependable moral support;
* Yellow Yoshi for our late night talks and Shrek gifs;
* Austin M. for giving me the courage to _finally_ pivot out of science after two (2) years of indecision;
* Barry Mattern for being the best cohort lead that anyone in the history of bootcamps anywhere could ever ask for. Thank you for your compassion and understanding. October 2022 cohort they will soon know how lucky they are to have you as their cohort leader;
* Suhayl & Co for everything--this bootcamp has been one of the most enjoyable experiences of my life and you played a huge role in that. I wake up every morning and open palm slam a giant smile on my face because I am blessed with the opportunity to learn and develop alongside very compassionate, talented, and intelligent people and to make you laugh so hard via Discord that you have to shut your camera off in Zoom.
