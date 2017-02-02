import React from 'react';
import { Link } from 'react-router'

const DefaultLayout = function (props) {
  return (
    <div>
      <header>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/test">test</Link></li>
        </ul>
      </header>
      {props.children}
    </div>
  );
};

DefaultLayout.displayName = 'containers/DefaultLayout';

export default DefaultLayout;
