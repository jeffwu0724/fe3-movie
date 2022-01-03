import Socket from "./Socket";
import { baseUrl, billingEPs } from "../config/config.json";
import Gateway from "./Gateway";

// "cart_insertEP": "/cart/insert",
//     "cart_updateEP": "/cart/update",
//     "cart_deleteEP": "/cart/delete",
//     "cart_retrieveEP": "/cart/retrieve"
async function cart_insert(email, movie_id, quantity) {
    const payLoad = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.cart_insertEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function cart_update(email, movie_id, quantity) {
    
    const payLoad = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
    };
    
  
    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.cart_updateEP, // Path of URL
        data: payLoad // Data to send in Body
    }
  
    const response = await Socket.POST(options)
    return await Gateway.getReport(response);
  }

  async function cart_delete(email, movie_id) {
    const payLoad = {
        email: email,
        movie_id: movie_id
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.cart_deleteEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function cart_retrieve(email) {
    const payLoad = {
        email: email
       
    };
  
    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.cart_retrieveEP, // Path of URL
        data: payLoad // Data to send in Body
    }
  
    const response = await Socket.POST(options)
    return await Gateway.getReport(response);
  }

  async function order_place(email) {
    const payLoad = {
        email: email,
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.order_placeEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function order_retrieve(email) {
    const payLoad = {
        email: email
    };
  
    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.order_retrieveEP, // Path of URL
        data: payLoad // Data to send in Body
    }
  
    const response = await Socket.POST(options)
    return await Gateway.getReport(response);
  }

async function order_complete(token,payer_id) {
    const payLoad = {
        token: token,
        payer_id:payer_id
    };
  
    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.order_completeEP, // Path of URL
        data: payLoad // Data to send in Body
    }
  
    const response = await Socket.GET(options)
    return await Gateway.getReport(response);
  }
  
  //discount_create(email, code, discount, sale_start, sale_end, limit)
async function discount_create(email, code, discount, sale_start, sale_end, limit) {
    const payLoad = {
        email: email, 
        code: code, 
        discount: discount, 
        sale_start: sale_start, 
        sale_end: sale_end, 
        limit: limit
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.discount_createEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options)
    return await Gateway.getReport(response);
}

async function discount_apply(email, discount_code) {
    const payLoad = {
        email: email, 
        discount_code: discount_code
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: billingEPs.discount_applyEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options)
    return await Gateway.getReport(response);
}

export default {
    cart_insert,
    cart_update,
    cart_delete,
    cart_retrieve,
    order_place,
    order_retrieve,
    order_complete,
    discount_create,
    discount_apply
};
