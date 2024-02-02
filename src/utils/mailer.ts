import { Subscription } from '../types';
import { Order } from "../types"  
import { ClientSecretCredential } from '@azure/identity'; 
import * as dotenv from 'dotenv';
import { Client } from '@microsoft/microsoft-graph-client';
import {imageToBase64} from './utilities';    
import ejs from 'ejs';
import path from 'path';
const fs = require('fs');


export const OrderReceived =  async(order: Order): Promise<boolean> => {
    console.log("services - Mailer/OrderReceived - Start");  
    const res  =   await SendMailOrder(order);   
    console.log(`Email sent to order ${order.order_id}`);  
    console.log("services - Mailer/OrderReceived - End");    
    return res; 

}

export const PaymentReceived = (order: Order): void => {
    console.log("services - Mailer/OrderReceived - Start");
    console.log(`Email sent to order ${order.order_id}`);
    console.log("services - Mailer/OrderReceived - End");
}

export const OrderShipped = (order: Order): void => {
    console.log("services - Mailer/OrderReceived - Start");
    console.log(`Email sent to order ${order.order_id}`);
    console.log("services - Mailer/OrderReceived - End");
}

export const SubscriptionCreated = (subs: Subscription): void => {
    console.log("services - Mailer/SubscriptionCreated - Start");
    //console.log(`Email sent to order  ${order.order_id}`);
    console.log("services - Mailer/OrderReceived - End");
}

const tenantId = 'fd1f35a4-a17d-4d25-9135-a8c37d70fba6';
const clientId = 'dbe13f8d-0c8e-4a93-a4ea-222bb5bfafe9';
const clientSecret = 'ezf8Q~eluP.3Wx~bMOXBa0M_pSeyM59583vbBdb~';
const scopes = ['https://graph.microsoft.com/.default'];

const clientSecretCredential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret
);

const graphClient = Client.initWithMiddleware({
    authProvider: {
        getAccessToken: async () => {
            const tokenResponse = await clientSecretCredential.getToken(scopes);
            return tokenResponse.token;
        },
    },
});

const SendMailOrder = async (order:Order) : Promise<boolean> => {
    
let emailOptions
 try {
    const ejsTemplatePath = path.join('./src/utils/templates/order', 'index.ejs'); 
    const ejsTemplate = fs.readFileSync(ejsTemplatePath, 'utf-8'); 

    // const imgTemplatePath = path.join('./src/utils/templates/order', 'images'); 

    // const imagePath= path.join('./src/utils/templates/order/images')
    // const imageDataArray = [imgTemplatePath + "\\image-7.png", imgTemplatePath + "\\image-4.png"];

    // const imageSources = await Promise.all(imageDataArray.map(imagePath => imageToBase64(imagePath)));
    // console.log("🚀 ~ SendMailOrder ~ imageSources:", imageSources)

      

    const imageSources: string[] = [];
    await Promise.all(order.products.map(async (product) => {
        //const imageSource: string = await imageToBase64(product.image) as string;
        imageSources.push(product.image );
    }));

    console.log("🚀 ~ imageSources ~ imageSources:", imageSources)

    const htmlTemplate = ejs.render(ejsTemplate, { imageSources });  
     emailOptions = {
        message: {
            subject: 'Subject of your email',
            body: {
                contentType: 'HTML',
                content: htmlTemplate,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'damiano.ceka83@gmail.com',
                    },
                },
            ],
        },
        saveToSentItems: false,
    };  
    await graphClient.api('/users/info@smartshopperpay.com/sendMail').post(emailOptions);
    return true;
 } catch (error) {  
    console.log("🚀 ~ SendMailOrder ~ error:", error)  
    return false;       
    
 }
    return false;       
}