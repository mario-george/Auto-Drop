import { RootState } from "@/store";
import { userActions } from "@/store/user-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface SubscriptionHandlerProps {
    params: {
        subscriptionData: string;
    };
    
}

export default function SubscriptionHandler(props:{params:{subscriptionData:string}}){
const {subscriptionData} = props.params;

const data = JSON.parse(decodeURIComponent(subscriptionData as string));
const dispatch = useDispatch();
const currentUser = useSelector((state: RootState) => state.user.id);

if(data){
    dispatch(userActions.changeSubsctiption({}))
}

return <></>
}