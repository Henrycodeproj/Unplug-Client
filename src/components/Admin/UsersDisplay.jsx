import React from 'react'
import { List, Datagrid, TextField, EditButton, DateField } from 'react-admin'
import "./Admin.css"

export const UsersDisplay = ({...props}) => {
  return (
    <List>
        <Datagrid>
            <TextField source='id'/>
            <TextField source='username'/>
            <TextField source='selfDescription'/>
            <TextField source='email'/>
            <DateField source='lastActiveDate'/>
            <DateField source='createdAt'/>
            <EditButton label="Edit" basePath='/edit'/>
        </Datagrid>
    </List>
  )
}