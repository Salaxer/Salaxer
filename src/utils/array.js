/**
 * 
 * @param {Array} arr 
 * @param {any} item 
 * @returns 
 */
export const remove = (arr, item) => {
    const newArr = [...arr];
    console.log(arr);
    newArr.splice(newArr.findIndex(i => i === item), 1);
    return newArr;
};

export const add = (arr, item) => {
    const newArr = [...arr];
    newArr.unshift(item)
    return newArr;
};
