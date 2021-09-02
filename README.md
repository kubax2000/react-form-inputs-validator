# react-form-inputs-validator

React library for easy form validation.

[![npm package][npm-image]][npm-url]
[![Package Size][bundlephobia-image]][bundlephobia-url]

##Install

```
npm install react-form-inputs-validator --save-dev
```

## Demo 

<a href="https://kubax2000.github.io/react-form-inputs-validator/" target="_blank" title="bootstrap-toasts-js">https://kubax2000.github.io/react-form-inputs-validator/</a>

## Usage

```jsx
import React from 'react';
import useValidator from 'react-form-inputs-validator';

function SignInForm() {
    const { inputs, Validator } = useValidator({
        Email: "",
        Password: "",
    });

    const handleFormSubmit = () => {
        alert(JSON.stringify(inputs));
    };

    return (
        <div>
            <input {...Validator.importInput("Email")} />
            <Validator.Required for="Email">This field is required.</Validator.Required>
            <Validator.IsEmail for="Email">This field must be email.</Validator.IsEmail>
            <input {...Validator.importInput("Password")} />
            <Validator.Required for="Password">This field is required.</Validator.Required>
            <input
                type="submit"
                value="Sign In"
                {...Validator.importSubmit({ onSuccess: handleFormSubmit })}
            />
        </div>
    );
}
export default SignInForm;
```

[npm-image]:https://img.shields.io/npm/v/react-form-inputs-validator.svg
[npm-url]:https://www.npmjs.com/package/react-form-inputs-validator
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-form-inputs-validator
[bundlephobia-url]:https://bundlephobia.com/result?p=react-form-inputs-validator
