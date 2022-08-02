import Image from "next/image";
import { FC } from "react";
import Preloader from "@assets/preloader.gif";

export const Loader: FC = () => (
	<div className="ld">
		<Image
			src={Preloader.src}
			alt="Preloader"
			blurDataURL={Preloader.blurDataURL}
			width={Preloader.width}
			height={Preloader.height}
		/>
	</div>
);
