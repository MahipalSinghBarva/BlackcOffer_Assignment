import React from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserBar = [
  { name: "Year", href: "/year" },
  { name: "Intensity", href: "/intensity" },
  { name: "Sector", href: "/sector" },
  { name: "Topic", href: "/topic" },
  { name: "City", href: "/city" },
  { name: "Country", href: "/country" },
  { name: "Relevance", href: "/relevance" },
  { name: "Likelihood", href: "/likelihood" },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-black px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div>
            <Link
              to="/dashboard"
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
            >
              <span className="mx-2 text-xl font-medium ">Dashboard</span>
            </Link>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xm font-semibold uppercase text-white">
              Variables
            </label>

            {UserBar.map((i) => (
              <Link
                to={i.href}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {i.name}
              </Link>
            ))}
          </div>

          {/* <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">Customization</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div> */}
        </nav>
      </div>
    </aside>
  );
}
