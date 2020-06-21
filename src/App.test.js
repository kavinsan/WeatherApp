import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import store from "./redux/store";

it('renders without crashing', () => {
  shallow(<App store={store}/>);
});