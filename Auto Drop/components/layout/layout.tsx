import { motion } from "framer-motion";
import NavBarSVG from "@/components/icons/ClientSVGs/NavBarSVG";
import ContactSVG from "@/components/icons/ClientSVGs/ContactSVG";
import CartSVG from "@/components/icons/ClientSVGs/CartSVG";
import HomePageSVG from "../icons/ClientSVGs/HomePageSVG";
import ProductsSVG from "../icons/ClientSVGs/ProductsSVG";
import OwnedProductsSVG from "../icons/ClientSVGs/OwnedProducts";
import WalletSVG from "../icons/ClientSVGs/WalletSVG";
import SettingsSVG from "../icons/ClientSVGs/SettingsSVG";
import PlansSVG from "../icons/ClientSVGs/PlansSVG";
import LinkingSVG from "../icons/ClientSVGs/LinkingSVG";
import OrdersSVG from "../icons/ClientSVGs/OrdersSVG";
import "@/components/icons/ClientSVGs/test.css";
import Image from "next/image";

const SideNav = () => {
  return (
    <motion.div
      initial={{ x: -250, width: 60 }}
      animate={{ x: 0, width: 60 }}
      whileHover={{ width: 250 }}
      onHoverEnd={() => {}}
      transition={{ duration: 0.5 }}
      className="group flex flex-col h-screen text-[#25343980] text-black bg-white w-[1rem] border overflow-hidden"
    >
      <div className="flex items-center justify-center h-16">
        <h1 className="flex space-x-2 mr-[4rem] hover:">
          <div></div>
          <div className="">
            <div className="relative">
              <div className="absolute z-30 bg-white left-0 right-12 top-0 bottom-0 group-hover:bg-transparent transition-all duration-500" />
              <NavBarSVG />
            </div>
          </div>
        </h1>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col mx-2 space-y-2">
           <motion.li className="icon-path flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="group flex items-center  ">
              <HomePageSVG />
              <motion.span
                className="ml-3 flex space-x-[.2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>Main</span>
                <span>Page</span>
              </motion.span>
            </a>
          </motion.li> 
     
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <ProductsSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Products
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <OwnedProductsSVG />

              <motion.span
                className="ml-3 flex space-x-[.2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>My</span>
                <span>Products</span>
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <CartSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Cart
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <OrdersSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Orders
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <PlansSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Plans
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <LinkingSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Linking
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <CartSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Cart
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <SettingsSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Settings
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <WalletSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Wallet
              </motion.span>
            </a>
          </motion.li>
          <motion.li className="flex items-center py-2 px-4 hover:bg-[#F0F3F400] text-[#253439] hover:text-black hover:bg-[#f0f3f4] rounded-lg hover:shadow-md">
            <a href="#" className="flex items-center">
              <ContactSVG />
              <motion.span
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Contact
              </motion.span>
            </a>
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default SideNav;
