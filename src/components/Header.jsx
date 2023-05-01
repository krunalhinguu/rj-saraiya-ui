import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Switch,
  Transition,
} from "@headlessui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { HiArrowSmRight } from "react-icons/hi";
import { nav } from "../data/navigation";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/UserSlice";
import Avatar from "./Avatar";
import Spinner from "./Spinner";
import ButtonSpinner from "./ButtonSpinner";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../redux/actions/NavigationSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const props = useSelector((state) => state);
  const { user, navigation } = props;

  const { data } = user;
  const { lang } = navigation;

  const { name, role } = data;

  const isAdmin = role && role.toLowerCase() === "admin";
  const isToggle = lang === "en" ? false : true;

  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(isToggle);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function ActiveLink(props) {
    return (
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-500 bg-red-100 hover:bg-red-100"
            : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#e40414] hover:bg-red-100"
        }
        {...props}
      />
    );
  }

  const handleLanguageChange = (nextChecked) => {
    setEnabled(!enabled);
    let lang = "gu";

    if (!nextChecked) {
      lang = "en";
    }

    dispatch(setLanguage({ toggle: lang }));
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header className="border-b- border-b-gray-500">
      <nav
        className="mx-auto border-b-2 flex w-full items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/customer" className="-m-1.5 p-1.5">
            <img className="w-20" src="logo512.png" alt="logo" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {nav &&
            nav.map((n, i) => {
              return n.isAdmin ? (
                isAdmin ? (
                  <ActiveLink key={n.key} to={n.url}>
                    {t(n.name)}
                  </ActiveLink>
                ) : null
              ) : (
                <ActiveLink key={n.key} to={n.url}>
                  {t(n.name)}
                </ActiveLink>
              );
            })}
        </Popover.Group>

        <div className="hidden items-center lg:flex lg:flex-1 gap-1 lg:justify-end">
          {/* switch */}
          <Switch.Group>
            <Switch.Label className="text-sm font-semibold leading-6 mr-2">
              EN
            </Switch.Label>
            <Switch
              as="button"
              checked={enabled}
              onChange={(nextChecked) => handleLanguageChange(nextChecked)}
              className={`${enabled ? "bg-red-900" : "bg-red-700/80"}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <Switch.Label className="text-sm font-semibold leading-6 mx-2">
              GU
            </Switch.Label>
          </Switch.Group>

          {/* profile  */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={(e) => setIsProfileOpen((prev) => !prev)}
            >
              <Avatar
                name={name?.split(" ")[0]}
                surname={name?.split(" ")[1]}
              />
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                <li>
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                    {name}
                    <span className="text-sm ml-1 text-gray-400 hover:bg-gray-100">
                      ({role})
                    </span>
                  </span>
                </li>
                <hr />
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    {t("common.logout")}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/customer" className="-m-1.5 p-1.5">
              <img className="w-20" src="logo512.png" alt="logo" width={100} />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Close menu</span>
              <RxCross2 className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* nav */}
              <div className="space-y-2 py-6">
                {nav &&
                  nav.map((n, i) => {
                    return n.isAdmin ? (
                      isAdmin ? (
                        <ActiveLink key={n.key} to={n.url}>
                          {t(n.name)}
                        </ActiveLink>
                      ) : null
                    ) : (
                      <ActiveLink key={n.key} to={n.url}>
                        {t(n.name)}
                      </ActiveLink>
                    );
                  })}
              </div>

              {/* switch */}
              <div className="p-2">
                <Switch.Group>
                  <Switch.Label className="text-sm font-semibold leading-6 mr-2">
                    EN
                  </Switch.Label>
                  <Switch
                    as="button"
                    checked={enabled}
                    onChange={(nextChecked) =>
                      handleLanguageChange(nextChecked)
                    }
                    className={`${enabled ? "bg-red-900" : "bg-red-700/80"}
           inline-flex h-[24px] w-[48px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <Switch.Label className="text-sm font-semibold leading-6 ml-2">
                    GU
                  </Switch.Label>
                </Switch.Group>

                {/* log out */}
                <button
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("common.logout")}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
