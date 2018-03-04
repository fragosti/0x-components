import * as React from "react";

import Web3, {
  getContract,
  getBalance,
  ERC20TokenContract
} from "../../util/web3";
import TextInput from "../TextInput";
import Container from "../Container";

interface TokenBalanceInputProps {
  takerTokenAddress: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TokenBalanceInputState {
  balance: number;
  address: string;
  isLoading: boolean;
  errorMessage: string;
  tokenContract: ERC20TokenContract;
}

class TokenBalanceInput extends React.Component<
  TokenBalanceInputProps,
  TokenBalanceInputState
> {
  static defaultProps = {
    onChange: () => {}
  };

  constructor(props: TokenBalanceInputProps) {
    super(props);
    this.state = {
      balance: 0,
      address: "",
      isLoading: false,
      tokenContract: null,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.updateContract(this.props.takerTokenAddress);
  }

  componentWillReceiveProps(nextProps: TokenBalanceInputProps) {
    if (nextProps.takerTokenAddress !== this.props.takerTokenAddress) {
      // We need to update the contract instance.
      this.updateContract(nextProps.takerTokenAddress);
    }
  }

  async updateContract(address: string) {
    this.setState({ isLoading: true });
    const tokenContract = await getContract(address);
    this.setState({ tokenContract, isLoading: false });
  }

  async updateBalance(address: string) {
    this.setState({ address, isLoading: true, errorMessage: null });
    const balance = await getBalance(this.state.tokenContract, address);
    this.setState({ balance, isLoading: false });
  }

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const address = (e.target as any).value;
    onChange(e);

    if (Web3.isAddress(address)) {
      this.updateBalance(address);
    } else {
      this.setState({
        address,
        balance: 0,
        errorMessage: address ? "Not a valid ethereum address" : ""
      });
    }
  };

  render() {
    const { balance, address, isLoading, errorMessage } = this.state;
    return (
      <Container>
        <TextInput isLoading={isLoading} onChange={this.handleTextChange} />
        {errorMessage ? (
          <Container marginTop="5px">{errorMessage}</Container>
        ) : (
          <Container marginTop="5px">
            {" "}
            The current balance is: <strong>{balance}</strong>
          </Container>
        )}
      </Container>
    );
  }
}

export default TokenBalanceInput;
