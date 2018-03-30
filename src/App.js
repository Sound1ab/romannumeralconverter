import React, {Component} from 'react';
import {StyledInput} from './components/StyledInput';
import {StyledText} from './components/StyledText';
import {StyledTitle} from './components/StyledTitle';
import styled from 'styled-components';
import RomanNumeralConverter from './components/RomanNumeralConverter';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {input: ''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e) {
        this.setState({input: e.target.value});
    }
    convertToNumber (string) {
        let value = parseInt(string, 10);
        if (isNaN(value)) {
            return 0;
        }
        return value
    }
    // Using a render prop to encapsulate the converter logic
    render() {
        const {input} = this.state;
        return (
            <div className={this.props.className}>
                <StyledTitle>
                    Roman Numeral Converter
                </StyledTitle>
                <form>
                    <StyledInput type="number" value={input} onChange={this.handleChange} />
                </form>
                <ErrorBoundary>
                    <RomanNumeralConverter input={this.convertToNumber(input)}>
                        {({numeral}) => (
                            <StyledText>
                                {numeral}
                            </StyledText>
                        )}
                    </RomanNumeralConverter>
                </ErrorBoundary>
            </div>
        );
    }
}

export default styled(App)`
  width: 100vw;
  height: 100vh;
`;
