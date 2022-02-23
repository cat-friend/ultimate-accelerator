# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/` page, I can click a `Sign Up` button and a modal will appear. The signup modal will contain a form:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (except my password).
        * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] A link appears in the navigation bar to register as a new user (only when not logged in)
- [ ] When an unregistered user clicks on the registration link/button, they are prompted to enter a desired username, email address, and password, and to confirm their password.
- [ ] If the registration information is invalid, the unregistered user is alerted of the errors in their input(s).
- [ ] If the registration information is valid, a new user is created and the user is logged in.
- [ ] Once successfully registered and logged in, the user is redirected to a splash page.
### Log In

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I am on the `/` page, I will see a log in form:
    * I would like to be able to enter my user credentials on a clearly laid out form.
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] User can enter their email and password in a log-in form
- [ ] Upon successful completion of the log-in form, the modal will disappear, and the authenticated user splash page will render.
- [ ] When the user enters invalid data on the log-in form, the page will inform the user of the failed validations and repopulate the form with the valid entries (except password), so that the user can try again without needing to refill every input field.

### Log Out

* As a logged in user, I can log out of my account so I can ensure that it is not used without my permission.
    * When I am on any page and I am logged in, I can click a button in the navigation bar to log out.
* When I click the log out button and navigate to a different page, I should remain logged out.
* When I am logged out, I can log in with a different account.
* When I am logged out, I should be able to log back in.

#### Acceptance Criteria

- [ ] When the user is logged in, a button appears in the navigation bar to log out.
- [ ] When the user clicks this button, the session ends and the user is logged out.
- [ ] When refreshing the page or traveling to other pages the user remains not logged in.
- [ ] The logged-out user can log back in or log in with a separate account without issue.

### Demo User Enablement

* As an unregistered and unauthorized user who wants to demo Study Buddy, I can enter the site via a single-button click on the login and signup form
    * so that I can view features of the website without creating an account.

#### Acceptance Criteria
- [ ] On the login page, any user can view a “Log in as Demo User” button.
    - [ ] Upon clicking the button, the user can access all features of the site with session-based authentication.

## Challenges

