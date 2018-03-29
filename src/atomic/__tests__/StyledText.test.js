import React from 'react';
import {StyledText} from "../StyledText";
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('StyledError', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<StyledText>Error Message</StyledText>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
