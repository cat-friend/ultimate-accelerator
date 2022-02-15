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
