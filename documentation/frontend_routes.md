## `/`

### Home Page

For unauthenticated users, this page displays a signup and login form. For authenticated users, this page displays the webapp title image and a short blurb about the site.

### Navigation Bar
The navigation bar, which appears throughout the site, displays differently for authenticated and unauthenticated users. For unauthenticated users, only the site icon, which, when clicked, directs the user to `/`, appears. For authenticated users, a greeting to the user and links to the tutorial, the user's Battle Pass Challenges page, clans, and logout appear.

## `/tutorial`

This page displays a tutorial on how to use the webapp.

## `/users/:userId/challenges`

This page displays the Battle Pass Challenges for a user. If the session user is the owner of the Battle Pass Challenges displayed, then there will be edit and delete buttons on the page.

## `/clans`

This page displays all clans that are currently active. If the user is not currently a member of a clan, then a `Create Clan` form will appear. If they are currently a member of a clan, a message displays that informs the user that they are unable to create a clan.

#### `/clans/:clanId`

This page displays the name, description, and members of a clan. If the user is not currently a member of this clan, a `JOIN` button will appear. If they are currently a member of the clan and not the clan's administrator, a `LEAVE` button will appear. If they are the clan's administrator, `EDIT` and `DELETE` buttons appear.
