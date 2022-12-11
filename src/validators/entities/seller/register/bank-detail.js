export const bankDetail = {
    bankName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Bank name feild is required"
    },
    branchName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Branch name feild is required"
    },
    branchCode: {
        type: 'number',
        minLength: 1,
        minimum:0,
        errorMessage: "Branch code feild is required"
    },
    accountNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "Account number feild is required"
    },
    IBANNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "Bank IBAN number feild is required"
    },
}