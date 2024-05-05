"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { userActions } from "@/store/user-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

export default function ClientHeader({
  lang,
  planTitle,
  planValue,
  locale,
}: {
  lang: string;
  planTitle: string;
  planValue: string;
  locale: string;
}) {
  // const image = useSelector((state: RootState) => state.user.image);
  const user = useSelector((state: RootState) => state.user);
  // const createdAt = useSelector((state: RootState) => state.user.createdAt);
  // const name = useSelector((state: RootState) => state.user.name);
  const { createdAt, name, image } = useSelector(
    (state: RootState) => state.user
  );

  let envType = process.env.NEXT_PUBLIC_ENVIRONMENT;
  let webSocketUrl = process.env.NEXT_PUBLIC_BACK_WS;
  if (envType === "dev") {
    webSocketUrl = "ws://localhost:10000";
    //  webSocketUrl = "wss://auto-drop-rtxb.onrender.com"
    //  webSocketUrl = "ws://auto-drop-rtxb.onrender:7777"
  }
  const toast = useToast();
  let subscriptionErrorHandler = (title: string, description: string) => {
    toast({
      title,
      description,
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "bottom-right",
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    let socket: WebSocket;
    const maxRetries = 5000;
    let retries = 0;
    const retryInterval = 60000;
  
    const connect = () => {
      if (socket) {
        socket.close(); // close the existing connection if it exists
      }
  
      socket = new WebSocket(webSocketUrl as string);
  
      socket.addEventListener("open", (event) => {
        retries = 0; // reset retries count on successful connection
        socket.send(JSON.stringify({ id: user.id }));
      });
  
      socket.onmessage = (event) => {
        // console.log("RAW EVENT", event);
        try {
          let data = JSON.parse(event.data);
          console.log("eventtt", data);
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };
  
      socket.onerror = (event) => {
        // console.log("Socket encountered an error", event);
        if (retries < maxRetries) {
          retries++;
          setTimeout(connect, retryInterval); // try to reconnect after a delay
        }
      };
  
      socket.onclose = (event: CloseEvent) => {
        // console.log("Socket closed", event);
        if (retries < maxRetries) {
          retries++;
          setTimeout(connect, retryInterval); // try to reconnect after a delay
        }
      };
    };
  
    connect(); // initial connection attempt
  
    // Clean up function to close the socket when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  console.log(createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const getOrdinalSuffix = (date: number) => {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${weekday} ${day}${getOrdinalSuffix(day)} ${month}`;
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  let query;

  if (searchParams.has("orderId")) {
    query = { orderId: searchParams.get("orderId") };
  }
  const [scrolling, setScrolling] = useState(false);
  const isAr = locale === "ar";
  useEffect(() => {
    if (!user.id) {
      return; // exit early if user.id is not defined
    }

    let socket: WebSocket;
    const maxRetries = 5000;
    let retries = 0;
    const retryInterval = 10000;
  
    const connect = () => {
      if (socket) {
        socket.close(); // close the existing connection if it exists
      }
  
      socket = new WebSocket(webSocketUrl as string);
  
      socket.addEventListener("open", (event) => {
        retries = 0; // reset retries count on successful connection
        socket.send(JSON.stringify({ id: user.id }));
      });
  
      socket.onmessage = (event) => {
        console.log("RAW EVENT", event);
        try {
          let data = JSON.parse(event.data);
          console.log("eventtt", data);
          if (data.eventType === "subscription") {
            dispatch(userActions.changeSubscription(data));
          } else if (data.eventType === "subscription-expired") {
            subscriptionErrorHandler(
              "Subscription Expired",
              "Please renew your subscription to continue using the service"
            );
          } else if (data.eventType === "subscription-products-limit-reached") {
            subscriptionErrorHandler(
              "Subscription Products Limit Reached",
              "Please upgrade your subscription to add more products"
            );
          } else if (data.eventType === "subscription-orders-limit-reached") {
            subscriptionErrorHandler(
              "Subscription Orders Limit Reached",
              "Please upgrade your subscription to add more orders"
            );
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };
  
      socket.onerror = (event) => {
        console.log("Socket encountered an error", event);
        if (retries < maxRetries) {
          retries++;
          setTimeout(connect, retryInterval); // try to reconnect after a delay
        }
      };
  
      socket.onclose = (event: CloseEvent) => {
        console.log("Socket closed", event);
        if (retries < maxRetries) {
          retries++;
          setTimeout(connect, retryInterval); // try to reconnect after a delay
        }
      };
    };
  
    connect(); // initial connection attempt
  
    // Clean up function to close the socket when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user.id]);
  let splittedButtonsClasses =
    locale === "ar"
      ? "rotate-45 right-0 left-[10%]"
      : "-rotate-45 right-[20%] bottom-0 top-0 left-0";
  return (
    <main
      className={cn(
        "pt-2 left-4 text-xs lg:text-base  tab:mx-3 top-0 z-[30]  max-w-[100%]",
        scrolling ? "opacity-90 transition-opacity duration-300" : "",
        `${isAr ? `ml-3` : `mr-3`}`
      )}
      dir={locale === "ar" ? "ltr" : "rtl"}
    >
      <nav
        className="bg-[#F8F6F4] rounded-md shadow flex flex-row 
      justify-between items-center lg:px-14 px-1 py-2 min-h-[50px] dark:bg-[#2e464f] dark:text-white"
      >
        <div className="flex flex-row space-s-3 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src={image} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {name}
          <Link
            locale={locale === "ar" ? "en" : "ar"}
            href={{
              pathname: pathname,
              query: query,
            }}
            className={`text-sm md:text-[16px] font-medium ${
              isAr ? `border-l-2` : `border-r-2`
            } px-2 py-2`}
          >
            {lang}
          </Link>
          <div
            className={`bg-[#f0f3f4] rounded-lg text-[#626d72] text-[12px] flex space-s-3 px-1 py-[2px]`}
            dir="ltr"
          >
            <Image
              src={`/client/header/notification.svg`}
              alt={"notification"}
              width="24"
              height="24"
            />
          </div>

          <div
            className={`bg-[#f0f3f4]  rounded-lg text-[#626d72] text-[12px] flex space-s-2 px-1 py-[2px]`}
            dir="ltr"
          >
            <Image
              src={`/client/header/wallet.svg`}
              alt={"wallet"}
              width="24"
              height="22"
            />
            <div>0.00 SAR</div>
          </div>
          <div
            className={`hidden tab:flex bg-[#f0f3f4] rounded-lg text-[#626d72] text-[12px] flex space-s-2 px-1 py-[2px]`}
            dir="ltr"
          >
            <Image
              src={`/client/header/calender.svg`}
              alt={"calender"}
              width="16"
              height="16"
              className=""
            />
            <div>{formatDate(createdAt)}</div>
          </div>
        </div>
        <div></div>

        {locale == "ar" ? (
          <>
            <div className="">
              <div className="relative hidden tab:flex space-s-1 border-4 dark:bg-[#2e464f] dark:border-white rounded-md border-[#B29E84]">
                <div
                  className=" lap:w-[7rem] tab:w-[6rem] h-6 bg-[#B29E84] dark:bg-white"
                  style={{
                    clipPath: "polygon(0 0, 57% 0, 100% 100%, 0% 100%)",
                  }}
                ></div>
                <div
                  className="lap:w-[6rem]  tab:w-[5rem] h-6 bg-white dark:bg-[#2e464f]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                />
                <div className="absolute text-black dark:text-white right-3 top-[3px] lap:top-[1px]   text-xs tab:text-sm lap:text-md">
                  {planTitle}
                </div>
                <div className="absolute text-white dark:text-[#253439] top-[3px] text-xs lap:top-[1px]  lap:left-[6px]  tab:text-sm lap:text-md font-bold">
                  {user.planName}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative hidden tab:flex space-s-1 border-4 rounded-md border-[#B29E84] dark:bg-[#2e464f] dark:border-white ">
              <div
                className="lap:w-[6rem]  tab:w-[5rem] h-6 bg-white dark:bg-[#2e464f]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <div
                className=" lap:w-[7rem] tab:w-[6rem] h-6 bg-[#B29E84]  dark:bg-white"
                style={{ clipPath: "polygon(0 0, 57% 0, 100% 100%, 0% 100%)" }}
              ></div>
              <div className="absolute text-black right-3 top-[3px] tab:top-[5px]   text-xs  lap:text-md dark:text-white">
                {planTitle}
              </div>
              <div className="absolute text-white top-[3px] text-xs  tab:top-[5px] tab:left-[6px] lap:text-md  dark:text-[#253439] font-bold">
                {user.planName}
              </div>
            </div>
          </>
        )}

        {/*      <button className="cursor-default bg-white text-black  ">
            <span className="relative z-30">{planTitle}</span>
          </button>
          <button className="bg-[#B29E84] cursor-default text-white py-[6px] px-2 ms:px-3 mm:px-4 tap:px-11 lap:px-11 ">
            <span className=" relative z-30 text-white mr-4">{planValue}</span>{" "}
          </button> */}

        {/*   <div
            className={`absolute  bottom-0 top-0  bg-white transform ${splittedButtonsClasses}`}
          /> */}
      </nav>
    </main>
  );
}
