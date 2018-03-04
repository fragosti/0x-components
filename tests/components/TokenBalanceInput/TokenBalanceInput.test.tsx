import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TokenBalanceInput, TextInput } from "../../../src";

Enzyme.configure({ adapter: new Adapter() });

const mockGetBalance = (tokenAddress: string, address: string) =>
  Promise.resolve(0);
const mockReverseENSLookup = (address: string) => Promise.resolve("0xAddress");
const mockResolveENS = (name: string) => Promise.resolve("vitalik.eth");
const mockIsValidAddress = (address: string) => true;

const renderTokenBalanceInput = ({
  onChange = () => {},
  takerTokenAddress = "fake address",
  isValidAddress = mockIsValidAddress,
  getBalance = mockGetBalance,
  reverseENSLookup = mockReverseENSLookup,
  resolveENS = mockResolveENS
} = {}) => (
  <TokenBalanceInput
    onChange={onChange}
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

  it("propagates loading state to TextInput", () => {
    const wrapper = shallow(renderTokenBalanceInput());
    const instance = wrapper.instance() as TokenBalanceInput;
    instance.setLoadingState(true);
    wrapper.update();
    expect(wrapper.find(TextInput).prop("isLoading")).toBe(true);
    instance.setLoadingState(false);
    wrapper.update();
    expect(wrapper.find(TextInput).prop("isLoading")).toBe(false);
  });

  it("throws invalid ETH address error if isValidAddress prop returns false", () => {
    const wrapper = shallow(
      renderTokenBalanceInput({
        isValidAddress: address => address === "real address"
      })
    );
    const instance = wrapper.instance() as TokenBalanceInput;
    instance.handleTextChange({ target: { value: "not real" } } as any);
    wrapper.update();
    expect(instance.updateBalance).toThrowError("Invalid ETH address");
    instance.handleTextChange({ target: { value: "real address" } } as any);
    wrapper.update();
    expect(instance.updateBalance).not.toThrowError();
  });

  it("propagates onChange from input out", () => {
    const spy = jest.fn();
    const wrapper = shallow(
      renderTokenBalanceInput({
        onChange: spy
      })
    );
    const instance = wrapper.instance() as TokenBalanceInput;
    const changeEvent = { target: { value: "text changed" } } as any;
    instance.handleTextChange(changeEvent);
    expect(spy).toHaveBeenCalledWith(changeEvent);
  });
});
