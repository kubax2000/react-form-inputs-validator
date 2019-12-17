import PropTypes from 'prop-types';
import React, {useState} from 'react';

function Validator(props) {
    const {children: Children, id: Id} = props;
    const [state] = useState({
        validators: {}
    });
    state.validators[Id] = {};

    const processElement = (el, index) => {
        if("function" === typeof el.type) {
            if(-1 !== Object.keys(Validator).indexOf(el.type.name)) {
                state.validators[Id][index] = el.props.rule(el.props.value) && (undefined === el.props.addRule || el.props.addRule);
                return <el.type rfivResult={state.validators[Id][index] && (undefined === el.props.addDisplayRule || el.props.addDisplayRule)} {...el.props}>{el.props.children}</el.type>;
            }
        } else if(undefined !== el.props && undefined !== el.props.children) {
            return <el.type {...el.props}>{processElement(el.props.children, index)}</el.type>;
        }
        return el;
    };

    const children = React.Children.map(Children, processElement);
    return (
        <form id={Id}>{children}</form>
    );
}
if (process.env.NODE_ENV !== "production") {
    Validator.propTypes = {
        id: PropTypes.string.isRequired
    };
}

/* IsEmail */
const IsEmail = (props) => {
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-error'} style={props.style}>{props.children}</div> : props.children) : (props.displaySuccess ? <div className={'rfiv-success'} style={props.style}>{props.children}</div> : <></>);
};
if (process.env.NODE_ENV !== "production") {
    IsEmail.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
        displaySuccess: PropTypes.bool,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.string.isRequired
    };
}
IsEmail.defaultProps = {
    displaySuccess: false,
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
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-error'} style={props.style}>{props.children}</div> : props.children) : (props.displaySuccess ? (props.includeDiv ? <div className={'rfiv-success'} style={props.style}>{props.children}</div> : props.children) : <></>);
};
if (process.env.NODE_ENV !== "production") {
    IsRequired.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
        displaySuccess: PropTypes.bool,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.string.isRequired
    };
}
IsRequired.defaultProps = {
    displaySuccess: false,
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
    return props.rfivResult ? (props.includeDiv ? <div className={'rfiv-' + props.type} style={props.style}>{props.children}</div> : props.children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    Massage.propTypes = {
        addDisplayRule: PropTypes.bool,
        addRule: PropTypes.bool,
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
/* Massage */
Validator.Massage = Massage;

export default Validator;