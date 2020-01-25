export const RulesTable = {
    isAlphanumeric: (value) => {
        return undefined === value || '' === value || /^[A-Za-z0-9]+$/.test(String(value).toLowerCase());
    },
    isEmail: (value) => {
        return undefined === value || '' === value || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());
    },
    isLengthValid: (value, props) => {
        return undefined === value || '' === value || ((undefined === props.minLength || value.length >= props.minLength) && (undefined === props.maxLength || value.length <= props.maxLength));
    },
    isNumber: (value) => {
        return !Number.isNaN(Number(value));
    },
    isRegexValid: (value, props) => {
        return undefined === value || '' === value || props.regex.test(String(value));
    },
    isRequired: (value) => {
        return undefined !== value && value.length !== 0 && value !== false;
    },
    isValueValid: (value, props) => {
        return undefined === value || '' === value || ((undefined === props.min || value >= props.min) && (undefined === props.max || value <= props.max));
    }
};