import React, {useEffect,  useState, Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {nanoid} from 'nanoid'
import billing from "../services/getPrice";

const localStorage = require("local-storage");


const OrderHistory = ({history, location, match}) => {
    const email = localStorage.get("email")
    //const items = [localStorage.get("items")]
    const [transactions, setTransactions] = useState([]);

    function getHistory(){
        //get price from cart
      billing.order_retrieve(email) //type, input,
      .then(response => {alert(JSON.stringify(response.data, null, 4))
          console.log(email);
          console.log(response.data?.transactions)
          setTransactions(response.data?.transactions);
          
          //localStorage.set("items", items);
          //console.log(items.movie_id)
          // localStorage.set("unit_price", response.data?.unit_price);
          // localStorage.set("discount", response.data?.movie.discount);
      }
      )
      .catch(error => alert(error));
    }

    const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
      });
      
      function ccyFormat(num) {
        return `${num.toFixed(2)}`;
      }
      
      function priceRow(qty, unit) {
        return qty * unit;
      }
      
      //item.movie_id, item.quantity, item.unit_price, item.discount, item.sale_date
      //item.capture_id, item.amount.total, item.transaction_fee.value, item.sale_date)
      function createRow(capture_id, amount, transFee, date) {
        const price = parseFloat(amount) + parseFloat(transFee);
        return {capture_id,  amount, transFee, date, price };
      }
      
      
      const rows = [];
      
      const classes = useStyles();

      function inputChange(e){
        alert(e.target.value)
        this.setState({
            newQ:e.target.value
        })
    }


    function showHistory(email){
        var total = 0;
        if(transactions != null){
            transactions.map((item) =>(        
              rows.push(createRow(item.capture_id, item.amount.total, item.transaction_fee.value, item.create_time))
            //   total += item.quantity * item.unit_price * (1 - item.discount)
          ))
            
  
      return (
          
        <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="spanning table">
      <TableHead>
        
        <TableRow>
         
          <TableCell>Capture id</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Transaction fee</TableCell>
          <TableCell align="right">Sum</TableCell>
          <TableCell align="right">Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={nanoid()}>
           
            <TableCell>{row.capture_id}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">{row.transFee}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.date}</TableCell>
          
           
            
          </TableRow>
        ))}

       
        
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell align="right">{ccyFormat(total)}</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  </TableContainer>
      );
        }
      
    }
    
    return (
        <div className="form-box">
            <h1>OrderHistory </h1>
            <button className="show History" onClick={getHistory}>Show History...</button>
            
            <div>{showHistory(email)}</div>

        </div>
    );
}


export default OrderHistory;
