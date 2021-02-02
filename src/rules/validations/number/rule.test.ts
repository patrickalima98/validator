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
			field: ["number"]
		};
	}

	public get rules () {
		return {
			number: rule,
		};
	}
}

test.group("Number rule tests", () => {
	// -------------------------------------------------
	// Validator tests
	// -------------------------------------------------

	test("Get rule from validator", (expect) => {
		const validator = new TestValidator({field: 1});
		const required 	= validator.rules.number;

		expect(required).toBeDefined();
		expect(required.onError).toBeDefined();
		expect(required.onValidate).toBeDefined();
	});

	// -------------------------------------------------
	// Validator rule tests
	// -------------------------------------------------

	test("Test success rule through validator", (expect) => {
		const validator = new TestValidator({field: 4});

		expect(validator.errors).toBeUndefined();
		expect(validator.validated.field).toBe(4);
	});

	test("Test fail rule through validator (non strict)", (expect) => {
		const validator = new TestValidator({field: "hi"});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBeUndefined();
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBe(["field field is not a number"]);
	});

	// -------------------------------------------------
	// Direct rule tests
	// -------------------------------------------------

	test("Test success rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate(2, "field", {});

		expect(result).toBe(true);
	});

	test("Test fail rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("number", "field", {});

		expect(result).toBe(false);
	});

	test("Test fail rule message directly", (expect) => {
		const result = rule.onError && rule.onError("number", "field", {});

		expect(result).toBe("field field is not a number");
	});
}).tag(["rule", "number"]);
