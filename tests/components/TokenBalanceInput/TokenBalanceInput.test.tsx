import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TokenBalanceInput } from "../../../src";

Enzyme.configure({ adapter: new Adapter() });

const mockGetBalance = () => Promise.resolve(0);
const mockReverseENSLookup = () => Promise.resolve("0xAddress");
const mockResolveENS = () => Promise.resolve("vitalik.eth");
const mockIsValidAddress = () => true;

const renderTokenBalanceInput = ({
  takerTokenAddress = "fake address",
  isValidAddress = mockIsValidAddress,
  getBalance = mockGetBalance,
  reverseENSLookup = mockReverseENSLookup,
  resolveENS = mockResolveENS
} = {}) => (
  <TokenBalanceInput
    takerTokenAddress={takerTokenAddress}
    isValidAddress={isValidAddress}
    getBalance={getBalance}
    reverseENSLookup={reverseENSLookup}
    resolveENS={resolveENS}
  />
);

describe("<TokenBalanceInput />", () => {
  it("shallow renders without crashing", () => {
    shallow(renderTokenBalanceInput());
  });
});
