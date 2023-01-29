import React from 'react'
import { List, Datagrid, TextField, EditButton, DateField } from 'react-admin'
import "./Admin.css"

export const PostDisplay = ({...props}) => {
  return (
    <List >
        <Datagrid>
            <TextField source='id'/>
            <TextField source='Description'/>
            <DateField source='createdAt'/>
            <DateField source='expiresAt'/>
            <TextField label = "Poster ID" source = "posterId._id" />
            <TextField label = "Poster Username" source = "posterId.username"/>
            <TextField label = "Poster Email" source = "posterId.email"/>
            <EditButton label="Edit" basePath='/Post/edit'/>
        </Datagrid>
    </List>
  )
}
