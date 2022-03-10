const challengeTypeRegex = /collect|craft\b|damage|finish\b|win|restore|revive|resurrect|knockdowns|\bkills|assists|headshots|finishing|loot\b|open\b|play|purchase|upgrade|beacons|outlive|survive/g
const abilitiesRegex = /nox|thunder|bombardment|gun\bshield|drone|zipline|phase|amped cover|knuckle cluster|looted by squadmates|scan\b.*enemies|silence|double time|decoy|bamboozle|gas|jump pad|/g
const legendsRegex = /bloodhound|gibraltar|lifeline|pathfinder|wraith|bangalore|caustic|octane|mirage|wattson|crypto|revenant|loba|rampart|horizon|fuse|valkyrie|seer|ash|maggie|beacons/g
const weaponsRegex = /30-30|alternator|bocek|\bcar\b|charge rifle|devotion|eva-8|flatline|g7|havoc|hemlok|kraber|l-star|longbow|mastiff|mozambique|p2020|peacekeeper|prowler|r-301|r-99|rampage|re-45|sentinel|spitfire|triple take|volt|wingman|pistol|assault rifle|\bar\b|smg|\bsub\bmach|light machine|lmg|shotgun|marksman|sniper|\bred\b|craftable/g

export {challengeTypeRegex, abilitiesRegex, legendsRegex, weaponsRegex}
