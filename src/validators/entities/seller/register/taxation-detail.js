export const taxationDetail = {
    BIRNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "BIR number feild is required"
    },
    taxNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "TAX number feild is required"
    },
    VATNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "VAT number feild is required"
    }
}