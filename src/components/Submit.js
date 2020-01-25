import PropTypes from 'prop-types';
import React from 'react';

const Submit = ({as: As, children: Children, onSubmit: OnSubmit, rfivFormResult: RfivFormResult, rfivOnClick: RfivOnClick, ...otherProps}) => {
    otherProps.onClick = RfivFormResult ? OnSubmit : RfivOnClick;
    if(undefined !== As) {
        return <As {...otherProps}/>;
    }
    if(undefined !== Children) {
        return <button {...otherProps}>{Children}</button>;
    }
    return <input type={'submit'} {...otherProps}/>;
};
if (process.env.NODE_ENV !== "production") {
    Submit.propTypes = {
        as: PropTypes.elementType,
        onSubmit: PropTypes.func,
        value: PropTypes.string
    };
}
Submit.defaultProps = {
    className: 'rfiv-submit',
    value: ''
};
export default Submit;