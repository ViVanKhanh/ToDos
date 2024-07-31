import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Alert } from 'react-bootstrap';


const PrivateRoute = (props) => {

    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className='my-3'  dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    you dont have permisson to access this route
                </p>
            </Alert>
        </>
    }
    return (
        <>
           {props.children}

        </>
    )
}
export default PrivateRoute;