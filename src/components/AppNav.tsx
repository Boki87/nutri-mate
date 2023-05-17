import { NavLink } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineRestaurant, MdOutlineMenuBook } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { ReactNode } from "react";

export const AppNav = () => {
  return (
    <div className="h-14 w-full bg-white absolute bottom-0 left-0 z-10 flex items-center justify-evenly">
      <AppNavLink to="/">
        <RiDashboardLine />
      </AppNavLink>
      <AppNavLink to="/food">
        <MdOutlineRestaurant />
      </AppNavLink>
      <AppNavLink to="/meals">
        <MdOutlineMenuBook />
      </AppNavLink>
      <AppNavLink to="/profile">
        <AiOutlineUser />
      </AppNavLink>
    </div>
  );
};

const AppNavLink = ({ children, to }: { to: string; children: ReactNode }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean; isPending: boolean }) => {
        if (isActive) {
          return "p-3 text-emerald-500 font-bold text-xl";
        }
        return "p-3 text-gray-400 text-xl hover:text-emerald-600";
      }}
    >
      {children}
    </NavLink>
  );
};
