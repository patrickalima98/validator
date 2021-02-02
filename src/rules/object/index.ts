// Interfaces
import RuleInterface from "../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) 		=> typeof v === "object",
	onError		: (_, k) 	=> `${k} field is not an object`,
} as RuleInterface;

export default rule;