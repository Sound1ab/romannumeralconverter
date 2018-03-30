import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyledError} from './StyledError';
import {
    createRomanNumeralRegex,
    testStr,
    createRegex,
    replaceFoundText,
    checkRepeatingNumeral,
    checkDescendingValue
} from '../utils/regex-helpers';
import styled from 'styled-components';

class RomanNumeralConverter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            numeral: '',
            inputErrors: {
                nonRepeating: false,
                repeating: false,
                descending: false,
                length: false
            }
        };
        // Values that require roman numeral subtraction e.g. 4, 9, 90 added as keys
        // otherwise the converter logic becomes unnecessarily complex
        this.keys = new Map([['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],]);
        this.INPUT_LIMIT = 10;
        this.convertNumber = this.convertNumber.bind(this);
    }
    componentWillReceiveProps ({input}) {
        const sanitisedInput = this.limitInputLength(input);
        const convertedNumber = this.convertNumber(input);
        this.setState({
            numeral: convertedNumber,
            inputErrors: {
                nonRepeating:  checkRepeatingNumeral(sanitisedInput, ['V','L','D'], 2),
                repeating:  checkRepeatingNumeral(sanitisedInput, ['I','X','C','M'], 4),
                descending: checkDescendingValue(convertedNumber),
                length:  input.length > this.INPUT_LIMIT
            }
        });
    }
    limitInputLength (input) {
        return input.substr(0, this.INPUT_LIMIT);
    }
    // Converter uses recursion to break the number down. Each subsequent
    // numeral is found by reducing it by the value that came before it
    // and performing a lookup on the keys
    convertNumber (numeral, number = []) {
        let foundNumber = 0;
        if (numeral.length <= 0 || testStr(numeral, createRomanNumeralRegex({negated: true}))) {
            return number;
        }
        this.keys.forEach((val, key) => {
            let regex = createRegex(`^${key}`);
            if (testStr(numeral, regex) && !foundNumber) {
                foundNumber = val;
                numeral = replaceFoundText(numeral, regex)
            }
        });
        return this.convertNumber(numeral, [...number, foundNumber])
    }
    render () {
        const {inputError} = this.state;
        return (
            <div className={this.props.className}>
                {this.props.children(this.state)}
                {inputError
                    ? <StyledError>Input must be less than 5000</StyledError>
                    : null}
            </div>
        )
    }
};

RomanNumeralConverter.propTypes = {
    input: PropTypes.string,
    children: PropTypes.func.isRequired
};

export default styled(RomanNumeralConverter)`
  padding: 24px;
  text-align: center;
`;