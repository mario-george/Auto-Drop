import { useMemo } from 'react';
import CurrencyFormatter from '../../../../products/_components/CurrencyFormatter';

export default function ProductShipping({shipping,product}:any){
  const GetPriceFromCommission =  useMemo(() => {
    let total: number = 0,
      quantities: number = 0;
    const { vendor_commission } = product;

    total = collectValues?.length ? collectValues[0]?.original_price :initialValues.price ;
    
    
    const commissionPrice = total * ((vendor_commission || 0) / 100);
    const price = parseFloat((total + commissionPrice).toFixed(2));
  
    setFieldValue('price', price);
    return commissionPrice;
  }, [product.vendor_commission, values.vendor_commission]);
  const getEiring = (shipCost:number)=>{
    if(product)  return (GetPriceFromCommission -  (shipCost + (0.07 * (product.main_price + shipCost)))).toFixed(2)
    else return 0
  }
    return <>
    {
                shipping?.length ?   <div className="space-y-4">
                <p className="text-lg font-semibold text-content">Shipping</p>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-x-5 items-center justify-around gap-y-5'>

                
                {shipping?.map((option: any, index: number) => {
                  return (
                    <div style={{border:'2px solid #d1c2c2'}}
                      className=" flex  flex-col border-gray-500  rounded-lg  gap-y-3"
                      key={'option-' + index}
                    >
                      {
                            option.service_name === 'CAINIAO_CONSOLIDATION_SA'  ?
                            <span className='text-white bg-red-500 w-full  text-xs px-3 py-2 rounded-t-lg text-center'> Recommend </span> : null
                          }
                      <div className='flex w-full justify-between items-center px-2 pt-2 '>
                          <div className='flex items-center gap-x-2'>
                            {option.service_name === 'CAINIAO_CONSOLIDATION_SA'  ?<>
                            <p className={`text-sm text-gray-600 `} >AliExpress Direct</p>
                            </>  : option.service_name ===  'CAINIAO_STANDARD' ?<>
                              <p className={`text-sm text-gray-600 `} >AliExpress Standard Shipping</p></>  :  <p className={`text-sm text-gray-600 `} > { option.shipping_method || option.service_name }</p>}
                           
                          </div>
                          <p className="text-xs  text-red-500">{CurrencyFormatter(option.freight.amount || option.freight.cent /100)}</p>
                      </div>
                        <p className="text-xs px-2">Esimated Delivery Days : <span className='text-teal-600'>{option.estimated_delivery_time}</span></p>     
                        <p className="text-xs px-2 mb-4">Earning from this product based on this shipping methode and 7% VAT will be <span className='text-teal-600'>SAR {getEiring(option.freight.amount || option.freight.cent /100)}</span> </p>     
                    </div>
                  );
                })}
                </div>
              </div>
                 : <div className='flex justify-center items-center text-red-700'>Product Shipping Not Avaliable</div>
              }</>
}