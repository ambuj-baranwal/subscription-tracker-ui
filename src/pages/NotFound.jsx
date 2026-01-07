import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>404!</h1>
            No Such Page exist. Go to
            <Link to="/">{' Home'}</Link>
        </div>
    )
}

export default NotFound;