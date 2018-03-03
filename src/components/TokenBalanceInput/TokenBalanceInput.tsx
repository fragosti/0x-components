import * as React from "react";

import TextInput from "../TextInput";

interface TokenBalanceInputProps {
  message: string;
}

const TokenBalanceInput = ({ message }: TokenBalanceInputProps) => (
  <TextInput />
);

export default TokenBalanceInput;
