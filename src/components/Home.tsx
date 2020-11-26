import * as React from "react";
import classnames from "classnames";

import styles from "./Home.module.css";

export const Home: React.FC = () => (
	<div className={classnames("Home", styles.Home)}>
		<p>
			Edit <code>Home.tsx</code> and save to reload.
		</p>
	</div>
);

export default Home;
