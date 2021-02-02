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
			field: ["object"]
		};
	}

	public get rules () {
		return {
			object: rule,
		};
	}
}

test.group("Object rule tests", () => {
	// -------------------------------------------------
	// Validator tests
	// -------------------------------------------------

	test("Get rule from validator", (expect) => {
		const validator = new TestValidator({field: 1});
		const required 	= validator.rules.object;

		expect(required).toBeDefined();
		expect(required.onError).toBeDefined();
		expect(required.onValidate).toBeDefined();
	});

	// -------------------------------------------------
	// Validator rule tests
	// -------------------------------------------------

	test("Test success rule through validator", (expect) => {
		const validator = new TestValidator({field: {first: true}});

		expect(validator.errors).toBeUndefined();
		expect(validator.validated.field).toBe({first: true});
	});

	test("Test fail rule through validator", (expect) => {
		const validator = new TestValidator({field: "not.an.object"});

		expect(validator.errors).toBeDefined();
		expect(validator.validated.field).toBeUndefined();
		expect((validator.errors as {errors: Record<string, string[]>}).errors.field).toBe(["field field is not an object"]);
	});

	// -------------------------------------------------
	// Direct rule tests
	// -------------------------------------------------

	test("Test success rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate({first: true}, "field", {});

		expect(result).toBe(true);
	});

	test("Test fail rule directly", (expect) => {
		const result = rule.onValidate && rule.onValidate("not.an.object", "field", {});

		expect(result).toBe(false);
	});

	test("Test fail rule message directly", (expect) => {
		const result = rule.onError && rule.onError("not.an.object", "field", {});

		expect(result).toBe("field field is not an object");
	});
}).tag(["rule", "object"]);