### Create Challenges
* As a logged in user, when I am on the `/users/:userId/challenges` page, I can create challenges to keep track of my battlepass progress.
    * I can see a `Create New Challenge` form when I am on my `/users/:userId/challenges`` page.

* When I enter invalid data on the `Create New Challenge` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I can see a button to submit the challenge.

#### Acceptance Criteria.
- [ ] A logged in user who is on their `/users/:userId/challenges` page sees a `Create New Challenge` form.
- [ ] The form has inputs where the user can fill out the label of the challenge.
- [ ] When a user enters invalid data on the `Create New Challenge` form, the page will inform the user of the failed validations and repopulate the form with the valid entries, so that the user can try again without needing to refill every input field.
- [ ] A button to submit the challenge is shown.
- [ ] When a user submits the challenge, the page will re-render and the challenge will be displayed. .

### Viewing Challenges
* As an authenticated user, I can view all of my challenges by clicking a button in the navigation bar.
unneeded - all details displayed on the page.

#### Acceptance Criteria
- [ ] Navigation bar must have a button for viewing all of the authenticated user's challenges (`/users/:userId/challenges`)
- [ ] The user can click on a challenge to view its details (title, description, challenge composition (including number of stars)).

- [ ] Only logged in users can view `/users/:userId/challenges`.

### Editing Challenges
* As a logged-in user visiting `/users/:userId/challenges`, I can edit the status of  each challenge that I have created
    * so that I can update the status of the challenge to `in progress` or `completed`.
* I should not be able to edit any challenges that belong to other users.

#### Acceptance Criteria
- [ ] When the user is viewing a challenge that they have created, the user can update the completion status of the challenge .

- [ ] When the user selects the new status, the challenge will update upon selection and the changes will be shown on the website.
- [ ] When viewing a challenge that the user did not create, the user will not be able to edit the challenge.

### Deleting Challenges
* As a logged in user viewing my `/users/:userId/challenges` page, I can delete the challenges that I have created
    * so that when I no longer want to share a challenge with others, I can remove it.
* I should not be able to delete any challenges that I have not created.
* When I delete a challenge, I also delete all data associated with it.
* I should be able to make a challenge with the same label as the one that I deleted.

#### Acceptance Criteria
- [ ] When the user is viewing a challenge that they have created, the user can click a button to delete their challenge.
- [ ] When the user clicks the button, the challenge and all data associated with the challenge will be deleted.
- [ ] If a user is not authorized to delete a challenge, an error will occur and the user will be alerted that they are not authorized to delete the challenge.

## Clans
Clans are groups that users can create, edit, and join.

### Creating a Clan
* As a logged in user, I can create a clan, a group for other players to join.
* When I am viewing `/clans`, if I am not currently a member of a clan and want to create a new clan, I can click a button to create a new clan and a `Create a New Clan` form will appear.
* When I enter invalid data on the `Create a New Clan` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* When I enter valid data, the clan will be shown in my user profile and I will be redirected to `/clans/:clanId`.

#### Acceptance Criteria
- [ ] When a logged-in user is viewing `/clans`, they can click a `Create a New Clan` button to add a new clan only if they are not currently in a clanj.
- [ ] The button will show a form for the user to put clan information.
- [ ] When a user enters invalid data, error messages will appear and fields that have been correctly populated will remain the same.
- [ ] When a user enters valid data, the user will be redirected to `/clans/:clanId`.

### Viewing a Clan
* As a logged-in user who is viewing a clan on the `/clans/:clanId` page, I can view the clan name, members, and description. If I am not part of the clan, I cannot view the comments.

#### Acceptance Criteria
- [ ] When a logged-in user is viewing a clan the `/clans/:clanId` page, the user can see the details of a clan.
- [ ] A user who is not a member of the clan is not authorized to see the clan’s messages and should not be able to see them.

### Updating a Clan
* As a logged-in user, while viewing a clan that I have created (`/clans/:clanId`), I have the option to edit the clan's name, description, and avatar.
* When I select the option to edit the clan, a form will appear. Information already present on the clan's page will be autopopulated within the form.
* When I enter invalid data on the `Edit Clan` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* If I have not created the clan, I will not be able to edit any details about the clan.
* After I have updated the clan, I can see the changes that I have made.

#### Acceptance Criteria
- [ ] When a logged-in user is viewing a clan that they have created (`/clans/:clanId`), they have the option to edit the clan.
- [ ] When the user selects the option to edit the clan, the user will be taken to a pre-filled form with the clan's information. The user can then change any of the sections that the user would like.
- [ ] When a user enters invalid data, error messages will appear and fields that have been correctly populated will remain the same.
- [ ] Only users who have created the clan can edit the clan's information.
- [ ] After the user has submitted their changes, they can view the updated clan.

### Joining a Clan
* As a logged-in user, if I have not joined a clan, I can join a clan while viewing a clan's page (`/clans/:clanId`). I will have the option to join the clan.
    * I can only join a clan if I am currently not in a clan.
* Once I join the clan, I will show up in the member's list and I will be authorized to post messages.

#### Acceptance Criteria
- [ ] When users are viewing a clan's page (`/clans/:clanId`), they can join that clan if and only if they are not currently a member in a clan.
- [ ] Once they join the clan, their username will appear in the list of members and they will be able to post messages.

### Leaving a Clan
* As an authenticated user, if I want to leave my clan, I will have the option to do so while viewing a clan's page (`/clans/:clanId`).
    * I can only leave a clan if I am currently in the clan.
* Once I leave the clan, I will not appear in the list of members and I will not be authorized to post messages.
* I can rejoin the clan if I wish.

#### Acceptance Criteria
- [ ] When users are viewing a clan's page (`/clans/:clanId`), they can leave that clan if and only if they are currently a member in that clan.
- [ ] Once they leave the clan, their username will disappear from the list of members and they will not be able to post messages.
- [ ] The user can re-join the clan if they wish.


### Deleting a Clan
* As a logged-in user and viewing a clan that Ihave created (`/clans/:clanId`), I can delete the clan.
* I will only see a `Delete Clan` button if I am the user who created the clan.
* When I click the `Delete Clan` button, the clan and its associated data will no longer exist.
* If I try to navigate to the URL of the clan that I have deleted, I will get a `404` error.
* I will not be able to delete the clans that other users have created.
* I will be able to create a new clan with the same information as the card that I have deleted.
* After I have successfully deleted a clan, I will be redirected to `/clans`.

#### Acceptance Criteria
- [ ] When a user is viewing a clan that they have created (`/clans/:clanId`), a `Delete Clan` button will be visible.
- [ ] The user will only see a `Delete Clan` button only if they are the user who created the clan.
- [ ] When the user clicks the `Delete Clan` button, the clan will be deleted.
- [ ] If the user tries to navigate to the URL of the clan that they have deleted, they will get a `404` error.
- [ ] A user cannot delete a clan that they have not created.
- [ ] A user will be able to create a new clan with the same name as the clan that they have deleted.
- [ ] Upon successful deletion of a clan, they will be redirected to `/clans`.


## Clan Messages

### Posting Clan Messages
* As an authenticated user, when I am viewing a clan that I have joined (`/clans/:clanId`), I can post messages to that clan's page by clicking a `JUST POST` button.
* A `JUST POST` form will appear and I can enter a message.
    * If I enter invalid data, the the page will inform me of the failed validations.
* I cannot post messages to clans that I have not joined.
* Once I successfully post a message, the form will disappear and I can see my message on the clan's page.

#### Acceptance Criteria
- [ ] When an authenticated user is viewing a clan that they have joined (`/clans/:clanId`), they can post messages to that clan's page by clicking a `JUST POST` button.
- [ ] A `JUST POST` form will appear and they can enter a message.
- [ ] When a user enters invalid data, error messages will appear and fields that have been correctly populated will remain the same.
- [ ] When the user successfully posts a message, their message will appear on the page.


### Viewing Clan Messages
* As an authenticated user, when I am viewing a clan that I have joined (`/clans/:clanId`), I can view messages that have been posted to that clan's page.


#### Acceptance Criteria
- [ ] When an authenticated user is viewing a clan that they have joined (`/clans/:clanId`), can see all messages that other members have posted.
- [ ] A user who is not a member of that specific clan is unable to see messages that clan members have posted.

### Editing a Message
* As an authenticated user and administrator of a clan, when I am viewing that clan's page (`/clans/:clanId`, I will be able to edit messages posted.
* When I select the option to edit the messagea form will appear. Information already present in the message page will be autopopulated within the form.
* When I enter invalid data on the `Edit Message` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* If I have not created the message or am not the clan administrator, I will not be able to edit any details about the clan.


#### Acceptance Criteria
- [ ] When an authenticated user is viewing a clan that they have created (`/clans/:clanId`), they will have the option to edit all messages for that clan.
- [ ] When an authenticated user is viewing a clan's page (`/clans/:clanId`), they will only be able to edit messages that they have posted.
- [ ] When the user selects the option to edit the message, the user will be taken to a pre-filled form with the message's information. The user can then change any of the sections that the user would like.
- [ ] When a user enters invalid data, error messages will appear and fields that have been correctly populated will remain the same.
- [ ] After the user has submitted their changes, they can view the updated message.


### Deleting a Clan Message
* When I am viewing messages on the clan page (`/clans/:clanId`), as an administrator of a clan I can delete any clan message.
    * I will only see a `Delete Message` button if I am the user who created the clan.
* When I am viewing messages on the clan page (`/clans/:clanId`), if I am the user who created the message, I can delete message if and only if I am still a member of the clan.
    * I will only see a `Delete Message` button if I am the user who created the message.
    * I will not be able to delete the messages that other users have created.
* When I click the `Delete Message` button, the message will no longer exist and it will not appear on the page.
* I will be able to create a new message with the same information as the card that I have deleted.

#### Acceptance Criteria
- [ ] When a user is viewing a clan that they have created (`/clans/:clanId`), a `Delete Message` button will be visible next to any and all messages.
- [ ] Non-clan administrators will only see a `Delete Message` button only if they are the user who created the message.
    - [ ] A regular clan member cannot delete a message that they have not created.
- [ ] When the user clicks the `Delete Message` button, the message will be deleted.
- [ ] A user will be able to create a new message with the same information as the message that they have deleted.
- [ ] Upon successful deletion of a message, the message will not appear on the page.

## Search

### Performing a Search
* As an authenticated user, I can see a search bar on the navigation bar.
    * When I enter a search query, I will be rerouted to `/search`. I will see challenges, clans, and usernames that match the search query.
        * I will see the search results grouped by the resource type. For example, all challenges that match the search query will appear together, all usernames that match the search query will appear together, etc.

#### Acceptance Criteria
- [ ] When logged-in users are viewing any page, they will see an interactable search bar in the navigation bar.
- [ ] When the authenticated user enters a search term, they will be rerouted to `/search`, the page will display all challenges, clans, and usernames that match the search term.
- [ ] Search results will be grouped by resource type.
