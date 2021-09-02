# [1.0.2](https://github.com/kubax2000/react-form-inputs-validator/releases/tag/v1.0.2) (2021-09-02)

## CHANGES
* **CHANGELOG.md:** added

## Features
* **hasError:** added access to inner errors
* **hasVisibleError:** added access to inner errors

# [1.0.0](https://github.com/kubax2000/react-form-inputs-validator/releases/tag/v1.0.0) (2021-09-02)

## BREAKING CHANGES :boom:
* Removed tags
  * Removed `<Validator>` tag - use `useValidator()` hook instead
  * Removed `<Validator.Input>` tag - use `<input {...Validator.importInput('Name')}/>` instead
  * Removed `<Validator.IsAlphanumeric>` tag - use `<Validator.IsValid rule={/^[A-Za-z0-9]+$/}>` instead
  * Removed `<Validator.Submit>` tag - use `<input type="submit" {...Validator.importSubmit({onSuccess: () => {}})}/>` instead
* Renamed tags
  * Renamed `<Validator.IsRegexValid>` to `<Validator.IsValid>`
  * Renamed `<Validator.IsRequired>` to `<Validator.Required>`
  * Renamed `<Validator.IsValueValid>` to `<Validator.IsInRange>`
  
## Features
### Input types
* **importCheckbox:** input type checkbox support
* **importDatePicker:** moment object input support (from [moment.js](https://github.com/moment/moment))
* **importRadio:** input type radio support

### Rules
* **IsMomentValid:** moment object valid check