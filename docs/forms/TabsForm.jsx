import React from "react";
import useValidator from "../../src/index.js";

export default function TabsForm() {
    const { inputs, tab, setTab, Validator } = useValidator(
        {
            email: { Email: "" },
            name: { Name: "" },
        },
        "name"
    );

    const handleFormSubmit = () => {
        alert(JSON.stringify(inputs));
    };
    const handleTabButtonClick = (event) => {
        setTab(event.currentTarget.dataset.target);
    };

    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={"nav-link " + ("name" === tab && "active")}
                        data-target="name"
                        onClick={handleTabButtonClick}>
                        Name
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={"nav-link " + ("email" === tab && "active")}
                        data-target="email"
                        onClick={handleTabButtonClick}>
                        Email
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={"tab-pane fade " + ("name" === tab && "show active")}>
                    <label htmlFor="name">Name</label>
                    <input className="form-control" {...Validator.importInput("Name")} />
                    <Validator.Required for="Name">This field is required.</Validator.Required>
                </div>
                <div className={"tab-pane fade " + ("email" === tab && "show active")}>
                    <label htmlFor="email">Email</label>
                    <input className="form-control" {...Validator.importInput("Email")} />
                    <Validator.Required for="Email">This field is required.</Validator.Required>
                    <Validator.IsEmail for="Email">This field must be email.</Validator.IsEmail>
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
        </>
    );
}
