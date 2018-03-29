import RomanNumeralConverter from '../RomanNumeralConverter';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('RomanNumeralConverter', () => {
    let wrapper;
	beforeEach(() => {
        wrapper = shallow(
            <RomanNumeralConverter input={0}>
                {({numeral}) => <div>{numeral}</div>}
            </RomanNumeralConverter>
        ).dive();
    });
    it('should call convertNumber with newly received prop', () => {
        wrapper.instance().convertNumber = jest.fn();
        wrapper.update();
        wrapper.setProps({input: 3});
        expect(wrapper.instance().convertNumber).toBeCalledWith(3);
    });
    it('should update state when new prop is received', () => {
        expect(wrapper.state('numeral')).toBe('');
        wrapper.setProps({input: 3});
        expect(wrapper.state('numeral')).not.toBe('');
    });
    it('should render children prop', () => {
        expect(wrapper.childAt(0).type()).toBe('div');
    });
    it('should limit the input to numbers less than 10,000 and display error for larger numbers', () => {
        expect(wrapper.state('numeral')).toBe('');
        wrapper.setProps({input: 10000});
        expect(wrapper.state('numeral')).toBe('');
        expect(wrapper.state('inputError')).toBe(true);
    });
    // Testing the public interface instead of the method logic so the
    // function implementation can be changed without causing the test to fail
    it('should convert input prop to numeral', () => {
        wrapper.setProps({input: 5});
        expect(wrapper.childAt(0).text()).toBe('V');
    });
});