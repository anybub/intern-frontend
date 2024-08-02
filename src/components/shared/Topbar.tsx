import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { topbarLinks } from "@/constants";
import useUserStore from "@/store/useUser";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore((state) => {
    return {
      user: state.user,
    };
  });
  const setUser = useUserStore((state)=>state.setUser);
  type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  const handleLogout = () => {
    console.log(setUser);
    setUser(null);
    navigate("/");
  };
  const { pathname } = useLocation();
  return (
    <nav className="topbar">
      <div className=" flex flex-between py-4 px-2">
        <Link to="/" className="hidden sm:flex">
          <img
            src="/assets/National_Institute_Of_Technology_Silchar_Logo.png"
            alt="logo"
            width={50}
            height={50}
            className="bg-light-2 rounded-full"
          />
          <h2 className="hidden sm:flex-between small-medium md:h2-bold px-2">
            E-Election
          </h2>
        </Link>
        <ul className="flex flex-between gap-5 lg:gap-10">
          {topbarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`rounded-lg base-medium hover:bg-primary-600 transition group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center p-4 sm:gap-4 tiny-medium sm:base-medium lg:body-medium"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white px-1 sm:px-0 ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex">
          {user ? (
            <div className="flex flex-row gap-2">
              <Button
                className="bg-primary-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className="bg-primary-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
