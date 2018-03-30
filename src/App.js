import React, {Component} from 'react';
import {StyledInput} from './components/StyledInput';
import {StyledText} from './components/StyledText';
import {StyledTitle} from './components/StyledTitle';
import {createRomanNumeralRegex, testStr} from './utils/regex-helpers';
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
        let lastChar = e.target.value.split('').pop();
        if (this.isAlpha(lastChar) && this.isRomanNumeral(lastChar)) {
            this.setState({input: e.target.value.toUpperCase()});
        }
    }
    isRomanNumeral (string) {
        return testStr(string, createRomanNumeralRegex());
    }
    isAlpha (string) {
        let value = parseInt(string, 10);
        return isNaN(value);
    }
    // Using a render prop to encapsulate the converter logic
    render() {
        const {input} = this.state;
        return (
            <div className={this.props.className}>
                <ErrorBoundary>
                    <StyledTitle>
                        Roman Numeral Converter
                    </StyledTitle>
                    <form>
                        <StyledInput type="text" value={input} onChange={this.handleChange} />
                    </form>
                    <RomanNumeralConverter input={input}>
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
