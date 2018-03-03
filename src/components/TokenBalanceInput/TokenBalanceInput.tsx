import * as React from "react";

import TextInput from "../TextInput";

interface TokenBalanceInputProps {
  takerToken: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class TokenBalanceInput extends React.Component<TokenBalanceInputProps> {
  render() {
    return <TextInput isLoading={true} />;
  }
}

export default TokenBalanceInput;
