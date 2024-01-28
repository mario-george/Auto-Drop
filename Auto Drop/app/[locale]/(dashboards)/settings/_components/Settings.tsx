import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderContainer from "../../_components/shared/HeaderContainer";
import SettingsSVG from "@/components/icons/ClientSVGs/SettingsSVG";
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
  country,
}: SettingsProps) {
  return (
    <>
      <div
        className={`bg-white   text-[#253439]  px-6 py-2 my-12 rounded-lg shadow tab:!mx-3 `}
      >
        <HeaderContainer
          title={settings}
          IconComponent={SettingsSVG}
          className="flex-1 !px-0 !mx-0 rounded-none border-b-2 border-black"
        />
        <div className="flex space-s-6">
          <Button className=" max-w-[12rem] bg-[#f0f3f4] rounded-lg text-[#253439] ">
            {changePassword}
          </Button>
          <Button className=" max-w-[12rem] bg-[#253439] rounded-lg">
            {changeAccountDetails}
          </Button>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between max-w-[60%]    ">
            <div>{merchantID}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{name}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{marketName}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{marketLink}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{email}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{phone}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
          <div className="flex items-center justify-between max-w-[60%]   ">
            <div>{country}</div>
            <Input className="bg-[#f0f3f4] rounded-lg text-[#253439] max-w-[45%]" />
          </div>
        </div>

        <Button className=" max-w-[12rem] bg-[#253439] rounded-lg  ">
          {saveChanges}
        </Button>
      </div>
    </>
  );
}
