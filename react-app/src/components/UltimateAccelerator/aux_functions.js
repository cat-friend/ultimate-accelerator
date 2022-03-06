export const legendsString = (maxData, legendsDict) => {
    const legendsSet = new Set();
    maxData.forEach((ele) => legendsSet.add(legendsDict[ele.legend_id]));
    const payload = [];
    const legendsSetValues = legendsSet.values();
    for (const legend of legendsSetValues) payload.push(legend);
    return payload;
}


export const weaponsString = (maxData, weaponsDict) => {
    const weaponsSet = new Set();
    maxData.forEach((ele) => weaponsSet.add(weaponsDict[ele.weapon_id]));
    const payload = [];
    const weaponsSetValues = weaponsSet.values();
    for (const weapon of weaponsSetValues) payload.push(weapon);
    return payload;
}
