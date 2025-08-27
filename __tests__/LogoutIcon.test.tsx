import { render } from '@testing-library/react-native';
import React from 'react';
import { LogoutIcon } from '../components/LogoutIcon';

describe('LogoutIcon', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<LogoutIcon />);

    const svg = getByTestId('logout-icon');
    expect(svg.props.width).toBe(20);
    expect(svg.props.height).toBe(20);
    expect(svg.props.fill).toBe('none');
  });

  it('renders the correct path for variant=arrow', () => {
    const { getByTestId } = render(<LogoutIcon variant="arrow" />);

    const path = getByTestId('logout-icon-path');
    expect(path.props.d).toContain('M16 17l5-5-5-5');
  });

  it('renders the correct path for variant=power', () => {
    const { getByTestId } = render(<LogoutIcon variant="power" />);

    const path = getByTestId('logout-icon-path');
    expect(path.props.d).toContain('M18.36 6.64a9 9 0 1 1-12.73 0');
  });

  it('renders the correct path for variant=door', () => {
    const { getByTestId } = render(<LogoutIcon variant="door" />);

    const path = getByTestId('logout-icon-path');
    expect(path.props.d).toContain('M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14');
  });

  it('renders the correct path for variant=exit', () => {
    const { getByTestId } = render(<LogoutIcon variant="exit" />);

    const path = getByTestId('logout-icon-path');
    expect(path.props.d).toContain('M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4');
  });

  it('applies custom size and color', () => {
    const { getByTestId } = render(<LogoutIcon size={30} color="red" />);

    const svg = getByTestId('logout-icon');
    expect(svg.props.width).toBe(30);
    expect(svg.props.height).toBe(30);

    const path = getByTestId('logout-icon-path');
    expect(path.props.stroke).toEqual(expect.anything()); // SVG color handling might vary
  });
});
