import React, { useState, Component } from "react";
import { moviesUrl, moviesEPs } from "../config/config.json";
import movies from "../services/Movies";
import details from "../services/MovieDetails";
import Axios from "axios";
import "../css/form.css";
import {nanoid} from 'nanoid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const localStorage = require("local-storage");

const Search = ({ history, location, match }) => {
    const email = localStorage.get("email")
    const session_id = localStorage.get("session")

  //  const [type, setType] = useState();
 //   const [input, setInput] = useState();

    const [title, setTitle] = useState();
    const [year, setYear] = useState();
    const [director, setDirector] = useState();
    const [genre, setGenre] = useState();
    const [keyword, setKeyword] = useState();

    const [limit, setLimit] = useState();
    const [offset, setOffset] = useState();
    const [orderby, setOrderby] = useState();
    const [direction, setDirection] = useState();
    const [movieList, setMovies] = useState([]);

    const[movie, setMovie] = useState();

    var click = 0;
    
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
       
        //localStorage.set("type", type)
       // localStorage.set("input", input)

        localStorage.set("title", title)
        localStorage.set("year", year)
        localStorage.set("director", director)
        localStorage.set("genre", genre)

        localStorage.set("limit", limit)
        localStorage.set("offset", offset)
        localStorage.set("orderby", orderby)
        localStorage.set("direction", direction)

        console.log(keyword)

        if(keyword !== undefined){
            movies.browse(keyword, limit, offset, orderby, direction) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(response.data?.movies)
                setMovies(response.data?.movies)
                console.log(movieList)
            }
            )
            .catch(error => alert(error));
        }else{
            movies.search(title, year, director, genre, limit, offset, orderby, direction) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(response.data?.movies)
                setMovies(response.data?.movies)
                console.log(movieList)
            }
            )
            .catch(error => alert(error));
        }

       
    };

    const handleLinkClick = (e) =>{
        e.preventDefault();
        // var movie_id = e.target.getAttribute("movie_id");
        // var movie_title = e.target.getAttribute("title");
        // <MovieDetails myProp={movie_id,movie_title} />
        // this.state = {
        //     movie_id: e.target.getAttribute("movie_id"),
        //     title: e.target.getAttribute("title")
        //   }

        //onChange={(e) => setOrderby(e.target.value)}
        // genre={item.genre} keyword = {item.keyword} rating = {item.rating} 
        // budget={item.budget} overview = {item.overview} poster = {item.poster_path}

        // localStorage.set("movie_id", e.target.getAttribute("href"));
        // localStorage.set("movie_title", e.target.getAttribute("title"));
        // localStorage.set("movie_year", e.target.getAttribute("year"));

        // localStorage.set("movie_genre", e.target.getAttribute("genre"));
        // localStorage.set("movie_keyword", e.target.getAttribute("keyword"));
        // localStorage.set("movie_rating", e.target.getAttribute("rating"));

        // localStorage.set("movie_overview", e.target.getAttribute("overview"));
        // localStorage.set("movie_budget", e.target.getAttribute("budget"));
        // localStorage.set("movie_poster_path", e.target.getAttribute("poster_path"));

        var movie_id = e.target.getAttribute("href");
        details.details(movie_id) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(response.data?.movie)
                console.log(movie)
                //setMovie(response.data?.movie)
                //console.log(response.data?.movie)
                localStorage.set("movie_id", response.data?.movie.movie_id);
                localStorage.set("movie_title", response.data?.movie.title);
                localStorage.set("movie_year",response.data?.movie.year);
                
                var i =0;
                const genreList =[];
                response.data?.movie.genres.map((item) =>(        
                    genreList[i] = response.data?.movie.genres[i].name + ", ",
                    console.log( genreList[i]),
                    i++
                    
                ))
                localStorage.set("movie_genre", genreList);
                var j =0;
                const peopleList =[];
                response.data?.movie.people.map((item) =>(        
                    peopleList[j] = response.data?.movie.people[j].name + ", ",
                    console.log( peopleList[j]),
                    j++
                    
                ))
                localStorage.set("movie_people", peopleList);
                localStorage.set("movie_rating", response.data?.movie.rating);
                
                localStorage.set("movie_overview", response.data?.movie.overview);
                localStorage.set("movie_revenue", response.data?.movie.revenue);
                localStorage.set("movie_budget", response.data?.movie.budget);
                localStorage.set("movie_poster_path", response.data?.movie.poster_path);
                
            }
            )
            .catch(error => alert(error));

        
            // localStorage.set("movie_id", response.data?.movie.movie_id);
            // localStorage.set("movie_title", movie.title);
            // localStorage.set("movie_year",movie.year);
    
            // localStorage.set("movie_genre", movie.genre);
            // localStorage.set("movie_keyword", movie.keyword);
            // localStorage.set("movie_rating", movie.rating);
    
            // localStorage.set("movie_overview", movie.overview);
            // localStorage.set("movie_budget", movie.budget);
            // localStorage.set("movie_poster_path", movie.poster_path);
        
        history.push("detail");
    }
    function createData(title, year, director) {
       
        return { title, year, director };
      }

    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'year', label: 'Year', minWidth: 100 },
        {
          id: 'director',
          label: 'Director',
          minWidth: 170,
          
        },
      ];
    const rows = [
        // movieList.map((item) =>(
            
        //     createData('item.title', 'item.year', 'item.director')
        // ))
        // createData('India', 'IN', 1324171354, 3287263),
        // createData('China', 'CN', 1403500365, 9596961)
    ];

    const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
    });

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    function printTable(movieList){
        if(movieList != null)
        {
            // title = {item.title} year = {item.year} 
            //         genre={item.genre} keyword = {item.keyword} rating = {item.rating} 
            //         budget={item.budget} overview = {item.overview} poster = {item.poster_path} 
            movieList.map((item) =>(        
                rows.push(createData(<a href={item.movie_id} 
                    onClick ={handleLinkClick}>{item.title}</a>, item.year, item.director))
            ))
            console.log("not null")
            return(
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            
                            
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={nanoid()} >
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
         )
        }
    }

   
   
    return (
        <div className="form-box">
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                    <label className="form-label">Title:</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    /> 
                    
                    <label className="form-label">Year:</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setYear(e.target.value)}
                    /> 

                    <label className="form-label">Director:</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setDirector(e.target.value)}
                    /> 

                    <label className="form-label">Genre:</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setGenre(e.target.value)}
                    /> 

                    <label className="form-label">Keyword:</label>
                    <input
                        className="form-input"
                        type="text"
                       
                        onChange={(e) => setKeyword(e.target.value)}
                    /> 
                    

                    <label className="form-label"> Limit:</label>
                    <select name="limit" id="limit"  onChange={(e) => setLimit(e.target.value)}>
                        <option hidden value="choose">choose</option>
                        <option value="10" >10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>

                    <label className="form-label"> Offset:</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="ex:0"
                        onChange={(e) => setOffset(e.target.value)}
                    /> 

                    <label className="form-label"> Sort By:</label>
                    <select name="orderBy" id="orderBy"  onChange={(e) => setOrderby(e.target.value)}>
                        <option hidden value="choose">choose</option>
                        <option value="title">title</option>
                        <option value="year">year</option>
                        <option value="rating">rating</option>
                    </select>

                    <label className="form-label"> direction:</label>
                    <select name="direction" id="direction"  onChange={(e) => setDirection(e.target.value)}>
                        <option hidden value="choose">choose</option>
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                
                
                <button className ="form-button">Search</button>
                
                <div>{printTable(movieList)}</div>
                
              
            </form>     
            
           
        </div>      
    );
}

