// Interfaces
import RuleInterface from "../../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) => !!v,
	onError		: (_, k) => `${k} field is not truthy`,
} as RuleInterface;

export default rule;