import PropTypes from 'prop-types';
import {RulesTable} from '../rules.js';
import React from 'react';

const IsValueValid = ({children: Children, for: For, includeDiv: IncludeDiv, rfivShowErr: RfivShowErr, rule, value, visible: Visible, ...otherProps}) => {
    if(undefined !== Visible) {
        return Visible ? (IncludeDiv ? <div {...otherProps}>{Children}</div> : Children) : <></>;
    }
    return RfivShowErr ? (IncludeDiv ? <div {...otherProps}>{Children}</div> : Children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    IsValueValid.propTypes = {
        className: PropTypes.string,
        for: PropTypes.string,
        includeDiv: PropTypes.bool,
        max: PropTypes.number,
        min: PropTypes.number,
        rule: PropTypes.func,
        value: PropTypes.string,
        visible: PropTypes.bool
    };
}
IsValueValid.defaultProps = {
    className: 'rfiv-error',
    includeDiv: true,
    rule: RulesTable.isValueValid
};
export default IsValueValid;
