export interface CustomerDataType {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    mobile: string | undefined;
    mobile_code: string | undefined;
    country: string | undefined;
    region: string | undefined;
    city: string | undefined;
    postalCode: string | undefined;
    district: string | undefined;
    address: string | undefined;
  }
  export interface OrderCustomerProps {
    firstNameText: string;
    lastNameText: string;
    firstName: string;
    lastName: string;
    emailText: string;
    email: string;
    locale: string;
    phoneText: string;
    mobile: string;
    mobile_code: string;
    countryText: string;
    country: string;
    cityText: string;
    city: string;
    districtText: string;
    district: string;
    address: string;
    addressText: string;
    postalCode: string;
    postalCodeText: string;
    region: string;
    regionText: string;
    editCustomerHandler: (data: CustomerDataType) => void;
    editText: string;
    deliveryDetails: string;
  }
  
  export interface GridItem {
    title: string | undefined;
    value: string | undefined;
    ref: React.RefObject<HTMLInputElement> | undefined;
    secondRef?: React.RefObject<HTMLInputElement> | undefined;
    secondValue?: string | undefined;
  }