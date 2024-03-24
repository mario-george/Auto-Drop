export interface Shipping{
    error_code?:boolean
    estimated_delivery_time:string
    service_name:string
    shipping_method:string
    tracking_available:boolean

    freight:{
        cent:number
        currency_code:string

currency : {

currencyCode: string
defaultFractionDigits: number
displayName: string
numericCode: number
symbol: string
}
    }
}