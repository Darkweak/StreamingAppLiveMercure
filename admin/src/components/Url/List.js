import React from 'react';
import { EditButton, List, Datagrid, TextField } from 'react-admin';

export const UrlList = props => (
  <List {...props} bulkActionButtons={false} actions={false} pagination={false} exporter={false} hasEdit={true}>
    <Datagrid>
      <TextField source="url" />
      <EditButton />
    </Datagrid>
  </List>
);
