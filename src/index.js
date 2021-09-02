import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { rules } from "./rules.js";

export default function useValidator(InitialValues, DefaultTab) {
    const [state, setState] = useState(() => {
        if (undefined !== DefaultTab) {
            let initState = { errors: {}, info: {}, inputs: {} };
            for (let tabKey in InitialValues) {
                const inputs = InitialValues[tabKey];
                for (let name in inputs) {
                    initState.errors[name] = {};
                    initState.info[name] = { active: false, interacted: false, tab: tabKey };
                    initState.inputs[name] = inputs[name];
                }
            }
            return initState;
        }
        let initState = { errors: {}, info: {}, inputs: { ...InitialValues } };
        for (let key in InitialValues) {
            initState.errors[key] = {};
            initState.info[key] = { active: false, interacted: false };
        }
        return initState;
    });
    const [tab, setTab] = useState(DefaultTab);

    const gerFirstInputError = () => {
        for (let inputKey in state.errors) {
            for (let ruleKey in state.errors[inputKey]) {
                if (state.errors[inputKey][ruleKey]) {
                    return inputKey;
                }
            }
        }
        return undefined;
    };

    const handleCheckboxChange = (name, onChange) => {
        return (event, ...props) => {
            setState((oldState) => {
                oldState.info[name].interacted = true;
                oldState.inputs[name] = !oldState.inputs[name];
                return { ...oldState };
            });
            if (undefined !== onChange) {
                onChange(event, ...props);
            }
        };
    };
    const handleDatePickerChange = (name, onChange, dateFormat, timeFormat) => {
        return (value, ...props) => {
            let newValue = value;
            if ("object" === typeof value && undefined === value._f) {
                newValue._f = "";
                if ("string" === typeof dateFormat) {
                    newValue._f += dateFormat;
                } else if (undefined === dateFormat || true === dateFormat) {
                    newValue._f += moment.localeData().longDateFormat("L");
                }
                if ("string" === typeof timeFormat) {
                    newValue._f += (0 < newValue._f.length ? " " : "") + timeFormat;
                } else if (undefined === timeFormat || true === timeFormat) {
                    newValue._f +=
                        (0 < newValue._f.length ? " " : "") + moment.localeData().longDateFormat("LT");
                }
            }
            setState((oldState) => {
                oldState.info[name].interacted = true;
                oldState.inputs[name] = newValue || null;
                return { ...oldState };
            });
            if (undefined !== onChange) {
                onChange(newValue, ...props);
            }
        };
    };
    const handleInputBlur = (name, onBlur) => {
        return (...props) => {
            setState((oldState) => {
                oldState.info[name].active = false;
                return { ...oldState };
            });
            if (undefined !== onBlur) {
                onBlur(...props);
            }
        };
    };
    const handleInputChange = (name, onChange) => {
        return (event, ...props) => {
            const newValue = (props[0] && props[0].value) ?? event.currentTarget.value;
            setState((oldState) => {
                oldState.inputs[name] = newValue;
                return { ...oldState };
            });
            if (undefined !== onChange) {
                onChange(event, ...props);
            }
        };
    };
    const handleInputFocus = (name, onFocus) => {
        return (...props) => {
            setState((oldState) => {
                oldState.info[name].active = true;
                oldState.info[name].interacted = true;
                return { ...oldState };
            });
            if (undefined !== onFocus) {
                onFocus(...props);
            }
        };
    };
    const handleRadioChange = (name, value, onChange) => {
        return (event, ...props) => {
            setState((oldState) => {
                oldState.info[name].interacted = true;
                oldState.inputs[name] = value;
                return { ...oldState };
            });
            if (undefined !== onChange) {
                onChange(event, ...props);
            }
        };
    };
    const handleSubmit = (onSuccess, onError) => {
        return (...props) => {
            const errorInputKey = gerFirstInputError();
            if (undefined !== errorInputKey) {
                if ("function" === typeof onError) {
                    onError(...props);
                }
                setState((oldState) => {
                    for (let inputKey in oldState.info) {
                        oldState.info[inputKey].interacted = true;
                    }
                    return { ...oldState };
                });
                if (undefined !== DefaultTab) {
                    setTab(state.info[errorInputKey].tab);
                }
            } else {
                if ("function" === typeof onSuccess) {
                    onSuccess(...props);
                }
            }
        };
    };

    const hasError = (name) => {
        return undefined !== state.errors[name] && 0 !== Object.values(state.errors[name]).length;
    };
    const hasVisibleError = (name) => {
        return hasError(name) && !state.info[name].active && state.info[name].interacted;
    };

    const importCheckbox = (Name, { onChange: OnChange } = {}) => {
        return {
            checked: state.inputs[Name],
            name: Name.toLowerCase(),
            onChange: handleCheckboxChange(Name, OnChange),
        };
    };
    const importDatePicker = (
        Name,
        {
            dateFormat: DateFormat,
            onBlur: OnBlur,
            onChange: OnChange,
            onFocus: OnFocus,
            timeFormat: TimeFormat,
        } = {}
    ) => {
        return {
            dateFormat: DateFormat,
            name: Name.toLowerCase(),
            onBlur: handleInputBlur(Name, OnBlur),
            onChange: handleDatePickerChange(Name, OnChange, DateFormat, TimeFormat),
            onFocus: handleInputFocus(Name, OnFocus),
            timeFormat: TimeFormat,
            value: state.inputs[Name],
        };
    };
    const importRadio = (Name, Value, { onChange: onChange } = {}) => {
        return {
            checked: Value === state.inputs[Name],
            name: Name.toLowerCase(),
            onChange: handleRadioChange(Name, Value, onChange),
        };
    };
    const importInput = (Name, { onBlur: OnBlur, onChange: OnChange, onFocus: OnFocus } = {}) => {
        return {
            name: Name.toLowerCase(),
            onBlur: handleInputBlur(Name, OnBlur),
            onChange: handleInputChange(Name, OnChange),
            onFocus: handleInputFocus(Name, OnFocus),
            value: state.inputs[Name],
        };
    };
    const importSubmit = ({ onError: OnError, onSuccess: OnSuccess }) => {
        return {
            onClick: handleSubmit(OnSuccess, OnError),
        };
    };

    const setInputs = (callback) => {
        setState((oldState) => {
            return { ...oldState, inputs: callback(oldState.inputs) };
        });
    };

    const IsEmail = ({ children: Children, enabled: Enabled = true, for: For }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isEmail(value);
                const wasError = undefined !== oldState.errors[For].IsEmail;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsEmail = true;
                } else {
                    delete oldState.errors[For].IsEmail;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsEmail && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsEqual = ({ children: Children, enabled: Enabled = true, for: For, value: Value }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isEqual(value, Value);
                const wasError = undefined !== oldState.errors[For].IsEqual;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsEqual = true;
                } else {
                    delete oldState.errors[For].IsEqual;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsEqual && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsInRange = ({ children: Children, enabled: Enabled = true, for: For, range: [min, max] }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isInRange(value, [min, max]);
                const wasError = undefined !== oldState.errors[For].IsInRange;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsInRange = true;
                } else {
                    delete oldState.errors[For].IsInRange;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsInRange && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsLengthValid = ({ children: Children, enabled: Enabled = true, for: For, length: [min, max] }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isLengthValid(value, [min, max]);
                const wasError = undefined !== oldState.errors[For].IsLengthValid;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsLengthValid = true;
                } else {
                    delete oldState.errors[For].IsLengthValid;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsLengthValid && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsMomentValid = ({ children: Children, enabled: Enabled = true, for: For }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isMomentValid(value);
                const wasError = undefined !== oldState.errors[For].IsMomentValid;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsMomentValid = true;
                } else {
                    delete oldState.errors[For].IsMomentValid;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsMomentValid && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsNumber = ({ children: Children, enabled: Enabled = true, for: For }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isNumber(value);
                const wasError = undefined !== oldState.errors[For].IsNumber;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsNumber = true;
                } else {
                    delete oldState.errors[For].IsNumber;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsNumber && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const IsValid = ({ children: Children, enabled: Enabled = true, for: For, pattern: Pattern }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.isValid(value, Pattern);
                const wasError = undefined !== oldState.errors[For].IsValid;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].IsValid = true;
                } else {
                    delete oldState.errors[For].IsValid;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].IsValid && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };
    const Required = ({ children: Children, enabled: Enabled = true, for: For }) => {
        useEffect(() => {
            setState((oldState) => {
                const value = state.inputs[For];
                const hasError = Enabled && !rules.required(value);
                const wasError = undefined !== oldState.errors[For].Required;
                if (hasError === wasError) {
                    return oldState;
                }
                if (hasError) {
                    oldState.errors[For].Required = true;
                } else {
                    delete oldState.errors[For].Required;
                }
                return { ...oldState };
            });
        }, [Enabled, state.inputs[For]]);

        if (state.errors[For].Required && !state.info[For].active && state.info[For].interacted) {
            return <>{Children}</>;
        }
        return <></>;
    };

    const Validator = useMemo(() => {
        return {
            hasError,
            hasVisibleError,
            importCheckbox,
            importDatePicker,
            importInput,
            importRadio,
            importSubmit,
            IsEmail,
            IsEqual,
            IsInRange,
            IsLengthValid,
            IsMomentValid,
            IsNumber,
            IsValid,
            Required,
        };
    }, []);

    return {
        inputs: state.inputs,
        tab,
        setInputs,
        setTab,
        Validator: Validator,
    };
}
