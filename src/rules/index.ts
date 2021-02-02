// Interfaces
import RuleInterface from "../interfaces/rule.ts";

// Validation ules
import arrayRule 		from "./validations/array/index.ts";
import confirmedRule 	from "./validations/confirmed/index.ts";
import emailRule 		from "./validations/email/index.ts";
import objectRule 		from "./validations/object/index.ts";
import requiredRule 	from "./validations/required/index.ts";
import stringRule 		from "./validations/string/index.ts";

// list
let ruleList: Record<string, RuleInterface> = {
	"array"		: arrayRule,
	"confirmed"	: confirmedRule,
	"email"		: emailRule,
	"object"	: objectRule,
	"required"	: requiredRule,
	"string"	: stringRule,
};

// methods
export function setRule(name: string, rule: RuleInterface) {
	ruleList[name] = rule;
}

export function setRules(rules: Record<string, RuleInterface>) {
	Object.keys(rules).forEach(name => {
		ruleList[name] = rules[name];
	});
}

export function clearRules() {
	ruleList = {};
}

// default
export default () => ruleList;