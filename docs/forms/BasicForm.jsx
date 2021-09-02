import React from "react";
import useValidator from "../../src/index.js";

export default function BasicForm() {
    const { inputs, Validator } = useValidator({
        age: 0,
        email: "",
        name: "",
        password: "",
    });

    const handleFormSubmit = () => {
        alert(JSON.stringify(inputs));
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="name">Name</label>
                <input className="form-control" {...Validator.importInput("name")} />
                <Validator.Required for="name">Name is required.</Validator.Required>
            </div>
            <div className="col-md-6">
                <label htmlFor="age">Age</label>
                <input className="form-control" {...Validator.importInput("age")} />
                <Validator.IsNumber for="age">Age must be number.</Validator.IsNumber>
                <Validator.IsInRange for="age" range={[18, 99]}>
                    Age must in range. (18-99)
                </Validator.IsInRange>
            </div>
            <div className="col-md-6">
                <label htmlFor="email">Email</label>
                <input className="form-control" {...Validator.importInput("email")} />
                <Validator.Required for="email">Email is required.</Validator.Required>
                <Validator.IsEmail for="email">Email must be email. :)</Validator.IsEmail>
            </div>
            <div className="col-md-6">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" {...Validator.importInput("password")} />
                <Validator.Required for="password">Password is required.</Validator.Required>
                <Validator.IsLengthValid for="password" length={[6, 50]}>
                    Password must have 6-50 characters.
                </Validator.IsLengthValid>
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
