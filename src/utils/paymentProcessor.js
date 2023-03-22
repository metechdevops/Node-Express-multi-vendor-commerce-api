import config from '../config/config';
import axios from  'axios';
import { v4 as uuidv4 } from 'uuid';

// Setting The powerTranz API Configurations
const APIHeader = {
  headers:{
    "PowerTranz-PowerTranzId": config.powerTranz.user,
    "PowerTranz-PowerTranzPassword": config.powerTranz.password,
    "Content-Type": "application/json"
  }
};

axios.defaults.baseURL = config.powerTranz.api;

export const processPaymentAuth = async (user,order,body) => {
    
  const {totalPrice,shippingAddress} = order
  const {city,state,address,firstName,lastName,email} = shippingAddress

  const HHPData = {
    "TransactionIdentifier": uuidv4(),
    "TotalAmount": totalPrice, 
    "CurrencyCode": 780, 
    "ThreeDSecure": false, 
    "Source": {},
    "OrderIdentifier": order._id,//uuidv4(), 
    "BillingAddress": {
        "FirstName": firstName,
        "LastName": lastName,
        "Line1": address, 
        "Line2": "Unit 15",
        "City": city,
        "State": state,
        "PostalCode": "200341",
        "CountryCode": "840",
        "EmailAddress": email, 
        "PhoneNumber": "211-345-6790"
    },
    "AddressMatch": false,
    "ExtendedData": {
        "ThreeDSecure": { 
                "ChallengeWindowSize": 4, 
                "ChallengeIndicator": "01"
        },
        "MerchantResponseUrl": body.callBack,
        "HostedPage": {
            "PageSet": "TestingPage", 
            "PageName": "PayNow"
        } 
    }
  }

  // const cardData = {
  //   "TransacctionIdentifier": uuidv4(),
  //   "TotalAmount": 7.99,
  //   "CurrencyCode": 780,
  //   "ThreeDSecure": true,
  //   "Source": {
  //       "CardPan": "4012000000020071",
  //       "CardCvv": "123",
  //       "CardExpiration": "2512",
  //       "CardholderName": "John Doe"
  //   },
  //   "OrderIdentifier": order._id,
  //   "BillingAddress": {
  //       "FirstName": "John",
  //       "LastName": "Smith",
  //       "Line1": "1200 Whitewall Blvd.",
  //       "Line2": "Unit 15",
  //       "City": "Boston",
  //       "State": "NY",
  //       "PostalCode": "200341",
  //       "CountryCode": "840",
  //       "EmailAddress": "john.smith@gmail.com",
  //       "PhoneNumber": "211-345-6790"
  //   },
  //   "AddressMatch": false,
  //   "ExtendedData": {
  //       "ThreeDSecure": {
  //           "ChallengeWindowSize": 4,
  //           "ChallengeIndicator": "01"
  //       },
  //       "MerchantResponseUrl":  "https://ef60-2400-adc5-442-9d00-891-d7a0-3c48-34cd.in.ngrok.io/api/lookup-data/process-payment"
  //   }
  // }

  try {
    
    // PowerTranz Payment Auth with iFrame Data
    const PowerTranzResponse = await axios.post('spi/auth',HHPData,APIHeader)
    return PowerTranzResponse?.data;    

  } catch (error) {
    return error
  }

}

export const completePaymentAuth = async ({spiToken}) => {
  
    // Set Header
    const config = {
      method: 'post',
      url: 'spi/Payment',
      headers: { 
        'accept':"text/plain'",
        'Content-Type': 'application/json-patch+json',
      },
      data : `"${spiToken}"`
    };

    try {
      const response = await axios(config)
      
      return {
        type: 'Success',
        statusCode: 200,
        message: response.data.ResponseMessage,
        payload:response.data
      };

    } catch (error) {
      
      return {
        type: 'Error',
        message: error.message,
        statusCode: 400
      };
    }
}
  
  
