# Database Schema for Optimize Apex
![Optimize-Apex-DB](https://https://raw.githubusercontent.com/cat-friend/optimize-apex/main/documentation/dbschema.png)

## users
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| username | string(32) | not null, unique |
| email | string(64) | not null, unique |
| hashed_password | binary | not null |
| bio | text(512) | |
| clan_id| integer| |
| created_at | timestamp | not null |
| updated_at | timestamp | not null |


## clans
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| clan_name| string(32)| not null|
| owner_user_id| integer| not null|
| created_at | timestamp | not null |
| updated_at | timestamp | not null |


## messages
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| clan_id | integer | not null|
| user_id | integer| not null |
| message | text | not null |
| created_at | timestamp | not null |
| updated_at | timestamp | not null |


## challengetypes
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
|type| varchar | not null


## mode
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
|mode| varchar | not null


## legends
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
|name| varchar | not null
|class| varchar | not null


## weapontypes
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
|name| varchar | not null, unique
|type| varchar | not null


## abilityobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| ability |varchar|not null
| legend_id| integer| not null|


## collectobjectdives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## dmgobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## finishobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## healthobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## kkdaobjective
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## lootobjective
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## playobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## purchaseobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key |
| challenge_id | integer | not null
| objective |varchar|not null


## scanobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key
| challenge_id | integer | not null
| objective |varchar|not null
| legend_id| integer| not null


## surviveobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key
| challenge_id | integer | not null
| objective |varchar|not null


## winobjectives
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key
| challenge_id | integer | not null
| objective |varchar|not null


## userchallenge
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key
| challenge_label | varchar(128) | not null
| challenge_type_id |integer|not null
| user_id| integer | not null
|status|varchar|not null, default = "open"
|value| integer| not null, min = 1; max = 20
|created_at| timestamp| not null
|updated_at| timestamp|


## userchallengedimensiontable
|column name| data type| detail |
| ------------- | ------------- | ------------- |
| id | integer | not null, primary key
| user_challenge_id | integer | not null
|weapon_id| integer |not null
|mode_id| integer |not null
|legend_id| integer |not null
|value| integer| not null, min = 1; max = 20
|created_at| timestamp| not null
|updated_at| timestamp|
