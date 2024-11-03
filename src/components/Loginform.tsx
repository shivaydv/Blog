import React from "react";
import { Button } from "./ui/button";
import { LoginbyGoogle } from "@/actions/authActions";
import { BsGithub, BsGoogle } from "react-icons/bs";

const Loginform = () => {
  return (
    <form action={LoginbyGoogle}>
      <Button variant={"outline"} className="w-full" type="submit" size={"lg"}>
        <BsGoogle className="mr-2" size={16} /> Login with Google
      </Button>

      <Button variant={"outline"} className="w-full" type="submit" size={"lg"}>
        <BsGithub className="mr-2" size={16} /> Login with Github
      </Button>
    </form>
  );
};

export default Loginform;
