import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance"

interface UpdateCustomerDetailsProps {
first_name:string
last_name:string
country:string
city:string
country_code:string
postal_code:string
district :string
street :string
email :string
full_mobile: string
mobile :string
mobile_code :string
}
const catchAsync = (fn: Function) => {
    return async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (err) {
        console.error(err);
        // Handle the error here or rethrow it
      }
    };
  };
 
export const UpdateCustomerDetails = async(props:UpdateCustomerDetailsProps)=>{
    let res = await axiosInstance.patch( "/orders/customerDetails",props)
    return
}