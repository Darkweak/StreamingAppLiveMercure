import React from 'react';
import { Edit, SaveButton, SimpleForm, TextInput, Toolbar } from 'react-admin';

const CustomToolbar = props => (
  <Toolbar {...props} >
    <SaveButton undoable={false}/>
  </Toolbar>
);

export const UrlEdit = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm toolbar={<CustomToolbar/>}>
      <TextInput label="Url du stream" source="url" />
    </SimpleForm>
  </Edit>
);
