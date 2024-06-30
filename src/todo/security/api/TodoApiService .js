import axios from "axios";


// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
);

// if this function is called then at backend get request is sent with the username as pathvariable and gets todo
export const retrieveAllTodosForUsernameApi = (username) => apiClient.get(`/users/${username}/todos`)

// if this function is called then at backend delete request is sent with the username and id as pathvariable and deletes the particular todo
export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)


export const retrieveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)