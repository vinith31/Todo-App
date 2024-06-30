import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const HeaderComponent = () => {

    const authContext = useAuth(); // accessing the useAuth() method from AuthContext.js

    const isAuthenticated = authContext.isAuthenticated; // access the isAuthenticated variable

    function logout(){
        authContext.logout();
    }

    return (
        <header className='border-bottom border-light border-5 mb-5 p-2'>
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <a className='navbar-brand ms-2 fs-2 fw-bold text-black' href="www.google.com">in28minutes</a>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {/* if it is authenticated then only Home icon will be displayed*/}
                                    {isAuthenticated 
                                        && <Link className='nav-link' to="/welcome/in28minutes">Home</Link>}
                                </li>
                                <li className='nav-item'>
                                    {/* if it is authenticated then only Todos icon will be displayed*/}
                                    {isAuthenticated 
                                        && <Link className='nav-link' to="/todos">Todos</Link>}
                                </li>
                                    
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            {/* if it is not authenticated then only Login icon will be displayed */}
                            <li className='nav-item'>
                                { !isAuthenticated && <Link className='nav-link' to="/login">Login</Link> }
                            </li>

                            {/* if it is authenticated then only Logout icon will be displayed */}
                            <li className='nav-item'>
                                {/* if we click logout button then logout function will get executed */}
                                { isAuthenticated && <Link className='nav-link' to="/logout" onClick={logout}>Logout</Link> }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent;