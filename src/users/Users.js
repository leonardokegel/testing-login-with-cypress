import { Create, Datagrid, Edit, EmailField, List, PasswordInput, SimpleForm, TextField, TextInput } from "react-admin";

export const UserList = (data) => (
    <List>
        <Datagrid data={data.data} rowClick="edit">
            <TextField source="id"></TextField>
            <TextField source="name"></TextField>
            <EmailField source="email"></EmailField>
            <TextField source="password"></TextField>
        </Datagrid>
    </List>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name"></TextInput>
            <TextInput source="email"></TextInput>
            <PasswordInput source="password"></PasswordInput>
        </SimpleForm>
    </Create>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name"></TextInput>
            <TextInput source="email"></TextInput>
            <PasswordInput source="password"></PasswordInput>
        </SimpleForm>
    </Edit>
);