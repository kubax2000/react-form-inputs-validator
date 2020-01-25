import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Validator from "../lib/validator.jsx";

export function ExampleComponent() {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        state[event.target.id] = event.target.value;
        setState(Object.assign({}, state));
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        alert('Form submited!');
    }

    return (
        <div>
            <div className={'card'}>
                <div className={'card-header'}>
                    <h2>Form validation</h2>
                </div>
                <div className={'card-body'}>
                    <Validator id={'get-started'}>
                        <div className={'form-row'}>
                            <div className={'col-md-6'}>
                                <label htmlFor={'name'}>Name</label>
                                <Validator.Input className={'form-control'} id={'name'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsRequired for={'name'}>Name is required.</Validator.IsRequired>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'age'}>Age</label>
                                <Validator.Input className={'form-control'} id={'age'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsNumber for={'age'}>Age must be number.</Validator.IsNumber>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'email'}>Email</label>
                                <Validator.Input className={'form-control'} id={'email'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsRequired for={'email'}>Email is required.</Validator.IsRequired>
                                <Validator.IsEmail for={'email'}>Email must be email. :)</Validator.IsEmail>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'password'}>Password</label>
                                <Validator.Input className={'form-control'} id={'password'} onChange={handleInputChange} type={'password'} />
                                <Validator.IsRequired for={'password'}>Password is required.</Validator.IsRequired>
                                <Validator.IsLengthValid for={'password'} length={[6,50]}>Password must have 6-50 characters.</Validator.IsLengthValid>
                            </div>
                            <div className={'col-md-12'} style={{marginTop: '20px', textAlign: 'center'}}>
                                <Validator.Submit className={'btn btn-success'} onSubmit={handleFormSubmit}>Submit</Validator.Submit>
                            </div>
                        </div>
                    </Validator>
                </div>
            </div>
            <hr />
            <div className={'card'}>
                <div className={'card-header'}>
                    <h2>Validator components</h2>
                </div>
                <div className={'card-body'}>
                    <Validator id={'validator-components'}>
                        <div className={'form-row'}>
                            <div className={'col-md-6'}>
                                <label htmlFor={'isAlphanumeric'}>IsAlphanumeric</label>
                                <Validator.Input className={'form-control'} id={'IsAlphanumeric'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsAlphanumeric for={'IsAlphanumeric'} >This field must be alphanumeric.</Validator.IsAlphanumeric>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsEmail'}>IsEmail</label>
                                <Validator.Input className={'form-control'} id={'IsEmail'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsEmail for={'IsEmail'}>This field must be email.</Validator.IsEmail>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsLengthValid'}>IsLengthValid</label>
                                <Validator.Input className={'form-control'} id={'IsLengthValid'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsLengthValid for={'IsLengthValid'} minLength={6} maxLength={15}>This field must have 6-50 characters.</Validator.IsLengthValid>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsNumber'}>IsNumber</label>
                                <Validator.Input className={'form-control'} id={'IsNumber'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsNumber for={'IsNumber'}>This field must be number.</Validator.IsNumber>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsRegexValid'}>IsRegexValid</label>
                                <Validator.Input className={'form-control'} id={'IsRegexValid'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsRegexValid for={'IsRegexValid'} regex={/(abc){2}/}>This field must contein 3 times "abc".</Validator.IsRegexValid>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsRequired'}>IsRequired</label>
                                <Validator.Input className={'form-control'} id={'IsRequired'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsRequired for={'IsRequired'}>This field is required.</Validator.IsRequired>
                            </div>
                            <div className={'col-md-6'}>
                                <label htmlFor={'IsValueValid'}>IsValueValid</label>
                                <Validator.Input className={'form-control'} id={'IsValueValid'} onChange={handleInputChange} type={'text'} />
                                <Validator.IsValueValid for={'IsValueValid'} min={18} max={100}>This field must have a value between 18 and 100.</Validator.IsValueValid>
                            </div>
                            <div className={'col-md-12'} style={{marginTop: '20px', textAlign: 'center'}}>
                                <Validator.Submit className={'btn btn-success'} onSubmit={handleFormSubmit}>Submit</Validator.Submit>
                            </div>
                        </div>
                    </Validator>
                </div>
            </div>
        </div>
    );
}
ReactDOM.render(<ExampleComponent />, document.getElementById('App'));