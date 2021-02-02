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
			field: ["confirmed"]
		};
	}

	public get rules () {
		return {
			confirmed: rule,
		};
	}
}

test.group("Confirmation rule tests", () => {
	// -------------------------------------------------
	// Validator tests
	// -------------------------------------------------

	test("Get rule from validator", (expect) => {
		const validator = new TestValidator({field: 1});
		const required 	= validator.rules.confirmed;

		expect(required).toBeDefined();
		expect(required.onError).toBeDefined();
		expect(required.onValidate).toBeDefined();
	});

	// -------------------------------------------------
	// Validator rule tests
	// -------------------------------------------------

	test("Test success rule through validator", (expect) => {
		const validator = new TestValidator({field: "test", field_confirmation: "test"});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBe(["one", "two"]);
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBeUndefined();
	});

	test("Test fail rule through validator", (expect) => {
		const validator = new TestValidator({field: "not.confirmed"});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBeUndefined();
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBe(["field field is not confirmed"]);
	});

	// -------------------------------------------------
	// Direct rule tests
	// -------------------------------------------------

	test("Test success rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("test", "field", {field: "test", field_confirmation: "test"});

		expect(result).toBe(true);
	});

	test("Test fail rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("not.confirmed", "field", {field: "test", field_confirmation: "testhi"});

		expect(result).toBe(false);
	});

	test("Test fail rule message directly", (expect) => {
		const result = rule.onError && rule.onError("not.confirmed", "field", {});

		expect(result).toBe("field field is not confirmed");
	});
}).tag(["validator"]);
