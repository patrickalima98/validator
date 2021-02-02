// Interfaces
import RuleInterface from "../../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) 		=> typeof v === "string",
	onError		: (_, k) 	=> `${k} field is not a string`,
} as RuleInterface;

export default rule;