export default Search;





/*
  <tr dangerouslySetInnerHTML={makeTable()} />    

{__html: 
            '<td>' + movieList[0].title  + '</td>' +
            '<td>' + movieList[0].year + '</td>'+
            '<td>' + movieList[0].director + '</td>'+
            ' <td/>'  
        }
       
 '<td></td>' +
                        '<td>b</td>'+
                        '<td>c</td>'+
                        ' <td/>' 


'<td>' + item.title  + '</td>' +
                    '<td>' + item.year + '</td>'+
                    '<td>' + item.director + '</td>'+
                    ' <td/>' 



<tr key={movieList.id}>
                           
                        <td>{movieList[0].title}</td>
                            <td>{movieList[0].year}</td>
                            <td>{movieList[0].director}</td>
                            <td/>
                        </tr>



     const email = localStorage.get("email")
    const session_id = localStorage.get("session")

    const [type, setType] = useState();
    const [input, setInput] = useState();

    //console.log(email)
    //console.log(session_id)
    //console.log(type)
   // console.log(input)
    const [title, setTitle] = useState();
    const [year, setYear] = useState();
    const [director, setDirector] = useState();
    

   
    @param e Event

    
    
    //console.log(title)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(type === "title"){
            console.log(title)
            movies.search(title)
            .then(response => {alert(JSON.stringify(response.data, null, 4))})
            .catch(error => alert(error));
        }
        else if(type === "year"){
            console.log(year)
            movies.search(year)
            .then(response => {alert(JSON.stringify(response.data, null, 4))})
            .catch(error => alert(error));
        }else if(type === "director"){
            console.log(director)
            movies.search(director)
            .then(response => {alert(JSON.stringify(response.data, null, 4))})
            .catch(error => alert(error));
        }
    };

    const handleType = (e) =>{
        e.preventDefault();
        console.log(type === "title")
        if(type === "title"){
            setTitle(e.target.value)
            console.log(title)
        }else if(type === "year"){
            setYear(e.target.value)
            console.log(year)
        }else if(type === "director"){
            setDirector(e.target.value)
            console.log(director)
        }

    }

    return (
        <div className="form-box">
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>

                    <label className="form-label"> Filter:</label>
                    <select name="movieFilter" id="movieFilter"  onChange={(e) => setType(e.target.value)}>
                        <option hidden value="choose">choose</option>
                        <option value="title">title</option>
                        <option value="year">year</option>
                        <option value="director">director</option>
                    </select>
                
                    <label className="form-label">Search Bar:</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={handleType}
                    /> 
                    
                   
                   

               
                <button className ="form-button">Search</button>
            </form>

        </div>
    );
}

export default Search;
*/


