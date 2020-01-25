# react-form-inputs-validator
React library for easy form validation.

##Install

```
npm install react-form-inputs-validator --save-dev
```

## Demo 

<a href="https://kubax2000.github.io/react-form-inputs-validator/" target="_blank" title="bootstrap-toasts-js">https://kubax2000.github.io/react-form-inputs-validator/</a>

## Usage

```
<Validator id={'SignInForm'}>
    <Validator.Input id={'email'} type={'text'} />
    <Validator.IsRequired for={'email'}>This field is required.</Validator.IsEmail>
    <Validator.IsEmail for={'email'}>This field must be email.</Validator.IsEmail>
    <Validator.Input id={'password'} type={'password'} />
    <Validator.IsRequired for={'password'}>This field is required.</Validator.IsEmail>
    <Validator.Submit onClick={() => {console.log('Success');}}>Sign In</Validator.IsEmail>
</Validator>
```
