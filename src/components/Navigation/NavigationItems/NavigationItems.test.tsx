import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<Navigation Items />', () => {
  test('should render two <NavigationItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated={false} />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  test('should render three <NavigationItem /> elements if authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated={true} />);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  test('should render Logout <NavigationItem /> element if authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated={true} />);
    expect(
      wrapper.contains(
        <NavigationItem link='/burger-builder/logout'>Logout</NavigationItem>
      )
    ).toEqual(true);
  });
});
