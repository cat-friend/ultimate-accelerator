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
