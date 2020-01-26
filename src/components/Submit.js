import PropTypes from 'prop-types';
import React from 'react';

const Submit = ({as: As, children: Children, onSubmit: OnSubmit, rfivFormResult: RfivFormResult, rfivOnClick: RfivOnClick, ...otherProps}) => {
    otherProps.onClick = RfivFormResult ? OnSubmit : RfivOnClick;
    if(undefined !== As) {
        return undefined !== Children ? <As {...otherProps}>{Children}</As> : <As {...otherProps}/>;
    }
    return undefined !== Children ? <button {...otherProps}>{Children}</button> : <input type={'submit'} {...otherProps}/>;
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
