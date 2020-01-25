export const callFunctions = (...functions) => {
    return (...params) => {
        for (let i = 0; i < functions.length; i++) {
            if (undefined !== functions[i]) {
                functions[i](...params);
            }
        }
    };
};

export const joinClass = (...classes) => {
    return classes.filter((value) => { return undefined !== value && 0 !== value.length; }).join(' ');
};