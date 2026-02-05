import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ApprovalCard, Approval } from "@/components/dashboard/ApprovalCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Clock, 
  AlertTriangle,
  Loader2,
  CheckSquare,
  Inbox
} from "lucide-react";
import { mockApprovals } from "@/components/dashboard/mockData";

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function DashboardApprovals() {
  const { toast } = useToast();
  const searchParams = useSearch();
  const urlId = new URLSearchParams(searchParams).get("id");
  
  const [approvals, setApprovals] = useState<Approval[]>(mockApprovals);
  const [selectedId, setSelectedId] = useState<string | null>(urlId || mockApprovals[0]?.id || null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [editedFields, setEditedFields] = useState<Record<string, any>>({});

  const filteredApprovals = approvals.filter((approval) => {
    const matchesStatus = filterStatus === "all" || approval.status === filterStatus;
    const matchesSearch = 
      approval.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.actionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedApproval = approvals.find((a) => a.id === selectedId);

  const pendingCount = approvals.filter((a) => a.status === "pending").length;
  const approvedCount = approvals.filter((a) => a.status === "approved").length;
  const rejectedCount = approvals.filter((a) => a.status === "rejected").length;

  useEffect(() => {
    if (selectedApproval) {
      const initialFields: Record<string, any> = {};
      selectedApproval.editableFields.forEach((field) => {
        initialFields[field.key] = field.value;
      });
      setEditedFields(initialFields);
    }
  }, [selectedId]);

  const handleApprove = async () => {
    if (!selectedApproval) return;
    
    const currentApprovalId = selectedApproval.id;
    const currentApprovalTitle = selectedApproval.actionTitle;
    
    setIsApproving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setApprovals((prev) => {
      const updated = prev.map((a) =>
        a.id === currentApprovalId ? { ...a, status: "approved" as const } : a
      );
      
      const nextPending = updated.find(
        (a) => a.id !== currentApprovalId && a.status === "pending"
      );
      
      setTimeout(() => {
        if (nextPending) {
          setSelectedId(nextPending.id);
        } else {
          setSelectedId(null);
        }
      }, 0);
      
      return updated;
    });
    
    setIsApproving(false);
    
    toast({
      title: "Action Approved",
      description: `${currentApprovalTitle} has been executed.`,
    });
  };

  const handleReject = async () => {
    if (!selectedApproval) return;
    
    const currentApprovalId = selectedApproval.id;
    const currentRejectReason = rejectReason;
    
    setIsRejecting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setApprovals((prev) => {
      const updated = prev.map((a) =>
        a.id === currentApprovalId ? { ...a, status: "rejected" as const } : a
      );
      
      const nextPending = updated.find(
        (a) => a.id !== currentApprovalId && a.status === "pending"
      );
      
      setTimeout(() => {
        if (nextPending) {
          setSelectedId(nextPending.id);
        } else {
          setSelectedId(null);
        }
      }, 0);
      
      return updated;
    });
    
    setIsRejecting(false);
    setShowRejectDialog(false);
    setRejectReason("");
    
    toast({
      title: "Action Rejected",
      description: currentRejectReason || "The action has been declined.",
      variant: "destructive",
    });
  };

  const handleFieldChange = (key: string, value: any) => {
    setEditedFields((prev) => ({ ...prev, [key]: value }));
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    return `${diffHours} hours ago`;
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="grid lg:grid-cols-5 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex flex-col gap-4 mb-4">
              <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all" data-testid="filter-all">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="pending" data-testid="filter-pending" className="gap-1">
                    Pending
                    {pendingCount > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-500/20 text-amber-600 rounded-full">
                        {pendingCount}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="approved" data-testid="filter-approved">
                    Approved
                  </TabsTrigger>
                  <TabsTrigger value="rejected" data-testid="filter-rejected">
                    Rejected
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search approvals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="search-approvals"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredApprovals.length === 0 ? (
                <EmptyState
                  icon={filterStatus === "pending" ? CheckCircle2 : Inbox}
                  title={filterStatus === "pending" ? "All caught up!" : "No approvals found"}
                  description={
                    filterStatus === "pending"
                      ? "No pending approvals. Your AI agents are waiting for new tasks."
                      : "Try adjusting your search or filter."
                  }
                  action={
                    searchQuery
                      ? { label: "Clear search", onClick: () => setSearchQuery("") }
                      : undefined
                  }
                />
              ) : (
                filteredApprovals.map((approval) => (
                  <ApprovalCard
                    key={approval.id}
                    approval={approval}
                    isSelected={selectedId === approval.id}
                    onClick={() => setSelectedId(approval.id)}
                  />
                ))
              )}
            </div>
          </div>

          <Card className="lg:col-span-3 border-border/40 flex flex-col h-full overflow-hidden">
            {selectedApproval ? (
              <>
                <CardHeader className="border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                        {selectedApproval.agentIcon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedApproval.agentName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedApproval.actionType.replace(/_/g, " ")}</p>
                      </div>
                    </div>
                    <StatusBadge status={selectedApproval.status} />
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto py-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">{selectedApproval.actionTitle}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedApproval.actionDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {timeAgo(selectedApproval.createdAt)}
                    </div>
                    {selectedApproval.expiresAt && (
                      <div className="flex items-center gap-2 text-orange-500">
                        <AlertTriangle className="w-4 h-4" />
                        Expires in {Math.round((new Date(selectedApproval.expiresAt).getTime() - Date.now()) / 3600000)}h
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border border-border/40">
                    <h4 className="text-sm font-medium mb-3">Action Details</h4>
                    <div className="grid gap-2 text-sm">
                      {Object.entries(selectedApproval.actionParams).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-medium">
                            {Array.isArray(value) ? value.join(", ") : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedApproval.status === "pending" && selectedApproval.editableFields.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Editable Fields</h4>
                      {selectedApproval.editableFields.map((field) => (
                        <div key={field.key} className="space-y-2">
                          <Label htmlFor={field.key}>{field.label}</Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              id={field.key}
                              value={editedFields[field.key] || field.value}
                              onChange={(e) => handleFieldChange(field.key, e.target.value)}
                              rows={4}
                              data-testid={`field-${field.key}`}
                            />
                          ) : field.type === "number" ? (
                            <Input
                              id={field.key}
                              type="number"
                              value={editedFields[field.key] || field.value}
                              onChange={(e) => handleFieldChange(field.key, Number(e.target.value))}
                              data-testid={`field-${field.key}`}
                            />
                          ) : (
                            <Input
                              id={field.key}
                              value={editedFields[field.key] || field.value}
                              onChange={(e) => handleFieldChange(field.key, e.target.value)}
                              data-testid={`field-${field.key}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                {selectedApproval.status === "pending" && (
                  <div className="border-t border-border/40 p-4 bg-card">
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => setShowRejectDialog(true)}
                        disabled={isApproving || isRejecting}
                        data-testid="reject-button"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button
                        className="flex-1 gap-2"
                        onClick={handleApprove}
                        disabled={isApproving || isRejecting}
                        data-testid="approve-button"
                      >
                        {isApproving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Approve
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={CheckSquare}
                  title="Select an approval"
                  description="Choose an item from the list to view details and take action."
                />
              </div>
            )}
          </Card>
        </div>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Action</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this action. This helps the AI learn your preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Optional: Why are you rejecting this action?"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              data-testid="reject-reason"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={isRejecting}
              data-testid="confirm-reject"
            >
              {isRejecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Rejecting...
                </>
              ) : (
                "Reject Action"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
