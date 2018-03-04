import * as React from "react";

import TextInput from "../TextInput";
import AsyncComponent from "../AsyncComponent";
import Container from "../Container";

interface TokenBalanceInputProps {
  takerTokenAddress: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidAddress: (address: string) => void;
  getBalance: (contractAddress: string, address: string) => Promise<number>;
  reverseENSLookup: (address: string) => Promise<string>;
  resolveENS: (canonicalName: string) => Promise<string>;
}

interface TokenBalanceInputState {
  address: string;
  isLoading: boolean;
}

class TokenBalanceInput extends React.Component<
  TokenBalanceInputProps,
  TokenBalanceInputState
> {
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    address: "",
    isLoading: false
  };

  setLoadingState = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  updateBalance = () => {
    const { address } = this.state;
    if (address && !this.props.isValidAddress(address)) {
      throw new Error("Invalid ETH address");
    }
    return this.props.getBalance(this.props.takerTokenAddress, address);
  };

  updateENSCanonicalName = () => {
    return this.props.reverseENSLookup(this.state.address);
  };

  updateENSAddress = () => {
    return this.props.resolveENS(this.state.address);
  };

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const address = (e.target as any).value;
    onChange(e);
    this.setState({ address });
  };

  renderBalance = (balance: number) =>
    this.state.address && <Container>The balance is {balance}</Container>;
  renderENSAddress = (address: string) =>
    address && <Container>The ENS address is {address}</Container>;
  renderENSCanonicalName = (name: string) =>
    name && <Container>The ENS canonical name is {name}</Container>;

  render() {
    const { address, isLoading } = this.state;
    const { takerTokenAddress } = this.props;
    return (
      <Container>
        <Container marginBottom="5px">
          <TextInput isLoading={isLoading} onChange={this.handleTextChange} />
        </Container>
        <AsyncComponent
          promiseIdentifier={`${takerTokenAddress}${address}`}
          promiseGenerator={this.updateBalance}
          renderSuccess={this.renderBalance}
          onLoadStatusChange={this.setLoadingState}
        />
        <AsyncComponent
          promiseIdentifier={address}
          promiseGenerator={this.updateENSAddress}
          renderSuccess={this.renderENSAddress}
          onLoadStatusChange={this.setLoadingState}
        />
        <AsyncComponent
          promiseIdentifier={address}
          promiseGenerator={this.updateENSCanonicalName}
          renderSuccess={this.renderENSCanonicalName}
          onLoadStatusChange={this.setLoadingState}
        />
      </Container>
    );
  }
}

export default TokenBalanceInput;
