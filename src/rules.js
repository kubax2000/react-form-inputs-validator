export const rules = {
    isEmail: (value) => {
        return (
            undefined === value ||
            0 === value.length ||
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                String(value).toLowerCase()
            )
        );
    },
    isEqual: (value, target) => {
        return undefined === value || 0 === value.length || target === value;
    },
    isInRange: (value, [min, max]) => {
        return undefined === value || 0 === value.length || (value >= min && value <= max);
    },
    isLengthValid: (value, [min, max]) => {
        return undefined === value || 0 === value.length || (min <= value.length && max >= value.length);
    },
    isMomentValid: (value) => {
        return (
            undefined === value ||
            null === value ||
            0 === value.length ||
            (undefined !== value.isValid && value.isValid())
        );
    },
    isNumber: (value) => {
        return undefined === value || 0 === value.length || !Number.isNaN(Number(value));
    },
    isValid: (value, pattern) => {
        const regex = new RegExp(pattern);
        return regex.test(value);
    },
    required: (value) => {
        return undefined !== value && null !== value && false !== value && 0 !== value.length;
    },
};
