// Interfaces
import RuleInterface from "../../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v, _, _1, a) => {
		if (a && a.length > 0 && a[0] === "strict")
			return typeof v === "number";

		return typeof v === "number" || (typeof v === "string" && !v.match(/\D+/));
	},
	onError		: (_, k) => `${k} field is not a number`,
} as RuleInterface;

export default rule;