<p align="center"><img src="https://api.aposoftworks.com/storage/image/ehRdFIz6tqiERXID1SIXAeu0mmTBKLdixIXsNj9s.png" width="256"></p>

# Açai Validator Module

[![Build Status](https://travis-ci.org/AcaiFramework/validator.svg?branch=production)](https://travis-ci.org/AcaiFramework/validator) [![Support](https://img.shields.io/badge/Patreon-Support-orange.svg?logo=Patreon)](https://www.patreon.com/rafaelcorrea)

A customizable validator for the Açaí framework. You can easily add your own rules and extend the capabilities of our validator.

## Usage

``` typescript
import Validator from "https://deno.land/x/acai_validator/";

// first thing we need is to extend the base Validator class
class RegisterValidator extends Validator {
	protected getSchema () {
		return {
			email: [ "required", "email" ],
			password: [ "required", "confirmed" ],
		};
	}
}

// now we get the fields to be validated
const fields = {
	email: "not an email",
	password: "not confirmed password",
}

const validation = new RegisterValidator(fields);
const errors = validation.errors;

// this will be filled if the validation failed
if (errors) {
	console.warn(errors);
}
```

## Custom rules
``` typescript
import { addRule } from "https://deno.land/x/acai_validator/";

addRule("password", {
	/** Validation to check if value should pass */
	onValidate	? (value: unknown, key: string, fields: Record<string, unknown>, args?: string[]) => {
		return /* your validation here */
	}
	/** Message to be returned in case of validation error */
	onError		? (value: unknown, key: string, fields: Record<string, unknown>, args?: string[]) => {
		return `${key} is not a valid password`;
	}
});

```