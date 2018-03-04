import * as React from "react";

import web3, { getBalance } from "../../util/web3";
import { resolver, reverse } from "../../util/web3/ens";
import TextInput from "../TextInput";
import AsyncComponent from "../AsyncComponent";
import Container from "../Container";

interface TokenBalanceInputProps {
  takerTokenAddress: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TokenBalanceInputState {
  address: string;
}

class TokenBalanceInput extends React.Component<
  TokenBalanceInputProps,
  TokenBalanceInputState
> {
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    address: ""
  };

  updateBalance = () => {
    const { address } = this.state;
    if (address && !web3.isAddress(address)) {
      throw new Error("Invalid ETH address");
    }
    return getBalance(this.props.takerTokenAddress, address);
  };

  updateENSCanonicalName = () => {
    return reverse(this.state.address);
  };

  updateENSAddress = () => {
    return resolver(this.state.address);
  };

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const address = (e.target as any).value;
    onChange(e);
    this.setState({ address });
  };

  render() {
    const { address } = this.state;
    const { takerTokenAddress } = this.props;
    return (
      <Container>
        <Container marginBottom="5px">
          <TextInput onChange={this.handleTextChange} />
        </Container>
        <AsyncComponent
          promiseIdentifier={`${takerTokenAddress}${address}`}
          promiseGenerator={this.updateBalance}
        />
        <AsyncComponent
          promiseIdentifier={address}
          promiseGenerator={this.updateENSAddress}
        />
        <AsyncComponent
          promiseIdentifier={address}
          promiseGenerator={this.updateENSCanonicalName}
        />
      </Container>
    );
  }
}

export default TokenBalanceInput;
