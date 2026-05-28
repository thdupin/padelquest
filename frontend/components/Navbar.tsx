"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Classement", icon: "🏆" },
    { href: "/match", label: "Log Match", icon: "⚡" },
    { href: "/profile/1", label: "Mon Profil", icon: "👤" }, // ID statique pour le MVP
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex flex-col items-center justify-center w-full h-full transition-colors"
            >
              <span className="text-xl mb-0.5">{link.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? "text-primary" : "text-muted"}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}