import { useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ApprovalCard } from "@/components/dashboard/ApprovalCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Zap,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { mockStats, mockApprovals, mockRecentActivity, mockAgents } from "@/components/dashboard/mockData";

export default function DashboardOverview() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${diffHours}h ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {greeting()}, Ahmed 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="https://salla.sa" target="_blank" rel="noopener noreferrer">
                Open Salla
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Agents"
            value={mockStats.activeAgents}
            subtitle="1 paused"
            icon={Bot}
            trend={{ value: "+1 this week", positive: true }}
            onClick={() => navigate("/dashboard/agents")}
            loading={loading}
          />
          <StatCard
            title="Pending Approvals"
            value={mockStats.pendingApprovals}
            subtitle="Needs your review"
            icon={CheckSquare}
            onClick={() => navigate("/dashboard/approvals")}
            loading={loading}
          />
          <StatCard
            title="Completed Today"
            value={mockStats.completedToday}
            subtitle="Actions executed"
            icon={CheckCircle2}
            trend={{ value: "+12%", positive: true }}
            loading={loading}
          />
          <StatCard
            title="Time Saved"
            value={`${mockStats.savedHoursWeek}h`}
            subtitle="This week"
            icon={Clock}
            trend={{ value: "+2.5h", positive: true }}
            loading={loading}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                Pending Approvals
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-primary"
                onClick={() => navigate("/dashboard/approvals")}
                data-testid="view-all-approvals"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockApprovals.length === 0 ? (
                <EmptyState
                  icon={CheckCircle2}
                  title="All caught up!"
                  description="No pending approvals. Your AI agents are waiting for new tasks."
                />
              ) : (
                <>
                  {mockApprovals.slice(0, 3).map((approval) => (
                    <ApprovalCard
                      key={approval.id}
                      approval={approval}
                      compact
                      onClick={() => navigate(`/dashboard/approvals?id=${approval.id}`)}
                    />
                  ))}
                  {mockApprovals.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center pt-2">
                      +{mockApprovals.length - 3} more pending
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Your AI Agents
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 text-primary"
              onClick={() => navigate("/dashboard/agents")}
            >
              Manage agents
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mockAgents.map((agent) => (
                <div 
                  key={agent.id}
                  className="p-4 rounded-xl border border-border/40 bg-card hover:border-primary/30 transition-colors cursor-pointer"
                  data-testid={`agent-card-${agent.id}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg">
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{agent.name}</p>
                      <StatusBadge status={agent.status} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-muted-foreground">
                      Today: <span className="text-foreground font-medium">{agent.actionsToday}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Success: <span className="text-foreground font-medium">{agent.successRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Store Connection Active</h3>
                <p className="text-sm text-muted-foreground">Salla store synced • Last sync: 5 minutes ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
