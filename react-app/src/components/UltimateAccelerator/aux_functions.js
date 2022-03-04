const legendsDict = {
    1: "Bloodhound",
    2: "Gibraltar",
    3: "Lifeline",
    4: "Pathfinder",
    5: "Wraith",
    6: "Bangalore",
    7: "Caustic",
    8: "Octane",
    9: "Mirage",
    10: "Wattson",
    11: "Crypto",
    12: "Revenant",
    13: "Loba",
    14: "Rampart",
    15: "Horizon",
    16: "Fuse",
    17: "Valkyrie",
    18: "Seer",
    19: "Ash",
    20: "Mad Maggie"
}


export const legendsString = (maxData, legendsDict) => {
    const legendsSet = new Set();
    maxData.forEach((ele) => legendsSet.add(legendsDict[ele.legend_id]));
    const legendsArray = [];
    const legendsSetValues = legendsSet.values();
    for (const legend of legendsSetValues) legendsArray.push(legend);
    const payload = [];
    payload.push(legendsArray.length)
    payload.push(legendsArray.join(", "));
    return payload;
}


export const weaponsString = (maxData, weaponsDict) => {
    const weaponsSet = new Set();
    maxData.forEach((ele) => weaponsSet.add(weaponsDict[ele.weapon_id]));
    const weaponsArray = [];
    const weaponsSetValues = weaponsSet.values();
    for (const weapon of weaponsSetValues) weaponsArray.push(weapon);
    const payload = [];
    payload.push(weaponsArray.length)
    payload.push(weaponsArray.join(", "));
    return payload;
}
