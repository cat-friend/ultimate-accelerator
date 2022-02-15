# API Documentation

## API-Routes

This web app uses the following API routes to dynamically update the page.

### Challenges
* An authenticated user may create a new challenge and view all challenges that they have created without causing a refresh/redirect.
    * `GET /api/challenges`
    * `POST /api/challenges`

* An authenticated user may view, edit, and delete a specific challenge that they have created by changing its title or description.
    * `GET /api/challenges/:challengeId`
    * `PUT /api/challenges/:challengeId`
    * `DELETE /api/challenges/:challengeId`

### Clans
* Users can view all clans. They can also create at most one (1) new clan.
    * `GET /api/clans`
    * `POST /api/clans`

* An authenticated user may create at most one (1) new clan. They can also view a specific clan.  They may edit or delete a clan if they are the clan administrator.
    * `GET /api/clans/:clanId`
    * `PUT /api/clans/:clanId`
    * `DELETE /api/clans/:clanId`

### Comments
* An authenticated user can view all messages on a clan's page.
    * `GET /api/clans/:clanId/comments`

* An authenticated user can post messages on the clan's page that they are a member of and edit and/or delete a comment that they have posted.
    * `GET /api/clans/:clanId/comments`
    * `PUT /api/comments/:commentId`
    * `DELETE /api/commments/:commentId`

### User Profile Page
* An authenticated user may view and edit their  profile page without causing a refresh/redirect.
    * `GET /api/:userId`
    * `PUT /api/:userId`
