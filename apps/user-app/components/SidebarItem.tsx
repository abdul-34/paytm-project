"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItem = ({
  href,
  icon,
  title,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-end ${active ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer`}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${active ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </Link>
  );
};

export default SidebarItem;
