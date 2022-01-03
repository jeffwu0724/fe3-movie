import React, {useEffect, useState, Link, useContext} from "react";

const Index = ({history, location, match}) => {
    return (
        <div className="form-box">
            <h1>Index </h1>
            <form>
                <label className="form-label">search for movies</label>
                <button variant="btn btn-success" onClick={() => history.push('/search')}>search for movies</button>
                <label className="form-label">view shopping cart</label>
                <button variant="btn btn-success" onClick={() => history.push('/shoppingcart')}> view shopping cart</button>
                <label className="form-label">view order history</label>
                <button variant="btn btn-success" onClick={() => history.push('/orderhistory')}>view order history</button>
                <label className="form-label">Admin set discount</label>
                <button variant="btn btn-success" onClick={() => history.push('/orderhistory')}>Admin set discount</button>
                
                
            </form>
        </div>
    );
}


export default Index;

/*import React, {useContext, useEffect, useState, Link} from "react";
import {useSession} from "../hook/Session";

const Index = ({history, location, match }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {session, setSession} = useSession();
     @param e Event
     


    const handleSubmit = (e) => {
        e.preventDefault();

        
    };
    return (
        <div className="form-box">
            <h1>Index </h1>
            <form onSubmit={handleSubmit}  >
                <label className="form-label">search for movies</label>
                <Link to="/search">
                    <button type="button">
                        search for movies
                    </button>
                </Link>
                <label className="form-label">view shopping cart</label>
                <Link to="/shoppingcart">
                    <button type="button">
                        view shopping cart
                    </button>
                </Link>
                <label className="form-label">view order history</label>
                <Link to="/orderhistory">
                    <button type="button">
                        view order history
                    </button>
                </Link>
                
            </form>
        </div>
    );
}

export default Index;


*/