import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, ShieldAlert, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import dashboardImage from "@assets/generated_images/modern_saas_dashboard_interface_with_approvals_list.png";

export default function DashboardInfo() {
  return (
    <div className="pt-24 pb-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-heading font-bold mb-6">You Are The Manager</h1>
            <p className="text-xl text-muted-foreground">
              Wazifly isn't a "black box." It's a command center where you review, edit, and approve every sensitive action before it happens.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border mb-24 bg-background">
             <img src={dashboardImage} alt="Opero Dashboard" className="w-full h-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
              <p className="text-muted-foreground mb-6">
                Agents propose sensitive actions instead of executing them blindly. You'll see a clear list of what they want to do and why.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Review proposed refunds</span></li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Approve discount offers</span></li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Confirm inventory restocking</span></li>
              </ul>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-6">
                 <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Control & Governance</h2>
              <p className="text-muted-foreground mb-6">
                You are always in charge. The dashboard gives you a complete audit log of every interaction and action taken by your agents.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Full audit trail with reasoning</span></li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Instant override & pause</span></li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Risk-aware categorization</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to see it in action?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get a feel for the approval workflow and agent management with our interactive preview.
            </p>
            <Link href="/dashboard-preview">
              <Button size="lg" className="gap-2">
                Access Dashboard Preview <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
