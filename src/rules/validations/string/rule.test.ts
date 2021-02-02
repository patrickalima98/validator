// Packages
import test from "test/mod.ts";

// Modules
import Validator from "../../../modules/validator.ts";

// Rules
import rule from "./index.ts";

// concrete validator class
class TestValidator extends Validator {
	protected getSchema() {
		return {
			field: ["string"]
		};
	}

	public get rules () {
		return {
			string: rule,
		};
	}
}

test.group("String rule tests", () => {
	// -------------------------------------------------
	// Validator tests
	// -------------------------------------------------

	test("Get rule from validator", (expect) => {
		const validator = new TestValidator({field: 1});
		const required 	= validator.rules.string;

		expect(required).toBeDefined();
		expect(required.onError).toBeDefined();
		expect(required.onValidate).toBeDefined();
	});

	// -------------------------------------------------
	// Validator rule tests
	// -------------------------------------------------

	test("Test success rule through validator", (expect) => {
		const validator = new TestValidator({field: "text"});

		expect(validator.errors).toBeUndefined();
		expect(validator.validated.field).toBe("text");
	});

	test("Test fail rule through validator", (expect) => {
		const validator = new TestValidator({field: []});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBeUndefined();
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBe(["field field is not a string"]);
	});

	// -------------------------------------------------
	// Direct rule tests
	// -------------------------------------------------

	test("Test success rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("text", "field", {});

		expect(result).toBe(true);
	});

	test("Test fail rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate([], "field", {});

		expect(result).toBe(false);
	});

	test("Test fail rule message directly", (expect) => {
		const result = rule.onError && rule.onError([], "field", {});

		expect(result).toBe("field field is not a string");
	});
}).tag(["validator"]);
