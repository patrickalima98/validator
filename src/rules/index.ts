// Interfaces
import RuleInterface from "../interfaces/rule.ts";

// Rules
import arrayRule 		from "./array/index.ts";
import confirmedRule 	from "./array/index.ts";
import emailRule 		from "./array/index.ts";
import objectRule 		from "./array/index.ts";
import requiredRule 	from "./array/index.ts";

// list
let ruleList: Record<string, RuleInterface> = {
	"array"		: arrayRule,
	"confirmed"	: confirmedRule,
	"email"		: emailRule,
	"object"	: objectRule,
	"required"	: requiredRule,
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