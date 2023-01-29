
import * as React from "react";
import { Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, } from 'react-admin';


export const PostEdit = ({...props}) => {
    return(
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" {...props} fullWidth/>
            <TextInput source= "Description" validate={required()} fullWidth/>
        </SimpleForm>
    </Edit>
)}