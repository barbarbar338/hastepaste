declare module "*.yaml" {
	const yaml: { [prop: string]: string | string[] };
	export default yaml;
}

declare module "*.yml" {
	const yaml: { [prop: string]: string | string[] };
	export default yaml;
}
