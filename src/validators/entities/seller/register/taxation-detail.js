export const taxationDetail = {
    BIRNumber: {
        type: 'number',
        minimum:0,
        errorMessage: "BIR number feild is required"
    },
    taxNumber: {
        type: 'number',
        minimum:0,
        errorMessage: "TAX number feild is required"
    },
    VATNumber: {
        type: 'number',
        minimum:0,
        errorMessage: "VAT number feild is required"
    }
}