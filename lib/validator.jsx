import PropTypes from 'prop-types';
import React, {useState} from 'react';

function Validator(props) {
    const {children: Children, id: Id} = props;
    const [state] = useState({
        validators: {}
    });
    state.validators[Id] = [];

    let elHelper = 0;

    const prepare = (el, index) => {
        if("function" === typeof el.type) {
            if (-1 !== Object.keys(Validator).indexOf(el.type.name)) {
                state.validators[Id].push(el.props.rule(el.props.value) && (undefined === el.props.addRule || el.props.addRule));
            }
        } else if(undefined !== el.props && undefined !== el.props.children) {
            prepare(el.props.children, index);
        }
    };
    const render = (el, index) => {
        if("function" === typeof el.type) {
            if(-1 !== Object.keys(Validator).indexOf(el.type.name)) {
                console.log(state.validators[Id].indexOf(true), state.validators[Id]);
                return <el.type rfivFormResult={-1 === state.validators[Id].indexOf(true)} rfivResult={state.validators[Id][elHelper++] && (undefined === el.props.addDisplayRule || el.props.addDisplayRule)} {...el.props}>{el.props.children}</el.type>;
            }
        } else if(undefined !== el.props && undefined !== el.props.children) {
            return <el.type {...el.props}>{render(el.props.children, index)}</el.type>;
        }
        return el;
    };

    React.Children.map(Children, prepare);
    const children = React.Children.map(Children, render);
    return (
        <form id={Id}>{children}</form>
    );
}
Validator.propTypes = {
    id: PropTypes.string.isRequired
};

/* IsEmail */
const IsEmail = (props) => {
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-error' + (undefined !== props.className ? ' ' + props.className : '')} style={props.style}>{props.children}</div> : props.children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    IsEmail.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
        className: PropTypes.string,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.string.isRequired
    };
}
IsEmail.defaultProps = {
    includeDiv: true,
    rule: value => {
        return undefined !== value && value.length > 0 && false === /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());
    },
    style: {}
};
Validator.IsEmail = IsEmail;
/* IsEmail */

/* IsRequired */
const IsRequired = (props) => {
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-error' + (undefined !== props.className ? ' ' + props.className : '')} style={props.style}>{props.children}</div> : props.children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    IsRequired.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
        className: PropTypes.string,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.string.isRequired
    };
}
IsRequired.defaultProps = {
    includeDiv: true,
    rule: value => {
        return undefined === value || value.length === 0;
    },
    style: {}
};
Validator.IsRequired = IsRequired;
/* IsRequired */

/* Massage */
const Massage = (props) => {
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-' + props.type + (undefined !== props.className ? ' ' + props.className : '')} style={props.style}>{props.children}</div> : props.children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    Massage.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
        className: PropTypes.string,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        style: PropTypes.object,
        type: PropTypes.oneOf(['info','success','warning','error'])
    };
}
Massage.defaultProps = {
    includeDiv: true,
    rule: value => true,
    style: {},
    type: 'error'
};
Validator.Massage = Massage;
/* Massage */

/* Submit */
const Submit = (props) => {
    if(props.rfivFormResult) {
        return <input className={'rfiv-submit'} onClick={props.onSubmit} style={props.style} type={'submit'} value={props.value} />;
    }
    return <input className={'rfiv-submit rfiv-disabled'} disabled={true} style={props.style} type={'submit'} value={props.value} />;
};
if (process.env.NODE_ENV !== "production") {
    Submit.propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.string
    };
}
Submit.defaultProps = {
    rule: value => false,
    style: {},
    value: ''
};
Validator.Submit = Submit;
/* Submit */

/* SubmitButton */
const SubmitButton = (props) => {
    if(props.rfivFormResult) {
        return <button className={'rfiv-button'} onClick={props.onSubmit} style={props.style} type={'submit'}>{props.children}</button>;
    }
    return <button className={'rfiv-button rfiv-disabled'} disabled={true} style={props.style} type={'submit'} value={props.value}>{props.children}</button>;
};
if (process.env.NODE_ENV !== "production") {
    SubmitButton.propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func,
        style: PropTypes.object
    };
}
SubmitButton.defaultProps = {
    rule: value => false,
    style: {}
};
Validator.SubmitButton = SubmitButton;
/* SubmitButton */

export default Validator;