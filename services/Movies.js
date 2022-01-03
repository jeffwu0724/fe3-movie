import Socket from "./Socket";
import { baseUrl, movieEPs } from "../config/config.json";
import Gateway from "./Gateway";

const localStorage = require("local-storage");

async function search(title, year, director, genre, limit, offset, orderby, direction) { //queryString, type, input,
    // console.log(type)
    // console.log(input)
    console.log("uri: " + baseUrl+movieEPs.searchEP + '?title=' + title
                                + '&limit=' + limit
                                + '&offset=' + offset
                                + '&direction=' + direction
                                + '&orderby='+ orderby)

    
    
    
    
    //console.log('/?${type}=${input}')
    const email = localStorage.get("email")
    const session_id = localStorage.get("session")
    
    // const payLoad = {
    //     type: type,
    //     input: input
    // };

    // const options = {
    //     baseURL: moviesUrl, // Base URL
    //     url: moviesEPs.searchEP + '/?' + type + '=' + input, // Path of URL
    //     headers: {
    //         email: email,
    //         session_id: session_id
    //       },
    //     data: payLoad // Data to send in Body
    // }
    var counter = 0;
    if(title !== undefined && title !== ""){ //null
        console.log(title)
        if(counter !== 0){
            var url_title = '&title=' + title
        }else{
            var url_title = 'title=' + title
        }
        counter++;
    }else{
        var url_title = ""
    }

    if(year !== undefined && year !== ""){
        console.log(year)
        if(counter !== 0){
            var url_year = '&year=' + year
        }else{
            var url_year = 'year=' + year
        }
        counter++;
    }else{
        var url_year =""
    }

    if(director !== undefined && director !== ""){
        console.log(director)
        
        if(counter !== 0){
            var url_director = '&director=' + director
        }else{
            var url_director = 'director=' + director
        }
        counter++;
    }else{
        var url_director =""
    }

    if(genre !== undefined && genre !== ""){
        console.log(genre)
        
        if(counter !== 0){
            var url_genre = '&genre=' + genre
        }else{
            var url_genre = 'genre=' + genre
        }
        counter++;
        
    }else{
        var url_genre =""
    }

    if(genre !== undefined && genre !== ""){
        console.log(genre)
        
        if(counter !== 0){
            var url_genre = '&genre=' + genre
        }else{
            var url_genre = 'genre=' + genre
        }
        counter++;
        
    }else{
        var url_genre =""
    }
    const options = {
        baseURL: baseUrl, // Base URL
        url: movieEPs.searchEP + '?' + url_title + url_year + url_director + url_genre
                                + '&limit=' + limit
                                + '&offset=' + offset
                                + '&direction=' + direction
                                + '&orderby='+ orderby, // Path of URL  //'?' + type + '=' + input,

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

async function browse(keyword,limit,offset, direction, orderby) { //queryString, type, input,
    
    const email = localStorage.get("email")
    const session_id = localStorage.get("session")
    
    
    
    const options = {
        baseURL: baseUrl, // Base URL
        url: movieEPs.browseEP + "/" + keyword
                                + '?limit=' + limit
                                + '&offset=' + offset
                                + '&direction=' + direction
                                + '&orderby='+ orderby, // Path of URL  //'?' + type + '=' + input,

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
    search,
    browse
};
