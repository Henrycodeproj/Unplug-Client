import { Admin, Resource} from "react-admin";
import { PostDisplay } from "./PostDisplay";
import axios from "axios";
import { PostEdit } from "./PostEdit";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Layout } from "react-admin";
import { UsersDisplay } from "./UsersDisplay";
import { UsersEdit } from "./UsersEdit";
import { authProvider } from './AuthProvider.js';
import MyLoginPage from "./Login";

export const AdminPage = () => {
  //middleware to format obj into library format
  function getListHandler(response, params) {
    const {page, perPage}= params.pagination

    const formattedData = response.data.map((fields) => ({
      ...fields,
      id: fields._id,
    }));

    //pagination
    const newArray = formattedData.slice((page - 1) * perPage, page * perPage)

    return {
      data: newArray,
      total: response.data.length,
    };
  }

  const apiUrl = "https://unplug-server.herokuapp.com/admin";
  const dataProvider = {
    getList: async (resource, params) =>
      await axios
        .post(`${apiUrl}/${resource}`, {resource:resource, params:params})
        .then((response) => getListHandler(response, params)),

    delete: async (resource, params) =>
      await axios
        .patch(`${apiUrl}/${resource}/delete`, { resource: resource, params: params })
        .then((response) => response.data),

    deleteMany: async (resource, params) =>
      await axios
        .patch(`${apiUrl}/${resource}/deleteMany`, { resource: resource, params: params })
        .then((response) => response.data),

    update: async (resource, params) =>
      await axios
        .put(`${apiUrl}/${resource}/update`, { resource: resource, params: params })
        .then((response) => response.data),

    //updateMany: async (resource, params) => console.log(params)
    //await axios.put(`${apiUrl}/${resource}/update`, {resource: resource, params:params})
    //.then(response => response.data),

    getOne: async (resource, params) =>
      await axios
        .put(`${apiUrl}/${resource}/getOne`, { resource: resource, params: params })
        .then((response) => response.data),
  };
  return (
    <Admin basename="/admin" dataProvider={dataProvider} authProvider = {authProvider} requireAuth>
      <Resource name="Post" list = {PostDisplay} edit = {PostEdit} icon = {ArticleIcon} />
      <Resource name="Users" list = {UsersDisplay} edit = {UsersEdit} icon = {SupervisorAccountIcon}/>
    </Admin>
  );
};
