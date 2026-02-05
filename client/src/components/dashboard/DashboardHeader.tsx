import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function DashboardHeader({ title, onMenuClick }: DashboardHeaderProps) {
  const notifications = [
    { id: 1, title: "New approval pending", desc: "Cart Recovery AI wants to send a message", time: "2m ago", unread: true },
    { id: 2, title: "Agent paused", desc: "Pricing Agent was automatically paused", time: "1h ago", unread: true },
    { id: 3, title: "Weekly report ready", desc: "Your AI performance report is available", time: "3h ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/50">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={onMenuClick}
          data-testid="mobile-menu-button"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-heading font-bold">{title}</h1>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search approvals, agents, logs..." 
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
              data-testid="dashboard-search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" data-testid="notifications-button">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                  Mark all read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    {notification.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${notification.unread ? '' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">{notification.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">{notification.desc}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-sm text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
