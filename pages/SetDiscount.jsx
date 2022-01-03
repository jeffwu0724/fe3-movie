import React, {useEffect, useContext, useState} from "react";
import { useSession } from "../hook/Session";
import billing from "../services/getPrice";
import Idm from "../services/Idm";

/*
  Using localStorage is similar to how we use
  dictionary.
  
  To set a variable call `localStorage.set("key", value)`
  To get a variable call `localStorage.get("key")`

  Local Storage persists through website refreshes so
  it is perfect for storing things we dont want to lose
  like a users session

  You must call `const localStorage = require("local-storage");`
  in any class that you want to use this in, it is the same
  local storage in the entire website regardless of where you call
  it as each website gets the same instance of the storage.

  So think of it as a global dictionary.
*/

const localStorage = require("local-storage");

const SetDiscount = ({ history, location, match }) => {
    //console.log(history)

   

    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [discount, setDiscount] = useState();
    const [sale_start, setSale_start] = useState();
    const [sale_end, setSale_end] = useState();
    const [limit, setLimit] = useState();

    const [password, setPassword] = useState();
    const {session, setSession} = useSession();

    /**
     * Buttons have default behavior which will cause
     * the entire page to refresh, this isn't what
     * we want in React as everything updates according
     * to the state. So we prevent that action by
     * using "e.preventDefault();"
     *
     * @param e Event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        billing.discount_create(email, code, discount, sale_start, sale_end, limit) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(email);
                console.log(code);
                console.log(discount);
               
            }
            )
            .catch(error => alert(error));

    };


    return (
        <div className="form-box">
            <h1>Set Discount</h1>
            {/* <form onSubmit={handleSubmit}>
              <label className="form-label">Email</label>
              <input
                  className="form-input"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">Password</label>
              <input
                  className="form-input"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
              
              <button className="form-button" >Login in to Admin</button>
            
          </form> */}
        
          <h3>Discount Info</h3>
          <form onSubmit={handleSubmit}>
             {/* const [email, setEmail] = useState();
            const [code, setCode] = useState();
            const [discount, setDiscount] = useState();
            const [sale_start, setSale_start] = useState();
            const [sale_end, setSale_end] = useState();
            const [limit, setLimit] = useState(); */}

              <label className="form-label">Email</label>
              <input
                  className="form-input"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">Code</label>
              <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
              />
               <label className="form-label">Discount</label>
              <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setDiscount(e.target.value)}
              />
               <label className="form-label">Sale_start</label>
              <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setSale_start(e.target.value)}
              />
               <label className="form-label">Sale_end</label>
              <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setSale_end(e.target.value)}
              />
               <label className="form-label">Limit</label>
              <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setLimit(e.target.value)}
              />
              
              <button className="form-button" >Create Discount</button>
            
          </form>
        </div>
    );
}

export default SetDiscount;
