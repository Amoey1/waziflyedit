import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bot, MessageSquare, ShoppingBag, Megaphone, BarChart3, ArrowRight, Check, Sparkles, Clock, Shield, Zap } from "lucide-react";
import { Link } from "wouter";
import { useCursorAnimation } from "@/hooks/useCursorAnimation";
import { TiltCard } from "@/components/TiltCard";

interface Agent {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  capabilities: string[];
  details: {
    fullDescription: string;
    benefits: string[];
    howItWorks: string[];
    stats: { label: string; value: string }[];
  };
}

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const cursorRef = useCursorAnimation<HTMLDivElement>({
    translateIntensity: 0.015,
    rotateIntensity: 0.008,
    maxTranslate: 18,
    maxRotate: 4,
    smoothing: 0.07,
  });
  const agents: Agent[] = [
    {
      id: "sales",
      title: "Sales Agent",
      icon: ShoppingBag,
      color: "text-blue-500",
      description: "Recovers abandoned carts, recommends products, and proposes retention offers—within merchant-defined limits.",
      capabilities: [
        "Abandoned cart recovery",
        "Product recommendations",
        "Upselling & Cross-selling",
        "Discount negotiation (within limits)"
      ],
      details: {
        fullDescription: "Our Sales Agent works 24/7 to maximize your store revenue. It analyzes customer behavior, identifies abandoned carts, and sends personalized recovery messages in Arabic or English. Every discount or offer is proposed to you first—you stay in control.",
        benefits: [
          "Recover up to 30% of abandoned carts",
          "Increase average order value with smart recommendations",
          "Native Arabic conversations that feel personal",
          "Full control over discount limits and offers"
        ],
        howItWorks: [
          "Monitors cart abandonment in real-time",
          "Proposes recovery message with discount (if allowed)",
          "Waits for your approval before sending",
          "Tracks results and optimizes approach"
        ],
        stats: [
          { label: "Cart Recovery Rate", value: "30%" },
          { label: "Response Time", value: "<1 min" },
          { label: "Languages", value: "AR/EN" }
        ]
      }
    },
    {
      id: "support",
      title: "Support Agent",
      icon: MessageSquare,
      color: "text-green-500",
      description: "Resolves order status, returns, and FAQs autonomously, escalating sensitive cases for approval.",
      capabilities: [
        "Order status inquiries",
        "Return & Refund handling",
        "FAQ answering",
        "Ticket escalation"
      ],
      details: {
        fullDescription: "The Support Agent handles customer inquiries instantly, reducing your support workload by up to 80%. It knows your return policies, tracks orders, and answers FAQs—but escalates complex issues to you for approval.",
        benefits: [
          "24/7 instant customer support",
          "Reduce support tickets by 80%",
          "Consistent, accurate responses every time",
          "Sensitive issues escalated for human review"
        ],
        howItWorks: [
          "Receives customer inquiry via chat or WhatsApp",
          "Checks order status and store policies",
          "Provides instant response or proposes action",
          "Escalates complex cases for your approval"
        ],
        stats: [
          { label: "Tickets Resolved", value: "80%" },
          { label: "Avg Response", value: "30 sec" },
          { label: "Satisfaction", value: "4.8/5" }
        ]
      }
    },
    {
      id: "marketing",
      title: "Marketing Agent",
      icon: Megaphone,
      color: "text-purple-500",
      description: "Generates campaigns, content, and outreach plans—executed only after review.",
      capabilities: [
        "Campaign generation",
        "Social media posting",
        "Email newsletter drafting",
        "Ad copy optimization"
      ],
      details: {
        fullDescription: "Your Marketing Agent creates compelling campaigns, writes social posts, and drafts newsletters—all in your brand voice. It analyzes what works and proposes new content, but nothing goes live without your approval.",
        benefits: [
          "Save 10+ hours weekly on content creation",
          "Consistent brand voice across all channels",
          "Data-driven campaign suggestions",
          "Full approval control before publishing"
        ],
        howItWorks: [
          "Analyzes your best-performing content",
          "Generates campaign ideas and copy",
          "Presents drafts for your review",
          "Publishes only after your approval"
        ],
        stats: [
          { label: "Time Saved", value: "10+ hrs/wk" },
          { label: "Engagement Lift", value: "45%" },
          { label: "Content Ideas", value: "Daily" }
        ]
      }
    },
    {
      id: "operations",
      title: "Operations Agent",
      icon: Bot,
      color: "text-orange-500",
      description: "Monitors inventory, fulfillment risks, and restocking thresholds before taking action.",
      capabilities: [
        "Inventory monitoring",
        "Supplier reorder alerts",
        "Order processing",
        "Shipping label generation"
      ],
      details: {
        fullDescription: "The Operations Agent keeps your store running smoothly. It monitors inventory levels, predicts stockouts, and can process orders and generate shipping labels—all with your oversight at critical decision points.",
        benefits: [
          "Never miss a stockout again",
          "Automate repetitive fulfillment tasks",
          "Reduce order processing time by 60%",
          "Smart supplier reorder suggestions"
        ],
        howItWorks: [
          "Monitors inventory levels 24/7",
          "Alerts you before stockouts occur",
          "Proposes reorder quantities",
          "Automates shipping label generation"
        ],
        stats: [
          { label: "Stockout Prevention", value: "95%" },
          { label: "Processing Speed", value: "3x faster" },
          { label: "Accuracy", value: "99.9%" }
        ]
      }
    },
    {
      id: "analytics",
      title: "Analytics Agent",
      icon: BarChart3,
      color: "text-indigo-500",
      description: "Delivers executive-ready insights, forecasts, and recommendations tied to real actions.",
      capabilities: [
        "Daily performance digest",
        "Trend analysis",
        "Customer segmentation",
        "Revenue forecasting"
      ],
      details: {
        fullDescription: "Your Analytics Agent transforms data into actionable insights. Get daily performance digests, spot trends before competitors, and receive revenue forecasts—all presented in clear, executive-ready summaries.",
        benefits: [
          "Daily WhatsApp performance summaries",
          "Spot trends and opportunities early",
          "Understand your best customer segments",
          "Make data-driven decisions faster"
        ],
        howItWorks: [
          "Aggregates all store data daily",
          "Identifies patterns and anomalies",
          "Generates executive summary reports",
          "Proposes actions based on insights"
        ],
        stats: [
          { label: "Insights Daily", value: "5-10" },
          { label: "Forecast Accuracy", value: "92%" },
          { label: "Decision Speed", value: "10x" }
        ]
      }
    }
  ];

  return (
    <div ref={cursorRef} className="pt-24 pb-12 min-h-screen relative overflow-hidden">
      {/* Animated background glows */}
      <div data-cursor-animate data-cursor-intensity="0.4" data-cursor-translate-only="true" className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] pointer-events-none z-0 animate-float">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>
      <div data-cursor-animate data-cursor-intensity="0.5" data-cursor-translate-only="true" data-cursor-reverse="true" className="absolute top-[40%] left-[-15%] w-[50%] h-[50%] pointer-events-none z-0 animate-float" style={{ animationDelay: '-3s', animationDirection: 'reverse' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-accent/5 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
      <div data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] pointer-events-none z-0 animate-float" style={{ animationDelay: '-1.5s' }}>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge data-cursor-animate data-cursor-intensity="0.6" variant="outline" className="mb-4 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-top-4 duration-700">Your Digital Workforce</Badge>
          <h1 data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="text-4xl font-heading font-bold mb-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">Specialized Agents. Native Arabic.</h1>
          <p data-cursor-animate data-cursor-intensity="0.2" data-cursor-translate-only="true" className="text-xl text-muted-foreground animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            Five distinct AI employees that work 24/7 to scale your Salla or Zid store. 
            Fluent in Khaleeji, formal Arabic, and English.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <TiltCard key={agent.id} maxRotate={5} scale={1.02} className={`animate-in fade-in slide-in-from-bottom-8 duration-700`} style={{ animationDelay: `${300 + index * 100}ms` }}>
              <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/40 rounded-2xl group bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 duration-300 ${agent.color.replace('text-', 'bg-')}/10 ${agent.color}`}>
                  <agent.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-bold">{agent.title}</CardTitle>
                <CardDescription className="text-base mt-2 leading-relaxed">{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <h4 className="text-xs font-bold mb-4 uppercase tracking-wider text-muted-foreground/80">Key Capabilities</h4>
                <ul className="space-y-3">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group/item">
                      <div className="mt-0.5 rounded-full p-0.5 bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{cap}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/30 mt-auto">
                 <Button 
                   variant="ghost" 
                   className="w-full justify-between group/btn hover:bg-transparent hover:text-primary pl-0"
                   onClick={() => setSelectedAgent(agent)}
                   data-testid={`btn-details-${agent.id}`}
                 >
                   See Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                 </Button>
              </CardFooter>
              </Card>
            </TiltCard>
          ))}
          
          {/* Hire Card */}
          <TiltCard maxRotate={6} scale={1.03} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '800ms' }}>
            <Card className="flex flex-col justify-center items-center text-center p-8 h-full bg-muted/30 border-dashed border-2 border-border/60 rounded-2xl hover:bg-muted/50 transition-colors backdrop-blur-sm">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                 <Bot className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Hire Your Team</h3>
               <p className="text-muted-foreground mb-6">
                 Start with one agent or hire the whole team. Scale as you grow.
               </p>
               <Link href="/pricing">
                 <Button className="rounded-xl px-8 shadow-lg shadow-primary/10">View Pricing</Button>
               </Link>
            </Card>
          </TiltCard>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <Dialog open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAgent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedAgent.color.replace('text-', 'bg-')}/10 ${selectedAgent.color}`}>
                    <selectedAgent.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedAgent.title}</DialogTitle>
                    <DialogDescription className="text-base mt-1">AI-powered automation for your store</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {selectedAgent.details.stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-muted/50">
                      <div className={`text-2xl font-bold ${selectedAgent.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <p className="text-muted-foreground leading-relaxed">{selectedAgent.details.fullDescription}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {selectedAgent.details.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How It Works */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-primary" />
                    How It Works
                  </h4>
                  <ol className="space-y-3">
                    {selectedAgent.details.howItWorks.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-muted-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Approval First Badge */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Shield className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Approval-First Governance</div>
                    <div className="text-xs text-muted-foreground">This agent always asks for your approval before taking important actions. You stay in control.</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-2">
                  <Link href="/pricing" className="flex-1">
                    <Button className="w-full rounded-xl">Get Started</Button>
                  </Link>
                  <Button variant="outline" className="rounded-xl" onClick={() => setSelectedAgent(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
