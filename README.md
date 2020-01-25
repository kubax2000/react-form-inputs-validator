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
import Validator from 'react-form-inputs-validator';

function SignInForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Success');
    };

    return (
        <Validator id={'SignInForm'}>
            <Validator.Input id={'email'} type={'text'} />
            <Validator.IsRequired for={'email'}>This field is required.</Validator.IsEmail>
            <Validator.IsEmail for={'email'}>This field must be email.</Validator.IsEmail>
            <Validator.Input id={'password'} type={'password'} />
            <Validator.IsRequired for={'password'}>This field is required.</Validator.IsEmail>
            <Validator.Submit onSubmit={handleSubmit}>Sign In</Validator.IsEmail>
        </Validator>
    );
}
export default SignInForm;
```

[npm-image]:https://img.shields.io/npm/v/react-form-inputs-validator.svg
[npm-url]:https://www.npmjs.com/package/react-form-inputs-validator
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-form-inputs-validator
[bundlephobia-url]:https://bundlephobia.com/result?p=react-form-inputs-validator
