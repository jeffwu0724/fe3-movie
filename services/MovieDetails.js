import Socket from "./Socket";
import { baseUrl, movieEPs } from "../config/config.json";
import Gateway from "./Gateway";

const localStorage = require("local-storage");

async function details(movie_id) { //queryString, type, input,
    
    console.log(movie_id)
    console.log(baseUrl+movieEPs.detailEP + '/' + movie_id)
    const email = localStorage.get("email")
    const session_id = localStorage.get("session")
    

    const options = {
        baseURL: baseUrl, // Base URL
        url: movieEPs.detailEP + '/' + movie_id, // Path of URL  //'?' + type + '=' + input,

                                // '?title=' + title
                                // + '&year=' + year
                                // + '&director=' + director
                                // + '&genre=' + genre
        headers: {
            email: email,
            session_id: session_id
        },
       // data: payLoad // Data to send in Body
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

export default {
    details
};
