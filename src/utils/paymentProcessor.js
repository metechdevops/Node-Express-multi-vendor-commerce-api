import config from '../config/config';
import axios from  'axios';

// Setting The powerTranz API Configurations
const APIHeader = {
  headers:{
    "PowerTranz-PowerTranzId": "88802476",
    "PowerTranz-PowerTranzPassword": "eD3ysMEduy1uac6yYBBJxpFiuUJ2mVAA3bFTWRjDyzaGfcBBW6PcOP0"
  }
};

export const processPaymentAuth = async (user,order,body) => {
    
  const {totalPrice,phone,shippingAddress} = order
  const { cardNumber, expMonth, expYear, cvc } = body;

  const PaymentData = {
    "TransactionIdentifier": user._id.toString(),
    "TotalAmount": totalPrice, 
    "CurrencyCode": "978", 
    "ThreeDSecure": true, 
    "Source":{
      "CardPan": cardNumber, 
      "CardCvv": cvc, 
      "CardExpiration": expYear, 
      "CardholderName": "John Doe"
    },
    "OrderIdentifier": order._id.toString(), 
    "BillingAddress": {
        "FirstName": user?.firstName,
        "LastName": user?.lastName,
        "Line1": shippingAddress.address,
        "City": shippingAddress?.city,
        "State": shippingAddress?.state,
        "PostalCode": shippingAddress.postalCode,
        "CountryCode": "840",
        "EmailAddress": user?.email, 
        "PhoneNumber": phone
    },
    "AddressMatch": false,
    "ExtendedData": {
        "ThreeDSecure": { 
                "ChallengeWindowSize": 4, 
                "ChallengeIndicator": "01"
        },
        "MerchantResponseUrl": "https://localhost:5001/Final",
        "HostedPage": {
            "PageSet": "GFRHPP", 
            "PageName": "HPPBilling1"
        } 
    }
  }

    // PowerTranz Call
    const PowerTranzResponse = await axios.post('https://staging.ptranz.com/api/spi/Auth',PaymentData,APIHeader)
    console.log(PowerTranzResponse);

    return PowerTranzResponse?.data;

}
  
  
