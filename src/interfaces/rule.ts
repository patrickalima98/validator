export default interface RuleInterface {
	/** Validation to check if value should pass */
	onValidate	? (value: unknown, key: string, fields: Record<string, unknown>, args?: string[]): boolean;
	/** Message to be returned in case of validation error */
	onError		? (value: unknown, key: string, fields: Record<string, unknown>, args?: string[]): string | string[];
	/** Formats the validated field, runs after validation rule */
	onMask		? (value: unknown, key: string, fields: Record<string, unknown>, args?: string[]): unknown;
}