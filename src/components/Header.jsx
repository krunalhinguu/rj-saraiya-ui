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
import { navigation } from "../data/navigation";
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [enabled, setEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function ActiveLink(props) {
    return (
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-500 hover:bg-red-100"
            : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#e40414] hover:bg-red-100"
        }
        {...props}
      />
    );
  }

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
          {navigation.map((n, i) => (
            <ActiveLink key={n.key} to={n.url}>
              {n.name}
            </ActiveLink>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 gap-1 lg:justify-end">
          <Switch.Group>
            <Switch.Label className="text-sm font-semibold leading-6 mr-2">
              English
            </Switch.Label>
            <Switch
              as="button"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
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
              Gujarati
            </Switch.Label>
          </Switch.Group>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-[#e40414]"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </a>
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
              <div className="space-y-2 py-6">
                {navigation.map((n, i) => (
                  <ActiveLink key={n.key} to={n.url}>
                    {n.name}
                  </ActiveLink>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
