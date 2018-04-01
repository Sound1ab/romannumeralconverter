import RomanNumeralConverter from '../RomanNumeralConverter';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('RomanNumeralConverter', () => {
    let wrapper;
	beforeEach(() => {
        wrapper = shallow(
            <RomanNumeralConverter input={''}>
                {({numeral}) => <div>{numeral}</div>}
            </RomanNumeralConverter>
        ).dive();
        jest.clearAllMocks();
    });
	describe('State and Props', () => {
        it('should call convertNumber with newly received prop', () => {
            const mock = jest.fn();
            mock.mockReturnValue(['5']);
            wrapper.instance().convertNumber = mock;
            wrapper.update();
            wrapper.setProps({input: 'V'});
            expect(wrapper.instance().convertNumber).toBeCalledWith('V');
        });
        it('should update numeral state when new prop is received', () => {
            expect(wrapper.state('numeral')).toBe('');
            wrapper.setProps({input: 'V'});
            expect(wrapper.state('numeral')).not.toBe('');
        });
        it('should render children prop', () => {
            expect(wrapper.childAt(0).type()).toBe('div');
        });
	});
    describe('Public Interface', () => {
        // Testing the public interface instead of the method logic so the
        // function implementation can be changed without causing the test to fail
        it('should convert roman numeral input prop to digit', () => {
            wrapper.setProps({input: 'X'});
            expect(wrapper.childAt(0).text()).toBe('10');
        });
    });
    describe('Errors', () => {
    	it('should not accept input with I, X, C, and M repeating more than 3 times', () => {
    	    expect(wrapper.state('inputErrors').repeating).toBe(false);
            wrapper.setProps({input: 'IIII'});
    	    expect(wrapper.state('inputErrors').repeating).toBe(true);
    	});
    	it('should not accept input with V, L, and D repeating', () => {
            expect(wrapper.state('inputErrors').nonRepeating).toBe(false);
            wrapper.setProps({input: 'VV'});
            expect(wrapper.state('inputErrors').nonRepeating).toBe(true);
    	});
    	it('should not accept input with any ascending values', () => {
            expect(wrapper.state('inputErrors').notDescending).toBe(false);
            wrapper.setProps({input: 'LXD'});
            expect(wrapper.state('inputErrors').notDescending).toBe(true);
    	});
    	it('should not accept input with length large than 10', () => {
            expect(wrapper.state('inputErrors').length).toBe(false);
            wrapper.setProps({input: 'LLLLLLLLLLL'});
            expect(wrapper.state('inputErrors').length).toBe(true);
    	});
    });
});