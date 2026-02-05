import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { Bot, Clock, AlertTriangle } from "lucide-react";

export interface Approval {
  id: string;
  agentId: string;
  agentName: string;
  agentIcon: string;
  actionType: string;
  actionTitle: string;
  actionDescription: string;
  actionParams: Record<string, any>;
  editableFields: { key: string; label: string; value: any; type: string }[];
  status: "pending" | "approved" | "rejected";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  expiresAt?: string;
}

interface ApprovalCardProps {
  approval: Approval;
  isSelected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

const priorityConfig = {
  low: { color: "text-gray-500", bg: "bg-gray-500" },
  medium: { color: "text-blue-500", bg: "bg-blue-500" },
  high: { color: "text-orange-500", bg: "bg-orange-500" },
  urgent: { color: "text-red-500", bg: "bg-red-500" }
};

export function ApprovalCard({ approval, isSelected, onClick, compact }: ApprovalCardProps) {
  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const isExpiringSoon = approval.expiresAt && 
    new Date(approval.expiresAt).getTime() - new Date().getTime() < 3600000;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all duration-200 cursor-pointer",
        isSelected 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "border-border/40 bg-card hover:border-primary/30 hover:bg-muted/30",
        compact && "p-3"
      )}
      onClick={onClick}
      data-testid={`approval-card-${approval.id}`}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0",
          isSelected ? "bg-primary/20" : "bg-muted"
        )}>
          {approval.agentIcon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm truncate">{approval.agentName}</span>
            <div className={cn("w-1.5 h-1.5 rounded-full", priorityConfig[approval.priority].bg)} />
          </div>

          <p className={cn(
            "text-sm text-muted-foreground mb-2 line-clamp-2",
            compact && "line-clamp-1"
          )}>
            {approval.actionTitle}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(approval.createdAt)}
            </span>
            
            {isExpiringSoon && (
              <span className="flex items-center gap-1 text-orange-500">
                <AlertTriangle className="w-3 h-3" />
                Expiring soon
              </span>
            )}
          </div>
        </div>

        <StatusBadge status={approval.status} />
      </div>
    </div>
  );
}
