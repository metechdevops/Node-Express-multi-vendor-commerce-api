import config from '../config/config';
import axios from  'axios';

// Setting The powerTranz API Configurations
const APIHeader = {
  headers:{
    "PowerTranz-PowerTranzId": "88802476",
    "PowerTranz-PowerTranzPassword": "eD3ysMEduy1uac6yYBBJxpFiuUJ2mVAA3bFTWRjDyzaGfcBBW6PcOP0",
    "Content-Type": "application/json"
  }
};

export const processPaymentAuth = async (user,order,body) => {
    
  const {totalPrice,phone,shippingAddress} = order
  const { cardNumber, expMonth, expYear, cvc } = body;

  const userID = user._id.toString()

  const HHPData = {
    "TransactionIdentifier": "89876ff5-a44a-4e1f-bf71-8f224823c439",
    "TotalAmount": 10, 
    "CurrencyCode": "978", 
    "ThreeDSecure": false, 
    "Source": {},
    "OrderIdentifier": "INT-245d0301-5170-406c-abb7-750aadce9173-Orc3570", 
    "BillingAddress": {
        "FirstName": "John",
        "LastName": "Smith",
        "Line1": "1200 Whitewall Blvd.", "Line2": "Unit 15",
        "City": "Boston",
        "State": "NY",
        "PostalCode": "200341",
        "CountryCode": "840",
        "EmailAddress": "john.smith@gmail.com", 
        "PhoneNumber": "211-345-6790"
    },
    "AddressMatch": false,
    "ExtendedData": {
        "ThreeDSecure": { 
                "ChallengeWindowSize": 4, 
                "ChallengeIndicator": "01"
        },
        "MerchantResponseUrl": "https://99e0-2400-adc5-442-9d00-ec36-6003-498d-8743.in.ngrok.io/",
        "HostedPage": {
            "PageSet": "GFRHPP", 
            "PageName": "HPPBilling1"
        } 
    }
}

    // PowerTranz Call
    const PowerTranzResponse = await axios.post('https://staging.ptranz.com/api/spi/Auth',HHPData,APIHeader)
    console.log(PowerTranzResponse);

    return PowerTranzResponse?.data;

}
  
  
