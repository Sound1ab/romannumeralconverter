import React from 'react';
import {StyledError} from "../StyledError";
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('StyledError', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<StyledError>Error Message</StyledError>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
