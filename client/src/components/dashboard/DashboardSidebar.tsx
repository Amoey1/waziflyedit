import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Bot, 
  ScrollText, 
  Settings, 
  User,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Approvals", href: "/dashboard/approvals", icon: CheckSquare },
  { name: "Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Logs", href: "/dashboard/logs", icon: ScrollText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location === "/dashboard";
    }
    return location.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
        <Link href="/">
          <span className="text-xl font-heading font-bold text-primary cursor-pointer">
            Wazifly
          </span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={onClose}
              data-testid={`nav-${item.name.toLowerCase()}`}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive(item.href) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className={cn(
                  "px-2 py-0.5 text-xs font-medium rounded-full",
                  isActive(item.href) 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-primary/10 text-primary"
                )}>
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Ahmed's Store</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border/50 transform transition-transform duration-300 lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <SidebarContent />
      </div>
    </>
  );
}
