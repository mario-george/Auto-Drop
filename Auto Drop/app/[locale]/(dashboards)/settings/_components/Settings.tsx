"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderContainer from "../../_components/shared/HeaderContainer";
import SettingsSVG from "@/components/icons/ClientSVGs/SettingsSVG";
import { RootState } from "@/store";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import { useSelector } from "react-redux";

interface SettingsProps {
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

export default function Settings({
  settings,
  currentPassword,
  newPassword,
  confirmPassword,
  saveChanges,
  changePassword,
  changeAccountDetails,
  merchantID,
  name,
  marketName,
  marketLink,
  email,
  phone,
  locale,
  country,
}: SettingsProps) {
  const user = useSelector((state: RootState) => state.user);
  let userName = user.name;
  let userId = user.id;
  let userEmail = user.email;
  let userPhone = user.phone;
  let userCountry = user.country;
  let userImage = user.image;
  console.log(user);
  const isAr = locale === "ar";
  return (
    <MotionWrapper locale={locale}>
      <div
        className={`relative bg-white  text-[#253439]   rounded-lg  !px-0 mt-4 overflow-hidden ${isAr?`ml-3 tab:ml-3 tab:mr-3`:`mr-3 tab:mr-3 tab:ml-3`}  `}
        dir={locale === "en" ? "ltr" : "rtl"}
      >
        <div className="absolute top-12 right-0 left-0">
          <svg
            width="1607"
            height="1"
            viewBox="0 0 1607 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1607"
              y1="0.5"
              x2="-4.37115e-08"
              y2="0.49986"
              stroke="#707070"
            />
          </svg>
        </div>

        <HeaderContainer
          title={settings}
          IconComponent={SettingsSVG}
          headerClasses={`absolute ${
            isAr ? `right-0 ` : `left-0`
          } -top-10   rounded-none border-none  px-0 `}
        />

        <div className={` tab:px-6 py-2 my-12 tab:!mx-3`} >
          <div className="flex space-s-6 tab:space-s-0 flex-wrap tab:max-w-[40%] tab:mb-4">
            <Button className="w-full ms:max-w-[60%] ms:mx-auto tab:mx-auto tab:max-w-[200px] bg-[#f0f3f4] rounded-lg text-[#253439] my-2 sm:my-0 hover:bg-[#f0f3f4]">
              {changePassword}
            </Button>
            <Button className="w-full ms:max-w-[60%] ms:!mx-auto tab:!mx-auto tab:max-w-[200px] bg-[#253439] rounded-lg my-2 sm:my-0 hover:bg-[#253439]">
              {changeAccountDetails}
            </Button>
          </div>
          <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]    ">
              <div>{merchantID}</div>
              <Input
                className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%] disabled:opacity-100 disabled:bg-[#f0f3f4] disabled:text-[#808b8d]"
                defaultValue={userId}
                disabled
              />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{name}</div>
              <Input
                className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%]"
                value={userName}
              />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{marketName}</div>
              <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%]" />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{marketLink}</div>
              <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%]" />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{email}</div>
              <Input
                className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%]"
                value={userEmail}
              />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{phone}</div>
              <Input
                className="bg-[#f0f3f4] rounded-lg text-[#253439] tab:max-w-[45%]"
                value={userPhone}
              />
            </div>
            <div className="flex items-center justify-between max-w-[90%] space-s-3 tab:max-w-[60%]   ">
              <div>{country}</div>
              <Input
                className="bg-[#f0f3f4] rounded-lg text-[#253439]  tab:max-w-[45%]"
                value={userCountry}
              />
            </div>
          </div>

        {/*   <Button className="ms:max-w-[50%] ms:my-4  tab:max-w-[12rem] bg-[#253439] rounded-lg  hover:bg-[#253439] tab:mx-auto ">
            {saveChanges}
          </Button> */}
        </div>
      </div>
    </MotionWrapper>
  );
}
