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
  None,
  Success,
  Error,
  Loading
}

interface AsyncComponentState<T> {
  result: T | Error;
  promiseState: PromiseState;
}

const returnArg = <T>(arg: T): T => arg;

class AsyncComponent<T> extends React.Component<
  AsyncComponentProps<T>,
  AsyncComponentState<T>
> {
  static defaultProps = {
    renderSuccess: returnArg,
    renderError: returnArg,
    renderLoading: returnArg
  };

  state = {
    result: null,
    promiseState: PromiseState.None
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
      this.setState({ result: error, promiseState: PromiseState.Error });
    }
  }

  render() {
    const { renderSuccess, renderError, renderLoading } = this.props;
    const { result, promiseState } = this.state;
    switch (promiseState) {
      case PromiseState.Success:
        return renderSuccess(result);
      case PromiseState.Error:
        return renderError(result);
      case PromiseState.Loading:
        return renderLoading();
    }
  }
}

export default AsyncComponent;
