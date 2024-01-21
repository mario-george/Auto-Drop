"use client";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { userActions } from "@/store/user-slice";
import { useRouter } from "@/navigation";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
  role: string;
  id: string;
  image: string;
  _id?: string;
}

export default function Google({ params }: { params: { token: string } }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = params;
  const { email, name, role, image } = jwtDecode<CustomJwtPayload>(token);
  const id =
    jwtDecode<CustomJwtPayload>(token).id ||
    jwtDecode<CustomJwtPayload>(token)._id;

  if (email && name && role && id && image) {
    dispatch(
      userActions.login({
        email,
        name,
        role,
        id,
        image,
        token,
      })
    );
    return router.push("/");
  }

  toast.error("Something went wrong.", {
    position: "bottom-left",
  });
  return router.push("/login");
}
