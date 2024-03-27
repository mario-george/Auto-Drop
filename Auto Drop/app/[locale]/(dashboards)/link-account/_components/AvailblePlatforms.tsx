"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { FaUnlink } from "react-icons/fa";
import { userActions } from "@/store/user-slice";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import useAlertDialog from "@/components/chakra-ui/useAlertDialog";
export default function AvailablePlatforms({
  soon,
  linkButton,
  Cards,
  className,
  cardClassName,
  soonButtonClasses,
  connectButtonClasses,
  store,
  linkButtonConnected,
  locale,
  imageWrapperClasses,
}: {
  soon: string;
  linkButton: string;
  Cards: any;
  className?: string;
  cardClassName?: string;
  soonButtonClasses?: string;
  connectButtonClasses?: string;
  store?: boolean;
  linkButtonConnected?: string;
  locale?: string;
  imageWrapperClasses?: string;
}) {
  const dispatch = useDispatch();
  const sallaToken = useSelector((state: RootState) => state.user.sallaToken);

  const aliExpressToken = useSelector(
    (state: RootState) => state.user.aliExpressToken
  );
  const isAr = locale == "ar";
  console.log(sallaToken);
  console.log(aliExpressToken);
  const deleteTokenHandler = async (tokenType: string) => {
    let path = "token";
    let token;
    if (tokenType == "salla") {
      token = sallaToken;
      path += `/sallaToken/${token}`;
      tokenType = "Salla";
    } else if (tokenType == "aliexpress") {
      token = aliExpressToken;
      path += `/aliExpressToken/${token}`;
      tokenType = "AliExpress";
    } else {
      return;
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(
          userActions.updateToken({
            tokenType,
            token: "",
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return
  };
  const  { openModelHandler, AlertDialogComponent } = useAlertDialog({
    title:"Are you sure you want to unlink account?",
    deleteButtonText:"Unlink",
    deleteSubmitHandler:deleteTokenHandler


  })
  const authHandler = async (link: string) => {
    const url = process.env.NEXT_PUBLIC_BACK_URL + link;
    window.location.href = url;
  };
  const variants = {
    hidden: { opacity: 0, x: locale === "ar" ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
    {AlertDialogComponent}
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div
          className={`relative flex flex-wrap  tab:max-w-full  w-full tab:space-s-8 tab:mx-0 tab:space-y-0  tab:flex-row justify-center ${className}`}
        >
          {Cards.map((card: any, index: string) => {
            return (
              <div
                key={index}
                className={`bg-white rounded-lg  flex flex-col justify-center items-center flex-1 pt-6 shadow ${
                  card.alt == "cj"
                    ? `flex-grow-0 min-w-[45%]   tab:min-w-0 tab:flex-1  !pt-0 !py-0 !my-0 ${
                        locale === `ar` ? `!ml-auto` : `!mr-auto`
                      } `
                    : ``
                } ${cardClassName}`}
              >
                <div
                  className={`${
                    card.circleLink &&
                    store &&
                    ` tab:!pb-[0rem] tab:pt-9 lap:pt-11 lapl:my-9 lapl:pb-24 lapl:!pt-[25px]  lapl:mb-22  `
                  } ${card.alt == "amazon" ? `tab:pt-4` : ``}    ${
                    store && `lapl:pt-10`
                  } lapl:mb-auto ${imageWrapperClasses}`}
                >
                  <Image
                    width={card.imageW}
                    height={card.imageH}
                    src={card.image}
                    alt={card.alt}
                    className="ms:w-24 ms:h-12 tab:h-auto tab:w-auto"
                  />
                </div>
                {card.circleLink ? (
                  <>
                    <div className=" min-w-full mt-auto">
                      {((card.alt == "salla" && sallaToken) ||
                        (card.alt == "aliexpress" && aliExpressToken)) && (
                        <div
                          onClick={() => {
                            openModelHandler(card.alt);
                            // deleteTokenHandler(card.alt);
                          }}
                          /* className={`absolute  ${
                            isAr
                              ? `top-[9px] ms:right-[15px] mm:right-[30px] tab:right-[23px] tab:top-[11px] lap:top-[20%] lap:right-[10%] lapl:right-[25%] k4:right-[220px]`
                              : `top-2 ms:left-[15px] mm:left-[30px] tab:left-[18px] tab:top-[10px] lap:top-[20%] lap:left-[7%] lapl:left-[20%] k4:left-[200px] `
                          }  x left-20 cursor-pointer z-[2]`} */
                          className={`absolute hover:cursor-pointer ${isAr ? `top-2` : `top-2 tab:left-6`}`}
                        >
                          {/* <FaUnlink className="bg-white  ms:text-sm rounded-full lap:w-6 lap:h-6 text-red-500 tab:text-[18px] lap:text-[20px] " />
                           */}
                            <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" tab:w-[30px] tab:h-[30px]"
                      >
                        <circle
                          cx="11.6133"
                          cy="12.3652"
                          r="10"
                          fill="#2E464F"
                          stroke="white"
                        />
                        <line
                          x1="7.4863"
                          y1="8.85141"
                          x2="15.4336"
                          y2="15.481"
                          stroke="white"
                        />
                        <line
                          x1="14.3659"
                          y1="8.1459"
                          x2="8.95408"
                          y2="16.4352"
                          stroke="white"
                        />
                      </svg>
                        </div>
                      )}

                      <Button
                        className={`  bg-[#253439] min-w-full hover:bg-[#253439]   !rounded-t-none ${connectButtonClasses} ${
                          card.alt == "salla" && sallaToken && `bg-green-700`
                        } ${
                          card.alt == "aliexpress" &&
                          aliExpressToken &&
                          `bg-green-700`
                        }`}
                        onClick={() => {
                          if (card.authLink) {
                            authHandler(card.authLink);
                          }
                        }}
                        // @ts-ignore
                        disabled={
                          (card.alt == "aliexpress" && aliExpressToken) ||
                          (card.alt == "salla" && sallaToken)
                        }
                      >
                        {(card.alt == "salla" && sallaToken) ||
                        (card.alt == "aliexpress" && aliExpressToken) ? (
                          <div className="flex justify-center items-center cursor-pointer space-s-2 ">
                            <div
                              className={cn(
                                "text-white text-xs ml:text-[15px] lap:text-[20px] font-bold ",
                                `${isAr ? `mr-2` : `ml-5`}`
                              )}
                            >
                              {linkButtonConnected}
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center cursor-pointer space-s-2 mb-2 transform translate-y-1  ">
                            <Image
                              width={24}
                              height={24}
                              src="/client/circleLink.svg"
                              alt="circleLink"
                              className="ms:w-5 ms:h-5 "
                            />
                            <div className="text-white text-xs ml:text-[15px] lap:text-[20px] font-bold ">
                              {linkButton}
                            </div>
                          </div>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    className={` hover:bg-neutral-200  min-w-full  !rounded-t-none  bg-neutral-200 cursor-auto ${soonButtonClasses}`}
                  >
                    <div className="flex justify-center items-center space-s-2">
                      <div className=" text-neutral-400 ms:text-sm ml:text-lg mm:px-3 tab:text-[20px]">
                        {soon}
                      </div>
                    </div>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
