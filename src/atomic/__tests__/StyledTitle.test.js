import React from 'react';
import {StyledTitle} from "../StyledTitle";
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('StyledError', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<StyledTitle>Error Message</StyledTitle>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
