import Input from './components/Input.js';
import IsAlphanumeric from './components/IsAlphanumeric.js';
import IsEmail from './components/IsEmail.js';
import IsLengthValid from './components/IsLengthValid.js';
import IsNumber from './components/IsNumber.js';
import IsRegexValid from './components/IsRegexValid.js';
import IsRequired from './components/IsRequired.js';
import IsValueValid from './components/IsValueValid.js';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Submit from './components/Submit.js';

function Index({as: As, children: Children, id: Id, includeForm: IncludeForm, ...otherProps}) {
    const [state, setState] = useState({
        validators: {}
    });

    if(undefined === state.validators[Id]) {
        state.validators[Id] = {
            inputs: [],
            results: []
        };
    } else {
        state.validators[Id].results = [];
    }

    const onInputChange = (event) => {
        state.validators[Id].inputs[event.target.id].changed = true;
        state.validators[Id].inputs[event.target.id].value = event.target.value;
        setState(Object.assign({}, state));
    };
    const onSubmitClick = (event) => {
        event.preventDefault();
        for(let inputKey in state.validators[Id].inputs) {
            state.validators[Id].inputs[inputKey].changed = true;
        }
        setState(Object.assign({}, state));
    };

    let elHelper = 0;

    const prepare = (el, index) => {
        if(null == el) {
            return;
        }
        if(-1 !== ['function', 'object'].indexOf(typeof el.type) && -1 !== Object.keys(Index).indexOf(el.type.name)) {
            if(Input.prototype === el.type.prototype && undefined === state.validators[Id].inputs[el.props.id]) {
                state.validators[Id].inputs[el.props.id] = {changed: false, rules: [], value: ''};
            }
            if(undefined !== el.props.rule) {
                if(undefined !== el.props.for) {
                    let result = el.props.rule(state.validators[Id].inputs[el.props.for].value, el.props);
                    state.validators[Id].inputs[el.props.for].rules[el.type.name] = result;
                    state.validators[Id].results.push(result);
                } else {
                    state.validators[Id].results.push(el.props.rule(el.props.value, el.props));
                }
            }
        } else if(undefined !== el.props && undefined !== el.props.children) {
            for(let i = 0; i < el.props.children.length; i++) {
                prepare(el.props.children[i], index);
            }
        }
    };
    const render = (el, index) => {
        if(null == el || 'string' === typeof el) {
            return el;
        } else if(-1 !== Object.keys(Index).indexOf(el.type.name)) {
            if(Input.prototype === el.type.prototype) {
                return <el.type key={index}
                                rfivOnChange={onInputChange}
                                rfivShowErr={-1 !== Object.values(state.validators[Id].inputs[el.props.id].rules).indexOf(false) && state.validators[Id].inputs[el.props.id].changed}
                                {...el.props}>
                    {el.props.children}
                </el.type>;
            } else if(Submit.prototype === el.type.prototype) {
                return <el.type key={index}
                                rfivFormResult={-1 === state.validators[Id].results.indexOf(false)}
                                rfivOnClick={onSubmitClick}
                                {...el.props}>
                    {el.props.children}
                </el.type>;
            }
            return <el.type key={index}
                            rfivShowErr={!state.validators[Id].results[elHelper++] && (undefined === el.props.for || state.validators[Id].inputs[el.props.for].changed)}
                            {...el.props}>
                {el.props.children}
            </el.type>;
        } else if(undefined !== el.props && undefined !== el.props.children) {
            if('string' === typeof el.props.children) {
                return el.props.children;
            } else if(undefined !== el.props.children.length) {
                let output = [];
                for (let i = 0; i < el.props.children.length; i++) {
                    output.push(render(el.props.children[i], index + '-' + i));
                }
                return <el.type key={index}{...el.props}>{output}</el.type>;
            } else {
                return <el.type key={index}{...el.props}>{render(el.props.children, index + '-' + 0)}</el.type>;
            }
        }
        return <React.Fragment key={index}>{el}</React.Fragment>;
    };

    React.Children.map(Children, prepare);
    const children = React.Children.map(Children, render);
    if(undefined !== As) {
        return <As id={Id} {...otherProps}>{children}</As>;
    }
    return IncludeForm ? <form id={Id} {...otherProps}>{children}</form> : children;
}
Index.propTypes = {
    as: PropTypes.elementType,
    id: PropTypes.string.isRequired,
    includeForm: PropTypes.bool
};
Index.defaultProps = {
    includeForm: true
};

Index.Input = Input;
Index.IsAlphanumeric = IsAlphanumeric;
Index.IsEmail = IsEmail;
Index.IsLengthValid = IsLengthValid;
Index.IsNumber = IsNumber;
Index.IsRegexValid = IsRegexValid;
Index.IsRequired = IsRequired;
Index.IsValueValid = IsValueValid;
Index.Submit = Submit;

export default Index;
