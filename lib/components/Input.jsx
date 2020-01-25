import {callFunctions, joinClass} from '../heplers.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const Input = ({as: As, className: ClassName, id: Id, onChange: OnChange, rfivOnChange: RfivOnChange, rfivShowErr: RfivShowErr, ...otherProps}) => {
    if(undefined !== As) {
        return <As className={joinClass(RfivShowErr ? 'rfiv-error' : '', ClassName)} id={Id} onChange={callFunctions(RfivOnChange, OnChange)} {...otherProps} />;
    }
    return <input className={joinClass(RfivShowErr ? 'rfiv-error' : '', ClassName)} id={Id} onChange={callFunctions(RfivOnChange, OnChange)} {...otherProps} />;
};
if (process.env.NODE_ENV !== "production") {
    Input.propTypes = {
        as: PropTypes.elementType,
        id: PropTypes.string.isRequired,
        style: PropTypes.object
    };
}
Input.defaultProps = {
    className: 'rfiv-submit'
};
export default Input;