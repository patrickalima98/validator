// Interfaces
import RuleInterface from "../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) 		=> Array.isArray(v),
	onError		: (_, k) 	=> `${k} field is not an array`,
} as RuleInterface;

export default rule;