import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "rejected" | "active" | "paused" | "expired";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  },
  approved: {
    label: "Approved",
    className: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-600 border-red-500/20"
  },
  active: {
    label: "Active",
    className: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  paused: {
    label: "Paused",
    className: "bg-gray-500/10 text-gray-600 border-gray-500/20"
  },
  expired: {
    label: "Expired",
    className: "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border",
        config.className,
        className
      )}
      data-testid={`status-badge-${status}`}
    >
      {config.label}
    </span>
  );
}
