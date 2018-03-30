import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyledError} from './StyledError';
import styled from 'styled-components';

class RomanNumeralConverter extends Component {
    constructor (props) {
        super(props);
        this.state = {numeral: '', inputError: false};
        // Values that require roman numeral subtraction e.g. 4, 9, 90 added as keys
        // otherwise the converter logic becomes unnecessarily complex
        this.keys = new Map([['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],]);
        this.INPUT_LIMIT = 4999;
        this.convertNumber = this.convertNumber.bind(this);
    }
    componentWillReceiveProps ({input}) {
        const sanitisedInput = this.limitInputLength(input);
        this.setState({
            numeral: sanitisedInput ? this.convertNumber(sanitisedInput) : '',
            inputError: input > this.INPUT_LIMIT
        });
    }
    limitInputLength (input) {
        if (input <= this.INPUT_LIMIT) {
            return input;
        }
    }
    // Converter uses recursion to break the number down. Each subsequent
    // numeral is found by reducing it by the value that came before it
    // and performing a lookup on the keys
    convertNumber (number, numeral = '') {
        let currentNumeral;
        if (number <= 0) {
            return numeral;
        }
        this.keys.forEach((val, key) => {
            if (number >= val && !currentNumeral) {
                currentNumeral = key;
            }
        });
        return this.convertNumber(number - this.keys.get(currentNumeral), `${numeral}${currentNumeral}`)
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
    input: PropTypes.number,
    children: PropTypes.func.isRequired
};

export default styled(RomanNumeralConverter)`
  padding: 24px;
  text-align: center;
`;