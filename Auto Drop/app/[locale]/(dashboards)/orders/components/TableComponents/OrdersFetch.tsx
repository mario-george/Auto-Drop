"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import ColsExtract from "./ColumnsExtractor";
import { setKeyValue } from "@/store/productsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useLoaderProducts from "@/components/loader/useLoaderProducts";
type Orders = string | any[];
export default function OrdersFetch(props: any) {
  // const { LoaderComponent } = useLoaderProducts();
  // let {orders} = props
  const [myOrders, setMyOrders] = useState<Orders>([]);
  const [noOrders, setNoOrders] = useState<boolean>(false);


  let dateExtractor = (dateStr: string) => {
    const date = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);

    const day = date.getDate();
    /* let suffix = 'th';
if (day % 10 === 1 && day !== 11) {
  suffix = 'st';
} else if (day % 10 === 2 && day !== 12) {
  suffix = 'nd';
} else if (day % 10 === 3 && day !== 13) {
  suffix = 'rd';
}
 */
    // const formattedDateWithSuffix = formattedDate.replace(/\d+$/, match => match +suffix);
    return formattedDate;
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosInstance.get("/orders/getOrder");
      let { data, status } = res;
      console.log("ordersssssss",data)
      if (status >= 200 && status < 300) {
        if (data.data.length == 0) {
          setMyOrders([]);
          setNoOrders(true);
        } else {
          let orders = data.data.map((order: any) => {
            let { updatedAt, order_id, paid, payment_method,customerName :sender,customer,totalPrice,amounts,status} = order;
let amount = totalPrice.toFixed(2)
 let  currStatus :
    | "created"
    | "in_review"
    | "in_transit"
    | "in_progress"
    | "canceled"
    | "completed" = order.status

if(totalPrice==0){
              amount = amounts?.total?.amount
              // console.log("order_id",order_id)
            }
            let senderName = `${ customer.first_name} ${customer.last_name}`
       /*      let orderStatus="Created";
            if (paid) {
              orderStatus="Completed";
            } else if (payment_method) {
            } */
            return {
              ...order,
              // amount: order.totalPrice.toFixed(2),
              amount,
              date: dateExtractor(updatedAt),
              orderStatus:status,
              orderNumber: order_id,
              orderItems: order.orderItems,
              orderAddress: order.orderAddress,
              sender:senderName
              // sender
            };
          });
          setMyOrders(orders);
        }
      } else {
        setMyOrders("fail");
        console.log("fail");
      }
      console.log(res);
    };
    fetchOrders();
  }, []);
  // const [allProdCategories, setAllProdCategories] = useState([]);
  // const [loadProducts, setLoadProducts] = useState(false);
  /*  const reloadProducts = useSelector(
    (state: any) => state.products.reloadProducts
  );
  const reloadPage = useSelector((state: any) => state.products.reloadPage);
  const dispatch = useDispatch();
  useEffect(() => {
    let getProductsInfo=async()=>{

let fetchInfoUrls = ["/aliexpress/product/getProducts","/salla/getProductsCategories"]
let fetchInfoPromises =  fetchInfoUrls.map((url:string)=>{
return  axiosInstance.get(url)
})
try{
let fetchInfoResolved = await Promise.allSettled(fetchInfoPromises)
console.log("fetchInfoResolved",fetchInfoResolved)  
fetchInfoResolved.forEach((resp,i:number)=>{
console.log("resp",resp)
  if(resp.status=="rejected"){
    throw new Error("Promise Failed" + resp.reason)
  }
if(i==0){
setMyProducts(
  resp.value.data.userProducts.map((product: any) => {
    return {
      ...product,
      prodName: product.name,
      category:
        product.category_name || product.first_level_category_name,
      prodImage: product.images[0].original,
      sellPrice: product.price,
      inventory: product.quantity,
      platform: props.locale == "ar" ? "علي اكسبرس" : "Aliexpress",
    };
  })
);
}else{
let productsCategories = resp.value.data.data;
setAllProdCategories(productsCategories);
}
if(  fetchInfoResolved[0].status == "fulfilled"){
console.log("fetchInfoResolved[0].value.data.userProducts",fetchInfoResolved[0].value.data.userProducts)
  dispatch(
     setKeyValue({
       key: "currentProductsList",
       value: fetchInfoResolved[0].value.data.userProducts,
     })
   );
}
    dispatch(
      setKeyValue({
        key: "loadingProductTable",
        value: false,
      })
    );

})
}catch(err){
console.error(err)
}
    }
    getProductsInfo()
  }, [loadProducts, reloadProducts, reloadPage]); */

  /*   if (!myProducts) {
    return <div>Loading...</div>; 
  } */

  return (
    <>
      {/* {LoaderComponent}{" "} */}
      <div
        className={` tableContainer dark:bg-[#2e464f] dark:text-white flex flex-1 justify-center ${
          myOrders.length > 0 && `!mx-auto`
        } lap:min-w-full `}
      >
        <ColsExtract
          {...props}
          orders={myOrders}
          // setMyProducts={setMyProducts}
          // setLoadProducts={setLoadProducts}
          // allProdCategories={allProdCategories}
          noOrders={noOrders}
        />
      </div>
    </>
  );
}
