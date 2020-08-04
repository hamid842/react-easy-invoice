import React from 'react';
import Login from 'app/modules/login/Login';
import LoginForm from 'app/modules/login/LoginForm';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { shallow } from 'enzyme';

describe('<Login />', () => {
  beforeEach(() => {
    // ignore console and jsdom errors
    jest.spyOn((window as any)._virtualConsole, 'emit').mockImplementation(() => false);
    jest.spyOn((window as any).console, 'error').mockImplementation(() => false);
  });

  // All tests will go here
  it('<Login />', () => {
    const comp = shallow(<Login />);
    expect(comp.length).toEqual(1);
    expect(comp.find(Grid).length).toEqual(5);
    expect(comp.find(Typography).length).toEqual(1);
    expect(comp.find(Box).length).toEqual(1);
    expect(comp.find(Button).length).toEqual(1);
    expect(comp.find(LoginForm).length).toEqual(1);
    expect(comp.find('img').prop('src')).toEqual('content/images/logo1.png');
  });
});
