import React from 'react';
import {StyledInput} from "../StyledInput";
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('StyledError', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<StyledInput>Error Message</StyledInput>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
