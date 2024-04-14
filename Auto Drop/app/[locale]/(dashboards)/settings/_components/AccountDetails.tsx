import Image from "next/image";
import { useSelector } from "react-redux";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import "./settings.css";

interface AccountDetails {
  settings: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveChanges: string;
  changePassword: string;
  changeAccountDetails: string;
  merchantID: string;
  name: string;
  marketName: string;
  marketLink: string;
  email: string;
  phone: string;
  country: string;
  locale?: string;
}

export default function AccountDetails(props: AccountDetails) {
  const user = useSelector((state: RootState) => state.user);
  let userName = user.name;
let {storeName,storeLink} = user
  let userId = user.id;
  let userEmail = user.email;
  let userPhone = user.phone;
  let userCountry = user.country;
  let userImage = user.image;
  const {
    locale,
    name,
    marketName,
    marketLink,
    country,
    merchantID,
    email,
    phone,
  } = props;
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
          <div className="flex justify-center tab:justify-end  max-w-[90%] tab:max-w-[60%] ">
            <div className="relative ">
              <Image
                src={userImage}
                width={168}
                height={168}
                alt="user"
                className="mx-auto tab:ml-[4rem] "
              />
              <div className="absolute bottom-6 right-6 bg-black rounded-full px-[3px] py-[5px] border-4 border-white">
                <Image
                  src={"/client/settings/Camera.svg"}
                  alt="camera"
                  width={19}
                  height={15}
                />{" "}
              </div>
            </div>
          </div>
          <div className="formFieldWrapper   ">
            <div>{merchantID}</div>
            <Input
              className="inputFieldDisabled"
              defaultValue={userId}
              disabled
            />
          </div>
          <div className="formFieldWrapper  ">
            <div>{name}</div>
            <Input className="inputField" value={userName} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketName}</div>
            <Input className="inputField" value={storeName} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketLink}</div>
            <Input className="inputField" value={storeLink}/>
          </div>
          <div className="formFieldWrapper  ">
            <div>{email}</div>
            <Input className="inputField" value={userEmail} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{phone}</div>
            <Input className="inputField" value={userPhone} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{country}</div>
            <Input className="inputField" value={userCountry} />
          </div>
        </div>
      </MotionWrapper>
    </>
  );
}
