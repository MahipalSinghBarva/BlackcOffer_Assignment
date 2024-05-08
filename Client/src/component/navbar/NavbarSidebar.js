import React from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const NavbarSidebar = () => {
  return (
    <div className="flex w-full">
      <div className=" h-20  card bg-base-300 rounded-box place-items-center hidden lg:block">
        <Sidebar />
      </div>
      <div className="divider divider-horizontal flex justify-between w-full">
        <Navbar />
      </div>
     
    </div>
  );
};

export default NavbarSidebar;
