interface ShippingStatusAfterSendProps {
    shipStatus : string;
    supplier: string;
    Warehouse : string;
    client: string


}

const ShippingStatusAfterSend = (props:ShippingStatusAfterSendProps) => {
 
     const {shipStatus,supplier,Warehouse,client} = props;
      

    return (
        <div className="p-3">
            <p className="text-sm text-gray-500">{shipStatus}</p>

        <div className="grid grid-cols-3 border rounded-xl border-gray-500">
            <div className="flex flex-col justify-between space-y-3">
            <p className="text-sm text-gray-500">{supplier}</p>
            <p className="text-sm text-gray-500">{Warehouse}</p>
            <p className="text-sm text-gray-500">{client}</p>

            </div>
            <div className="flex flex-col justify-between space-y-3">
        
DoneCircleSVG
            </div>
            <div className="flex flex-col justify-between space-y-3">
           

            </div>
          <div>
            <p className="text-sm text-gray-500">{shipStatus}</p>
            <p className="text-sm text-gray-500">{supplier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{Warehouse}</p>
            <p className="text-sm text-gray-500">{client}</p>
          </div>
        </div>
      </div>)
}
export default ShippingStatusAfterSend