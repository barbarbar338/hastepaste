import * as React from "react";
import { render } from "enzyme";

import IndexPage from "../pages/index";

describe("Suite", () => {
	it("renders", () => {
		const wrapper = render(<IndexPage />);
		expect(wrapper.text()).toContain("Edit Home.tsx and save to reload");
	});
});
