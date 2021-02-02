// Packages
import test from "test/mod.ts";

// Modules
import Validator from "../../modules/validator.ts";

// Rules
import rule from "./index.ts";

// concrete validator class
class TestValidator extends Validator {
	protected getSchema() {
		return {
			field: ["required"]
		};
	}

	public get rules () {
		return {
			required: rule,
		};
	}
}

test.group("Required rule tests", () => {
	// -------------------------------------------------
	// Validator tests
	// -------------------------------------------------

	test("Get rule from validator", (expect) => {
		const validator = new TestValidator({field: 1});
		const required 	= validator.rules.required;

		expect(required).toBeDefined();
		expect(required.onError).toBeDefined();
		expect(required.onValidate).toBeDefined();
	});

	// -------------------------------------------------
	// Validator rule tests
	// -------------------------------------------------

	test("Test success rule through validator", (expect) => {
		const validator = new TestValidator({field: 1});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBe(1);
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBeUndefined();
	});

	test("Test fail rule through validator", (expect) => {
		const validator = new TestValidator({field: undefined});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBeUndefined();
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBe(["field field is required"]);
	});

	// -------------------------------------------------
	// Direct rule tests
	// -------------------------------------------------

	test("Test success rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("true", "field", {});

		expect(result).toBe(true);
	});

	test("Test fail rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate(undefined, "field", {});

		expect(result).toBe(false);
	});

	test("Test fail rule message directly", (expect) => {
		const result = rule.onError && rule.onError(undefined, "field", {});

		expect(result).toBe("field field is required");
	});
}).tag(["validator"]);