// import React, { useEffect, useState } from "react";

// /*
//   Using localStorage is similar to how we use
//   dictionary.
  
//   To set a variable call `localStorage.set("key", value)`
//   To get a variable call `localStorage.get("key")`

//   Local Storage persists through website refreshes so
//   it is perfect for storing things we dont want to lose
//   like a users session

//   You must call `const localStorage = require("local-storage");`
//   in any class that you want to use this in, it is the same
//   local storage in the entire website regardless of where you call
//   it as each website gets the same instance of the storage.

//   So think of it as a global dictionary.
// */
// const Search = ({ history, location, match }) => {
//     const [ movieList, setMovieList] = useState([]);
//     const [ title, setTitle] = useState(undefined);
//     const [ genre, setGenre] = useState(undefined);

//    useEffect(() => {
//        // Movie.search(location.search)
//        // .then(response => {
//        //    setMovieList(response.data.movies);
//        // })
//     }, [location.search]);

//    const createQuery = () => {
//        return "title=" + title + "&" + "genre=" + genre;
//    }

//    const onclick = () => {
//        history.push("/search" + createQuery());
//    }

//     return (
//         <div className="form-box">
//             <h1>Search</h1>
//             <h1>{location.search}</h1>
//         </div>
//     );
// }

// export default Search;




/*
                    <label className="form-label"> Filter:</label>
                    <select name="movieFilter" id="movieFilter"  onChange={(e) => setType(e.target.value)}>
                        <option hidden value="choose">choose</option>
                        <option value="title">title</option>
                        <option value="year">year</option>
                        <option value="director">director</option>
                        <option value="genre">genre</option>
                        <option value="keyword">keyword</option>
                    </select>
                    */