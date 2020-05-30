import React from 'react';
import { Layout } from 'react-admin';

export const CustomLayout = props => (
  <Layout
    {...props}
    menu={() => <></>}
  />
);
