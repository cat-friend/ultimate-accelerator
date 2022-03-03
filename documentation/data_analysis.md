Battle Pass Challenges are based on play modes, playable characters (legends), or weapons and challenge types. The goals of analyzing game data were:
1. determining the most granular data related to Battle Pass Challenges. Using the most granular data allows for calculation of the maximization of stars accrual with minimum gameplay time.
2. determining key words used to identify challenge types and their requirements so, rather than providing the user with a fixed list of available challenges, the user can input their Battle Pass Challenges and the database can be updated programmatically vs. manually.

## Play modes
Apex Legends has three play modes:
1. Battle Royale - players and their squadmates play against 57-58 other people. To win, they must remain the last players standing as the map grows increasingly smaller.
2. Arenas - players and their squadmates must defeat a team of three on smaller maps. To win a round, players must defeat the other team. To win a match, players need to win at least three rounds _and_ be ahead of the enemy team by two points. One round awards a team one point.
3. Limited Time Mode (LTM) - a game-mode that are only available for a limited time.

## Playable Characters (Legends)
Apex Legends has 20 playable characters (legends) and 3 classes of legends (`recon`, `defense`, `support`)
|Legend Name| Class|
| ------------- | ------------- |
|Bloodhound|recon|
|Gibraltar|defense|
|Lifeline|support
|Pathfinder|recon
|Wraith|assault
|Bangalore|assault
|Caustic|defense
|Octane|assault
|Mirage|assault
|Wattson|defense
|Crypto|recon
|Revenant|assault
|Loba|support
|Rampart|defense
|Horizon|assault
|Fuse|assault
|Valkyrie|recon
|Seer|recon
|Ash|assault
|Mad Maggie|assault

## Weapons and Weapon Types
In Apex Legends, there are 28 weapons and 9 categories of weapons, two of which (red tier and craftable) overlap with other types. All weapons belong to at least one category.
|Weapon|Category|
| ------------- | ------------- |
|P2020| pistol
|RE-45| pistol
|Wingman| pistol
|Flatline|assault rifle, craftable
|Havoc|assault rifle
|Hemlok|assault rifle
|R-301|assault rifle
|Alternator|sub machine gun (SMG)
|CAR|SMG
|Prowler|SMG
|R-99|SMG
|Volt|SMG, red tier
|Devotion|light machine gun (LMG)
|L-STAR|LMG
|Rampage|LMG
|Spitfire|LMG
|EVA-8|shotgun
|Mastiff|shotgun
|Mozambique|shotgun
|Peacekeeper|shotgun
|30-30 Repeater|marksman
|Bocek|marksman
|G7 Scout|marksman, red tier
|Triple Take|marksman
|Charge Rifle|sniper
|Kraber|sniper
|Longbow DMR|sniper
|Sentinel|sniper

## Challenge Types
I collected Apex Legends' Season 11 Weekly Battle Pass Challenges raw data and grouped the data into challenge categories. I identified 11 distinct challenge categories:
   1. `Ability`-based challenges - these challenges involve completing objectives related to a character's passive or active abilities.
   2. `Collect` materials/use a replicator - these challenges involve collecting crafting materials or using a replicator to craft equipment.
   3. `Damage` - these challenges require players to deal damage. `damage` challenges may require the player to use a specific weapon or legend, but never both. That is, weapons and legends are mutually exclusive for damage challenges.
   4. `Finish` - `finish` challenges require the player to place in a certain rank in the Battle Royale (i.e. Top 3) or win an arenas match.
   5. `Health` - `health` challenges require the player to restore health or revive themselves or squadmates.
   6. `Kills, Knockdowns, Assists` (`KKDA`) - `KKDA` challenges require the player perform a number of kills (knockdown an enemy and the enemy must be killed while down, either by the player who knocked them down or someone else), knockdowns (reduce an enemy's health to 0), and/or assist in the killing of another player.
   7. `Loot` - `loot` challenges require the player to loot various types of equipment containers or specific types of items.
   8. `Play` - `play` challenges require the player to play a certain number of game-types or as specific characters.
   9. `Purchase` - `purchase` challenges are Arena mode specific and require the player to purchase or upgrade their weapons.
   10. `Scan` - `scan` challenges require the player to play as a `recon` hero and scan survey beacons.
   11. `Survive` - to complete `survive` challenges, the player must outlive a number of other players or live through a number of ring closings (a ring closing is when the Battle Royale or Arena map play area contracts).

Each challenge type has identifying words associated with them, for example `damage` challenges all contain "deal << X >> damage << OPTIONAL:  with legend or with weapon>>".

## Dictionary and Regexes
Based on the glossary of legends, weapons, weapon types, and challenge types, I developed four (4) regexes (Appendix B:  Regexes) to identify key information from user input data. I developed three (3) dictionaries with Battle Pass Challenge-related vocabulary as the keys and the id of the data on its associated model (Appendix C:  Dictionaries). I then designed a function to programmatically  iterate through data gathered via regex matching, compare regex data with data in the dictionaries, and add data from the dictionaries to the payload. The payload is then sent to the backend.
