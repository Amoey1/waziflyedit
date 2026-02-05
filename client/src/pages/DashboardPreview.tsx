import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Clock, Bell, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function DashboardPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-full blur-[100px]" 
        />
      </div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-accent/5 to-transparent rounded-full blur-[80px]" 
        />
      </div>

      <div className="max-w-lg mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl shadow-primary/20 mb-6">
            <Bot className="w-10 h-10" />
          </div>
        </div>

        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
          <Clock className="w-3.5 h-3.5 mr-2" />
          Coming Soon
        </Badge>

        <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Dashboard Under Construction
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          We're building something powerful. Your AI employees dashboard will let you approve actions, monitor agents, and stay in control of your store operations.
        </p>

        <div className="bg-card border border-border/50 rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Get Notified When It's Ready
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join our waitlist and be the first to access the dashboard.
          </p>
          <Link href="/signup">
            <Button className="w-full sm:w-auto">
              Join Waitlist
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <Link href="/">
          <Button variant="ghost" className="text-muted-foreground">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
