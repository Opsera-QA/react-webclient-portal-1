import React from 'react';
import App from '../App';
import {configure, shallow,render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';
configure({adapter: new Adapter()});

jest.mock("@okta/okta-signin-widget", () => {
  return {
    OktaSignIn: () => {
      return '';
    }
  };
});

jest.mock("react-syntax-highlighter/dist/esm/styles/hljs/docco", () => {
  return {};
});

jest.mock("react-syntax-highlighter/dist/esm/languages/hljs/xml", () => {
  return '';
});

jest.mock("react-syntax-highlighter", () => {
  return {
    Light: {
      registerLanguage : () => ''
    }

  };
});

it('renders and verifies the snapshot', () => {
  const wrapper = render(<App/>);
  expect(toJson(wrapper)).toMatchSnapshot();
});