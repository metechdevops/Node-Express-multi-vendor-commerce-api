export const bankDetail = {
    bankName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Bank name feild is required"
    },
    branchName: {
        type: ['string','null'],
        errorMessage: "Branch name feild is required"
    },
    branchCode: {
        type: ['number','null'],
        errorMessage: "Branch code feild is required"
    },
    accountNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "Account number feild is required"
    },
    IBANNumber: {
        type: ['string','null'],
        errorMessage: "Bank IBAN number feild is required"
    },
}