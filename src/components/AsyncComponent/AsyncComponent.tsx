import * as React from "react";

import Container from "../Container";

interface AsyncComponentProps<T> {
  promiseIdentifier?: string;
  promiseGenerator: () => Promise<T>;
  renderSuccess?: (result: T) => React.ReactNode;
  renderError?: (result: Error) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
}

enum PromiseState {
  Success,
  Error,
  Loading
}

interface AsyncComponentState<T> {
  result: T;
  error?: Error;
  promiseState: PromiseState;
}

const renderArg = <T extends React.ReactNode>(arg: T): React.ReactNode => (
  <Container>{arg}</Container>
);
const renderError = (error: Error) => <Container>{error.message}</Container>;

class AsyncComponent<T> extends React.Component<
  AsyncComponentProps<T>,
  AsyncComponentState<T>
> {
  static defaultProps = {
    renderError,
    renderSuccess: renderArg,
    renderLoading: renderArg
  };

  state = {
    result: null as any,
    error: new Error(
      "This is the default error for AsyncComponent and should not be displayed."
    ),
    promiseState: PromiseState.Loading
  };

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps(nextProps: AsyncComponentProps<T>) {
    if (nextProps.promiseIdentifier !== this.props.promiseIdentifier) {
      this.updateState();
    }
  }

  async updateState() {
    this.setState({ promiseState: PromiseState.Loading });
    try {
      const result = await this.props.promiseGenerator();
      this.setState({ result, promiseState: PromiseState.Success });
    } catch (error) {
      this.setState({ error, promiseState: PromiseState.Error });
    }
  }

  render() {
    const { renderSuccess, renderError, renderLoading } = this.props;
    const { result, error, promiseState } = this.state;
    switch (promiseState) {
      case PromiseState.Success:
        return renderSuccess(result);
      case PromiseState.Error:
        return renderError(error);
      case PromiseState.Loading:
        return renderLoading();
    }
  }
}

export default AsyncComponent;
