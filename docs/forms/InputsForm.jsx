import DatePicker from "react-datetime";
import React from "react";
import useValidator from "../../src/index.js";

export default function InputsForm() {
    const { inputs, Validator } = useValidator({
        Checkbox: false,
        DatePicker: null,
        Input: "",
        Radio: "Value2",
    });

    const handleFormSubmit = () => {
        alert(JSON.stringify(inputs));
    };

    return (
        <div className="row">
            <div className="card col-md-6">
                <div className="card-body">
                    <h5 className="card-title">Checkbox</h5>
                    <div>
                        <input type="checkbox" {...Validator.importCheckbox("Checkbox")} />
                        <label htmlFor="checkbox">Checkbox</label>
                    </div>
                    <Validator.Required for="Checkbox">This field must be checked.</Validator.Required>
                </div>
            </div>
            <div className="card col-md-6">
                <div className="card-body">
                    <h5 className="card-title">DatePicker</h5>
                    <DatePicker
                        renderInput={(props) => <input {...props} />}
                        {...Validator.importDatePicker("DatePicker", { timeFormat: false })}
                    />
                    <Validator.IsMomentValid for="DatePicker">
                        Field does not contain valid moment object.
                    </Validator.IsMomentValid>
                </div>
            </div>
            <div className="card col-md-6">
                <div className="card-body">
                    <h5 className="card-title">Input</h5>
                    <input className="form-control" {...Validator.importInput("Input")} />
                </div>
            </div>
            <div className="card col-md-6">
                <div className="card-body">
                    <h5 className="card-title">Radio</h5>
                    <div>
                        <input type="radio" {...Validator.importRadio("Radio", "Value1")} />
                        <label htmlFor="radio">Radio - Value1</label>
                    </div>
                    <div>
                        <input type="radio" {...Validator.importRadio("Radio", "Value2")} />
                        <label htmlFor="radio">Radio - Value2</label>
                    </div>
                    <div>
                        <input type="radio" {...Validator.importRadio("Radio", "Value3")} />
                        <label htmlFor="radio">Radio - Value3</label>
                    </div>
                    <Validator.IsEqual for="Radio" value="Value3">
                        This field must be equal "Value3".
                    </Validator.IsEqual>
                </div>
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
