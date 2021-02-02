// Interfaces
import RuleInterface from "../interfaces/rule.ts";

// Rules
import ruleList from "../rules/index.ts";

export default class Validator {
	// -------------------------------------------------
	// Properties
	// -------------------------------------------------

	protected _fields	: Record<string, unknown>;
	protected _validated: Record<string, unknown> 	= {};
	protected _errors	: Record<string, string[]> 	= {};

	// -------------------------------------------------
	// Main methods
	// -------------------------------------------------

	constructor (fields: Record<string, unknown> = {}, automaticValidate = true) {
		this._fields = fields;
		if (automaticValidate) this.validate();
	}

	public static validate(fields?: Record<string, unknown>, extra?: Record<string, string | number | boolean>) {
		const validator =  new this(fields);
		validator.validate(extra);
		return validator;
	}

	public validate(extra?: Record<string, string | number | boolean>) {
		const schema = this.getSchema(extra);

		Object.keys(schema).forEach(fieldName => {
			let passes			= true;
			const fieldValue 	= this._fields[fieldName];
			const rulesApplied 	= Array.isArray(schema[fieldName]) ? (schema[fieldName] as string[]):(schema[fieldName] as string).split(";");

			for (let i = 0; i < rulesApplied.length; i++) {
				const [name, preargs] 	= rulesApplied[i].split(":");
				const args				= (preargs || "").split(",");
				const rule 				= this.rules[name];

				// validation failed
				if (rule.onValidate && !rule.onValidate(fieldValue, fieldName, this._fields, args)) {
					passes = false;
					const error = rule.onError && rule.onError(fieldValue, fieldName, this._fields, args) || `${name} failed validation`;

					// instance it
					if (!this._errors[fieldName]) this._errors[fieldName] = [];

					// push
					if (Array.isArray(error))
						error.forEach(i => this._errors[fieldName].push(i));
					else
						this._errors[fieldName].push(error);
				}
				// validation successful
				else {
					this._validated[fieldName] = rule.onMask ? rule.onMask(fieldValue, fieldName, this._fields, args):fieldValue;
				}
			}

			if (passes && !this._validated[fieldName]) this._validated[fieldName] = fieldValue;
		});
	}

	// -------------------------------------------------
	// Overwritable methods
	// -------------------------------------------------

	protected getSchema (args?: Record<string, string | number | boolean>): Record<string, string | string[]> {
		throw new Error("Schema not implemented");
	}

	protected printErrors () {
		return {
			errors: this._errors,
		}
	}

	// -------------------------------------------------
	// Get methods
	// -------------------------------------------------

	public get rules (): Record<string, RuleInterface> {
		return ruleList();
	}

	public get validated () {
		return this._validated;
	}

	public get errors () {
		return this.printErrors();
	}

	public get fields () {
		return this._fields;
	}
}