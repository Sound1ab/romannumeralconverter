import React, {Component} from 'react';
import {StyledError} from "./StyledError";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <StyledError>Oh dear, something went wrong</StyledError>
        }
        return this.props.children;
    }
}