import * as React from "react";

import styled from "../../util/style/theme";

interface ContainerProps {
  display?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  position?: string;
  className?: string;
  maxWidth?: string;
  marginTop?: string;
  marginBottom?: string;
  children: React.ReactNode;
}

const Container: React.StatelessComponent<ContainerProps> = ({
  children,
  className
}: ContainerProps) => <div className={className}>{children}</div>;

Container.defaultProps = {
  display: "inline-block"
};

export default styled(Container)`
  display: ${props => props.display};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  position: ${props => props.position};
  max-width: ${props => props.maxWidth};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
`;
