import React, {useEffect,  useState, Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import {nanoid} from 'nanoid'
import billing from "../services/getPrice";

const localStorage = require("local-storage");


const ShoppingCart = ({history, location, match}) => {
    const number = localStorage.get("number")
    const movie_title = localStorage.get("movie_title")
    const email = localStorage.get("email")
    //const items = [localStorage.get("items")]
    const [items, setItems] = useState([]);
    const [newQuantity, setnewQuantity] = useState();
    const [newDiscount, setnewDiscount] = useState();
    const movie_id = localStorage.get("movie_id")

   

    console.log(items)

    const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
        
      });

      const useStyles2 = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

      const classes2 = useStyles2();

      
      function ccyFormat(num) {
        return `${num.toFixed(2)}`;
      }
      
      function priceRow(qty, unit) {
        return qty * unit;
      }
      
      function createRow(desc, movie_id, qty, unit, dis) {
        const price = priceRow(qty, unit) * (1-dis);
        return {desc, movie_id, qty, unit, dis, price };
      }
      
      
      const rows = [];
      
      const classes = useStyles();

      function inputChange(e){
        alert(e.target.value)
        this.setState({
            newQ:e.target.value
        })
    }

      

      //Todo 
      function updateQuantity(email, movie_id, newQuantity){
          console.log("newQuantity!!!!!!")
          console.log(newQuantity)
            billing.cart_update(email, movie_id, newQuantity) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
                console.log(email);
                console.log(movie_id);
                console.log(newQuantity);
                // console.log(response.data?.items)
                // setItems(response.data?.items);
                
                //localStorage.set("items", items);
                //console.log(items.movie_id)
                // localStorage.set("unit_price", response.data?.unit_price);
                // localStorage.set("discount", response.data?.movie.discount);
            }
            )
            .catch(error => alert(error));

        
      }

      //Todo 
      function updateDiscount(email, discount_code){
        console.log("discount_code!!!!!!")
        console.log(discount_code)
          billing.discount_apply(email, discount_code) //type, input,
          .then(response => {alert(JSON.stringify(response.data, null, 4))
              console.log(email);
              console.log(discount_code);
             // setItems(response.data?.items);
              
          }
          )
          .catch(error => alert(error));
 
    }

      //Todo
      function deleteItem(email, movie_id){
            billing.cart_delete(email, movie_id) //type, input,
            .then(response => {alert(JSON.stringify(response.data, null, 4))
            }
            )
            .catch(error => alert(error));

      }
      
      function getCart(discount_code){
          //get price from cart

          if(newDiscount != undefined){
           
              console.log("getCart-discount_apply")
              console.log(discount_code)
                billing.discount_apply(email, discount_code) //type, input,
                .then(response => {alert(JSON.stringify(response.data, null, 4))
                    console.log(email);
                    console.log(discount_code);
                    setItems(response.data?.items);
                   // setItems(response.data?.items);
                    
                }
                )
                .catch(error => alert(error));
       
          
        }else{
          console.log("getCart-cart_retrieve")
          billing.cart_retrieve(email) //type, input,
          .then(response => {alert(JSON.stringify(response.data, null, 4))
              console.log(email);
              console.log(response.data?.items)
              setItems(response.data?.items);
              
              //localStorage.set("items", items);
              //console.log(items.movie_id)
              // localStorage.set("unit_price", response.data?.unit_price);
              // localStorage.set("discount", response.data?.movie.discount);
          }
          )
          .catch(error => alert(error));
        }
       


      }

      function payInPayPal(email){
          console.log("go to paypal")
        billing.order_place(email) //type, input,
        .then(response => {alert(JSON.stringify(response.data, null, 4))
            console.log(email);
            console.log(response.data?.approve_url);
            window.open(response.data?.approve_url, '_blank');
           //history.push(response.data?.approve_url)
            //approve_url
            
            //localStorage.set("items", items);
            //console.log(items.movie_id)
            // localStorage.set("unit_price", response.data?.unit_price);
            // localStorage.set("discount", response.data?.movie.discount);
        }
        )
        .catch(error => alert(error));
      }

      function handleOnChange(e){
        setnewQuantity(e.target.value)
      }

      function showCart(items){
          var total = 0;
          var i = 0;
          if(items != null){
            items.map((item) =>(        
                rows.push(createRow(item.movie_title, item.movie_id, item.quantity, item.unit_price, item.discount)),
                total += item.quantity * item.unit_price * (1 - item.discount)
            ))
    
        return (
            
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
            
          </TableRow>
          <TableRow >
            <TableCell>Movie</TableCell>
            <TableCell>Movie id</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">New Discount Code</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.movie_id}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.dis}</TableCell>
              <TableCell align="right">
                <input
                className={"input"}
                type="text"
                value={newDiscount}
                onChange={(e) => setnewDiscount(e.target.value)}
              /> 
                <button onClick = { ()=>updateDiscount(email, newDiscount)}>APPLY</button>
              </TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right">

                <input
                className={"input"}
                type="text"
                value={newQuantity}
                onChange={(e) => setnewQuantity(e.target.value)}
                
              /> 
              {console.log(newQuantity)}
                {/* <form className={classes2.root} noValidate autoComplete="off">
                  <TextField id="standard-basic" label="Standard" />
                
                  </form> */}
                <button onClick = { ()=>updateQuantity(email, row.movie_id, newQuantity)}>Update</button>

             </TableCell>
             
              <TableCell align="right"><button onClick={() =>deleteItem(email, row.movie_id)} className="delete" >Delete</button></TableCell> 
              {/* onClick={deleteItem(email, row.movie_id)} */}
              
            </TableRow>
          ))}

         
          
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    
        );
          }
        
      }
      
    return ( 
        <div className="form-box">
            <h1>ShoppingCart </h1>
            <button className="showCart" onClick={()=>getCart(newDiscount)}>Show cart...</button>
           
            
            {/* <input
                className={"input"}
                type="text"
                value={newDiscount}
                onChange={(e) => setnewDiscount(e.target.value)}
            /> 
            <button onClick = { ()=>updateDiscount(email, newDiscount)}>APPLY</button>
             */}
            <div>{showCart(items)}</div>



            <button className="pay" onClick={() =>payInPayPal(email)}>Pay</button>

        </div>
        
    );
}


export default ShoppingCart;