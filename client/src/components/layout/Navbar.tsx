import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "AI Employees", href: "/agents" },
    { label: "How it Works", href: "/dashboard-info" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center gap-2 font-heading font-bold text-xl text-primary cursor-pointer transition-all duration-300 active:scale-125"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white relative shadow-sm group overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.4)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0l5 5-5 5-5-5z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '6px 6px'
            }}></div>
            <span className="relative z-10 text-sm tracking-tighter">W</span>
          </div>
          Wazifly
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary cursor-pointer active:scale-95",
                location === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard-preview">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-sm font-medium py-2 hover:text-primary block cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Link href="/dashboard-preview">
              <Button variant="outline" className="w-full">
                Dashboard
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
