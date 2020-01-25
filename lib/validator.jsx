import Input from './components/Input.jsx';
import IsAlphanumeric from './components/IsAlphanumeric.jsx';
import IsEmail from './components/IsEmail.jsx';
import IsLengthValid from './components/IsLengthValid.jsx';
import IsNumber from './components/IsNumber.jsx';
import IsRegexValid from './components/IsRegexValid.jsx';
import IsRequired from './components/IsRequired.jsx';
import IsValueValid from './components/IsValueValid.jsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Submit from './components/Submit.jsx';

function Validator(props) {
    const {children: Children, id: Id, includeForm: IncludeForm, ...otherProps} = props;
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
        if(-1 !== ['function', 'object'].indexOf(typeof el.type) && -1 !== Object.keys(Validator).indexOf(el.type.name)) {
            if("Input" === el.type.name && undefined === state.validators[Id].inputs[el.props.id]) {
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
        if(-1 !== Object.keys(Validator).indexOf(el.type.name)) {
            if("Input" === el.type.name) {
                return <el.type key={index}
                                rfivOnChange={onInputChange}
                                rfivShowErr={-1 !== Object.values(state.validators[Id].inputs[el.props.id].rules).indexOf(false) && state.validators[Id].inputs[el.props.id].changed}
                                {...el.props}>
                    {el.props.children}
                </el.type>;
            } else if("Submit" === el.type.name) {
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
    return (
        IncludeForm ? <form id={Id} {...otherProps}>{children}</form> : children
    );
}
Validator.propTypes = {
    id: PropTypes.string.isRequired,
    includeForm: PropTypes.bool
};
Validator.defaultProps = {
    includeForm: true
};

Validator.Input = Input;
Validator.IsAlphanumeric = IsAlphanumeric;
Validator.IsEmail = IsEmail;
Validator.IsLengthValid = IsLengthValid;
Validator.IsNumber = IsNumber;
Validator.IsRegexValid = IsRegexValid;
Validator.IsRequired = IsRequired;
Validator.IsValueValid = IsValueValid;
Validator.Submit = Submit;

export default Validator;