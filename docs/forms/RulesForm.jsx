import React from "react";
import useValidator from "../../src/index.js";

export default function RulesForm() {
    const { inputs, Validator } = useValidator({
        IsEmail: "",
        IsEqual: "",
        IsInRange: "",
        IsValid: "",
        IsMomentValid: "",
        IsNumber: "",
        IsLengthValid: "",
        Required: "",
    });

    const handleFormSubmit = () => {
        alert(JSON.stringify(inputs));
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="isEmail">IsEmail</label>
                <input className="form-control" {...Validator.importInput("IsEmail")} />
                <Validator.IsEmail for="IsEmail">This field must be email.</Validator.IsEmail>
            </div>
            <div className="col-md-6">
                <label htmlFor="isEqual">IsEqual</label>
                <input className="form-control" {...Validator.importInput("IsEqual")} />
                <Validator.IsEqual for="IsEqual" value="term">
                    This field must be equal "term".
                </Validator.IsEqual>
            </div>
            <div className="col-md-6">
                <label htmlFor="isInRange">IsInRange</label>
                <input className="form-control" {...Validator.importInput("IsInRange")} />
                <Validator.IsInRange for="IsInRange" range={[18, 99]}>
                    This field must be in range. (18-99)
                </Validator.IsInRange>
            </div>
            <div className="col-md-6">
                <label htmlFor="isLengthValid">IsLengthValid</label>
                <input className="form-control" {...Validator.importInput("IsLengthValid")} />
                <Validator.IsLengthValid for="IsLengthValid" length={[6, 50]}>
                    This field must have 6-50 characters.
                </Validator.IsLengthValid>
            </div>
            <div className="col-md-6">
                <label htmlFor="isMomentValid">IsMomentValid</label>
                <input className="form-control" {...Validator.importInput("IsMomentValid")} />
                <Validator.IsMomentValid for="IsMomentValid">
                    This field does not contain valid moment object.
                </Validator.IsMomentValid>
            </div>
            <div className="col-md-6">
                <label htmlFor="isNumber">IsNumber</label>
                <input className="form-control" {...Validator.importInput("IsNumber")} />
                <Validator.IsNumber for="IsNumber">This field must be number.</Validator.IsNumber>
            </div>
            <div className="col-md-6">
                <label htmlFor="isValid">IsValid - /^:\)$/</label>
                <input className="form-control" {...Validator.importInput("IsValid")} />
                <Validator.IsValid for="IsValid" rule={/^:\)$/}>
                    This field must be valid by regular expression. /^:\)$/
                </Validator.IsValid>
            </div>
            <div className="col-md-6">
                <label htmlFor="required">Required</label>
                <input className="form-control" {...Validator.importInput("Required")} />
                <Validator.Required for="Required">This field is required.</Validator.Required>
            </div>
            <div className="col-md-12" style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    type="button"
                    className="btn btn-success"
                    {...Validator.importSubmit({ onSuccess: handleFormSubmit })}>
                    Submit
                </button>
            </div>
        </div>
    );
}
