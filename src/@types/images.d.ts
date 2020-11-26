declare module "*.jpg" {
	const image: unknown;
	export default image;
}

declare module "*.jpeg" {
	const image: unknown;
	export default image;
}

declare module "*.png" {
	const image: unknown;
	export default image;
}

declare module "*.gif" {
	const image: unknown;
	export default image;
}

declare module "*.ico" {
	const image: unknown;
	export default image;
}

declare module "*.webp" {
	const image: unknown;
	export default image;
}

type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;

declare module "*.svg" {
	export const ReactComponent: SvgrComponent;
	const url: string;
	export default url;
}
