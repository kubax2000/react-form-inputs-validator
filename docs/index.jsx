import BasicForm from "./forms/BasicForm.jsx";
import InputsForm from "./forms/InputsForm.jsx";
import React from "react";
import ReactDOM from "react-dom";
import RulesForm from "./forms/RulesForm.jsx";
import TabsForm from "./forms/TabsForm.jsx";

import "react-datetime/css/react-datetime.css";

export function ExampleComponent() {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Basic example</h2>
                </div>
                <div className="card-body">
                    <BasicForm />
                </div>
            </div>
            <hr />
            <div className="card">
                <div className="card-header">
                    <h2>Supported rules</h2>
                </div>
                <div className="card-body">
                    <RulesForm />
                </div>
            </div>
            <hr />
            <div className="card">
                <div className="card-header">
                    <h2>Supported inputs</h2>
                </div>
                <div className="card-body">
                    <InputsForm />
                </div>
            </div>
            <hr />
            <div className="card">
                <div className="card-header">
                    <h2>Tabs support</h2>
                </div>
                <div className="card-body">
                    <TabsForm />
                </div>
            </div>
            <hr />
        </div>
    );
}
ReactDOM.render(<ExampleComponent />, document.getElementById("App"));
