import * as React from "react";

import Spinner from "../Spinner";
import Container from "../Container";
import styled, { Color } from "../../util/style/theme";

interface TextInputProps {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: Color;
  isLoading?: boolean;
}

const TextInput: React.StatelessComponent<TextInputProps> = ({
  value,
  className,
  onChange,
  isLoading
}: TextInputProps) => (
  <Container position="relative" maxWidth="300px">
    {isLoading && (
      <Container position="absolute" top="10px" right="0px">
        <Spinner scale={2} />
      </Container>
    )}
    <input
      type="text"
      value={value}
      className={className}
      onChange={onChange}
    />
  </Container>
);

TextInput.defaultProps = {
  borderColor: Color.blue,
  isLoading: false
};

export default styled(TextInput)`
  border: 1px solid ${props => props.borderColor};
  display: inline-block;
  border-radius: 3px;
  font-size: 1rem;
  height: 2.25em;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  vertical-align: top;
  background-color: white;
  color: ${Color.darkGrey};
  width: 100%;
`;
