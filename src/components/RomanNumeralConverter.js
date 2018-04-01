import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyledError} from './StyledError';
import {
    createRomanNumeralRegex,
    testStr,
    createRegex,
    replaceFoundText,
    checkRepeatingNumeral,
    checkDescendingValue,
    checkNonRepeatingSubtractor
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
                notDescending: false,
                nonRepeatingSubtractor: false,
                length: false
            }
        };
        // Values that require roman numeral subtraction e.g. 4, 9, 90 added as keys
        // otherwise the converter logic becomes unnecessarily complex
        this.keys = new Map([['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],]);
        this.INPUT_LIMIT = 10;
        this.compose = (x,y) => z => x(y(z));
        this.convertNumber = this.convertNumber.bind(this);
        this.updateNumeral = this.updateNumeral.bind(this);
        this.updateErrors = this.updateErrors.bind(this);
    }
    componentWillReceiveProps ({input}) {
        const convertNumberWithSanitisedInput = this.compose(this.convertNumber, this.limitInputLength.bind(null, this.INPUT_LIMIT));
        const convertedNumber = convertNumberWithSanitisedInput(input);
        this.updateNumeral(convertedNumber);
        this.updateErrors(convertedNumber, input);
    }
    updateNumeral (convertedNumber) {
        this.setState({
            numeral: convertedNumber.length > 0
                ? convertedNumber.reduce((acc, el) => acc + el)
                : []
        });
    }
    // Given more time, specific error messages could be setup
    updateErrors (convertedNumber, input) {
        this.setState({
            inputErrors: {
                nonRepeating:  checkRepeatingNumeral(input, ['V','L','D'], 2),
                repeating:  checkRepeatingNumeral(input, ['I','X','C','M'], 4),
                notDescending: checkDescendingValue(convertedNumber),
                nonRepeatingSubtractor: checkNonRepeatingSubtractor(convertedNumber),
                length:  input.length > this.INPUT_LIMIT
            }
        });
    }
    limitInputLength (limit, input) {
        return input.substr(0, limit);
    }
    // Converter uses recursion to break the number down. Each subsequent
    // numeral is found by reducing it by the value that came before it
    // and performing a lookup on the keys
    convertNumber (numeral, number = []) {
        let foundNumber = 0;
        if (numeral.length <= 0 || testStr(numeral, createRomanNumeralRegex(true))) {
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
        const {inputErrors} = this.state;
        return (
            <div className={this.props.className}>
                {Object.values(inputErrors).includes(true)
                    ? <StyledError>Input is not a valid Roman numeral</StyledError>
                    : this.props.children(this.state)}
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