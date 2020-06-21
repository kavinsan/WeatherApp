import React from "react";
import { shallow } from "enzyme";
import InfoLabel from "./index.js";

it("InfoLabel should render with title and value", () => {
  const title = "Humidity";
  const value = "10";

  const wrapper = shallow(<InfoLabel title={title} value={value} />);

  expect(wrapper.text().includes(title)).toBe(true);
  expect(wrapper.text().includes(value)).toBe(true);

  expect(wrapper.text().includes("random")).toBe(false);
  expect(wrapper.text().includes("11")).toBe(false);
});