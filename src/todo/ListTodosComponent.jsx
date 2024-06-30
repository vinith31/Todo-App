import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./security/api/TodoApiService ";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodosComponent = () => {

    const today = new Date();

    const authContext = useAuth(); // accessing the useAuth() method from AuthContext.js

    const username = authContext.username; // access the isAuthenticated variable

    const navigate = useNavigate(); // accessing the useNavigate hook from react-router-dom
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([]);
    
    const [message, setMessage] = useState();

    //useEffect - tell React that your component needs to do something after render

    useEffect(() => refreshTodos(), []) //

    // after deleting or updating this function is called every time
    function refreshTodos(){
        
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                // console.log(response.data)
                setTodos(response.data)
            })
            .catch(error => console.error())
    
    }

    // if we click delete button it call this deleteTodo function with id of that particular todo 
    function deleteTodo(id){
        deleteTodoApi(username, id) // calls this function with username and id as the parameter
            // after executing the above function .then() is executed
            .then(
                () => {
                    setMessage(`Delete of todo with id = ${id} successful`) // sets the message
                    refreshTodos() // refreshTodos is called
                }
            )
            .catch(error => console.error())
    }

    function updateTodo(id){
        console.log('clicked' + id);
        navigate(`/todo/${id}`)
    }

    return (
        <div className='container'>
            <h1>Things You Want To Do!</h1>
            { message && <div className="alert alert-warning">{message}</div> }
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date?</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodosComponent;