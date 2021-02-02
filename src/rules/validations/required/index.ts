// Interfaces
import RuleInterface from "../../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) 		=> !!v,
	onError		: (_, k) 	=> `${k} field is required`,
} as RuleInterface;

export default rule;