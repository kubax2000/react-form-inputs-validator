import PropTypes from 'prop-types';
import {RulesTable} from '../rules.js';
import React from 'react';

const IsRequired = ({children: Children, for: For, includeDiv: IncludeDiv, rfivShowErr: RfivShowErr, rule, value, visible: Visible, ...otherProps}) => {
    if(undefined !== Visible) {
        return Visible ? (IncludeDiv ? <div {...otherProps}>{Children}</div> : Children) : <></>;
    }
    return RfivShowErr ? (IncludeDiv ? <div {...otherProps}>{Children}</div> : Children) : <></>;
};
if (process.env.NODE_ENV !== "production") {
    IsRequired.propTypes = {
        className: PropTypes.string,
        for: PropTypes.string,
        includeDiv: PropTypes.bool,
        rule: PropTypes.func,
        value: PropTypes.string,
        visible: PropTypes.bool
    };
}
IsRequired.defaultProps = {
    className: 'rfiv-error',
    includeDiv: true,
    rule: RulesTable.isRequired
};
export default IsRequired;
