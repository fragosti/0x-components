import * as React from "react";

import styled, { Color } from "../../util/style/theme";
import rotate360 from "../../util/style/rotate360";

interface SpinnerProps {
  scale?: number;
  className?: string;
}

const Spinner: React.StatelessComponent<SpinnerProps> = ({
  className
}: SpinnerProps) => <div className={className} />;

Spinner.defaultProps = {
  scale: 2
};

export default styled(Spinner)`
  border-radius: 50%;
  margin: 0 auto;
  width: 11em;
  height: 11em;
  font-size: ${props => props.scale}px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(200, 200, 200, 0.5);
  border-right: 1.1em solid rgba(200, 200, 200, 0.5);
  border-bottom: 1.1em solid rgba(200, 200, 200, 0.5);
  border-left: 1.1em solid #ffffff;
  transform: translateZ(0);
  animation: ${rotate360} 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 11em;
    height: 11em;
  }
`;
