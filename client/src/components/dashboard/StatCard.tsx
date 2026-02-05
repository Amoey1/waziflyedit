import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  subtitle,
  icon: Icon, 
  trend, 
  onClick, 
  loading,
  className 
}: StatCardProps) {
  if (loading) {
    return (
      <Card className={cn("border-border/40", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "border-border/40 transition-all duration-200",
        onClick && "cursor-pointer hover:border-primary/30 hover:shadow-md",
        className
      )}
      onClick={onClick}
      data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {(subtitle || trend) && (
              <div className="flex items-center gap-2 pt-1">
                {trend && (
                  <span className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    trend.positive 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-red-500/10 text-red-600"
                  )}>
                    {trend.positive ? "↑" : "↓"} {trend.value}
                  </span>
                )}
                {subtitle && (
                  <span className="text-xs text-muted-foreground">{subtitle}</span>
                )}
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
