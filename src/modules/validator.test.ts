// Packages
import test from "test/mod.ts";

// Modules
import Validator from "./validator.ts";

// concrete validator class
class TestValidator extends Validator {
	protected getSchema() {
		return {
			field: [],
		};
	}
}

test.group("Validator tests", () => {
	test("Validator instancing", (expect) => {
		const validator = new TestValidator({field:1});

		expect(validator).toBeDefined();
		expect(validator.fields).toBeDefined().toBe({field:1});
	});

	test("Validator delivers only validated fields", (expect) => {
		const validator = new TestValidator({field:1, test: 2});

		expect(validator.validated).toBeDefined();
		expect(validator.validated.field).toBeDefined().toBe(1);
		expect(validator.validated.test).toBeUndefined();
	});
}).tag(["validator"]);
