import React, { Component } from 'react';
import './style.scss';
interface IState {
  hasError: boolean;
}

interface IProps {
  children: React.ReactNode;
}

interface IError {
  stack?: string;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: IError) {
    return { hasError: true };
  }

  componentDidCatch(error: IError, errorInfo: React.ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-error">
          <img src="../../assets/image/logo_hexagony.png" alt="Hexagony" />

          <span>
            <h1>Something went wrong.</h1>
            <h1>We are working to fix this issue.</h1>
          </span>
          <a href="/login">Try in a few moments</a>
        </div>
      );
    }

    return this.props.children;
  }
}
