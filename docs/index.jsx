import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Validator from "../lib/validator.jsx";

export function ExampleComponent() {
    const [state, setState] = useState({
        email: ''
    });

    const handleInputChange = (event) => {
        state[event.target.name] = event.target.value;
        setState(Object.assign({}, state));
    };

    return (
        <div>
            <Validator id={'example-1'}>
                <div>Test 1</div>
                <input name={'email'} onChange={handleInputChange} type={'text'} value={state.email} />
                <Validator.IsRequired value={state.email}>IsRequired</Validator.IsRequired>
                <Validator.IsEmail value={state.email}>IsEmail</Validator.IsEmail>
                <Validator.Submit onSubmit={() => {console.log('nice');}} value={'Submit'}/>
            </Validator>
        </div>
    );
}
ReactDOM.render(<ExampleComponent />, document.getElementById('App'));