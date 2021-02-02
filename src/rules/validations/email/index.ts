// Interfaces
import RuleInterface from "../../../interfaces/rule.ts";

const rule = {
	// callbacks
	onValidate	: (v) 		=> !!((typeof v === "string") && (v as string).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
	onError		: (_, k) 	=> `${k} field is not an email`,
} as RuleInterface;

export default rule;