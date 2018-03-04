import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TokenBalanceInput } from "../../../src";

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenBalanceInput />", () => {
  it("shallow renders without crashing", () => {
    shallow(<TokenBalanceInput takerTokenAddress="fakeaddress" />);
  });
});
