// Interfaces
import RuleInterface from "../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v, k, f) 	=> f[`${k}_confirmation`] && f[`${k}_confirmation`] === v,
	onError		: (v, k, f) 	=> {
		if (!f[`${k}_confirmation`]) {
			return `${k} field is not confirmed`;
		}
		if (f[`${k}_confirmation`] !== v) {
			return `${k} field confirmation does not match`;
		}
	},
} as RuleInterface;

export default rule;