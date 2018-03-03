import * as React from "react";

import styled from "../../util/style/theme";

interface TextInputProps {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.StatelessComponent<TextInputProps> = ({
  value,
  className,
  onChange
}: TextInputProps) => (
  <input type="text" value={value} className={className} onChange={onChange} />
);

export default styled(TextInput)`
  border: 1px solid transparent;
  border-radius: 3px;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  max-width: 100%;
  width: 100%;
`;
