import React, {useEffect, useState} from "react";
import billing from "../services/getPrice";
import Image from 'material-ui-image';
import Container from '@material-ui/core/Container';
const localStorage = require("local-storage");


const MovieDetails = ({history, location, match}) => {
    // localStorage.set("movie_genre", e.target.getAttribute("genre"));
    //     localStorage.set("movie_keyword", e.target.getAttribute("keyword"));
    //     localStorage.set("movie_rating", e.target.getAttribute("rating"));

    //     localStorage.set("movie_overview", e.target.getAttribute("overview"));
    //     localStorage.set("movie_overview", e.target.getAttribute("overview"));
    //     localStorage.set("movie_poster_path", e.target.getAttribute("poster_path"));
    const movie_id = localStorage.get("movie_id")
    const movie_title = localStorage.get("movie_title")
    const movie_year = localStorage.get("movie_year")

    const movie_genre  = [localStorage.get("movie_genre")]
    const movie_people = [localStorage.get("movie_people")]
    const movie_rating = localStorage.get("movie_rating")

    const movie_revenue = localStorage.get("movie_revenue")
    const movie_overview = localStorage.get("movie_overview")
    const movie_budget = localStorage.get("movie_budget")
    const movie_poster_path = localStorage.get("movie_poster_path")

    const email = localStorage.get("email")
    // const unit_price

    //const movie = localStorage.get("movie")

   // const [items, setItems] = useState([]);
    const [number, setNumber] = useState();
    //const [unit_price, setUnit_price] = useState(); 
    //const total_price_each_movie;


    const purchase=(e) =>{
        e.preventDefault();
       
        //localStorage.set("type", type)
       // localStorage.set("input", input)
       localStorage.set("number", number);

       //add to cart
        billing.cart_insert(email, movie_id, number) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(email);
                console.log(movie_id);
                console.log(number);
                
            }
            )
            .catch(error => alert(error));
        
        history.push("shoppingcart")
        // //get price from cart
        // billing.cart_retrieve(email) //type, input,
        //     .then(response => {alert(JSON.stringify(response.data, null, 4))
        //         console.log(email);
        //         console.log(response.data?.items)
        //         setItems(response.data?.items);
        //         localStorage.set("items", items);
        //         console.log(items.movie_id)
        //         // localStorage.set("unit_price", response.data?.unit_price);
        //         // localStorage.set("discount", response.data?.movie.discount);
        //     }
        //     )
        //     .catch(error => alert(error));

    }

  
    //https://image.tmdb.org/t/p/w500
        
        return (
        
            <div className="form-box">
                 {/* <form onSubmit={showDetail}>
                     <h1>MovieDetails </h1>
    
                    <button >Show Details</button>
                    {/* onClick={showDetail} */}
                {/* </form> */} 
                 {/* {window.location.reload()}; */}
                 
                
               
                 <div>
                    <Container maxWidth="sm">
                    <Image src={"https://image.tmdb.org/t/p/w500"+ movie_poster_path} alt='poster' className="photo"/>
                </Container>
                
                <p>Movie id: {movie_id}</p>
                <p>Title: {movie_title}</p>
                <p>Year: {movie_year}</p>
    
                <p>Genre: {movie_genre}</p>
                <p>Rating: {movie_rating}</p>
                <p>Budget: {movie_budget}</p>
    
                <p>Revenue: {movie_revenue}</p>
                <p>Overview: {movie_overview}</p>
                <p>People: {movie_people}</p>
                <p>poster_path: {movie_poster_path}</p>
                {/* <img src={require('')} alt='poster' /> */}
                
                
    
                {/* <p>Movie id: {movie.movie_id}</p>
                <p>Title: {movie.title}</p>
                <p>Year: {movie.year}</p>
    
                <p>Genre: {movie.genre}</p>
                <p>Rating: {movie.rating}</p>
                <p>Budget: {movie.budget}</p>
    
                <p>Overview: {movie.overview}</p>
                <p>Keyword: {movie.keyword}</p> */}
                {/* <image> {poster_path}</image> */}
    
                <label className="form-label">Add to cart:</label>
                    <input
                        className="input"
                        type="text"
                        onChange={(e) => setNumber(e.target.value)}
                    /> 
                <button onClick={purchase}>ADD</button>
               </div>
    
            </div>
        );
    }
    
    


export default MovieDetails;