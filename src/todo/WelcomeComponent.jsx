import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./security/api/HelloWorldApiService";

const WelcomeComponent = () => {
    
    const [message, setMessage] = useState(null);

    const {username} = useParams();

    function callHelloWorldRestApi() {
        //axios

        // retrieveHelloWorldBean()
        //     .then( (response) => successfulResponse(response) )
        //     .catch( (error) => errorResponse(error) )
        //     .finally( () => console.log('clean up') )

        retrieveHelloWorldPathVariable('vinith')
            .then( (response) => successfulResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('clean up') )

        // axios.get('http://localhost:8080/hello-world-bean')
        //     .then( (response) => successfulResponse(response) )
        //     .catch( (error) => errorResponse(error) )
        //     .finally( () => console.log('clean up') )
    }

    function successfulResponse(response){
        console.log(response);
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error);
    }
    
    return (
        <div className='WelcomeComponent'>
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent