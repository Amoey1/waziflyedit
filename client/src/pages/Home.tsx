import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, ShieldCheck, BarChart3, MessageSquare, ShoppingCart, Settings, CheckCircle2, Sparkles, Clock, Send, Loader2, Zap, Shield, Lock, Users } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCursorAnimation } from "@/hooks/useCursorAnimation";
import { AIAgentFace } from "@/components/AIAgentFace";
import { TiltCard } from "@/components/TiltCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";
import heroImage from "@assets/generated_images/photorealistic_saudi_man_interacting_with_wazifly_and_salla_hologram.png";

export default function Home() {
  const [showSpaceHint, setShowSpaceHint] = useState(true);
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<string>("");
  const [showInsightDialog, setShowInsightDialog] = useState(false);
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { toast } = useToast();
  const cursorRef = useCursorAnimation<HTMLDivElement>({
    translateIntensity: 0.015,
    rotateIntensity: 0.008,
    maxTranslate: 20,
    maxRotate: 4,
    smoothing: 0.06,
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: { email: string; storePlatform?: string }) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to join waitlist");
      return result;
    },
    onSuccess: (_, variables) => {
      trackEvent('waitlist_signup', 'conversion', platform || 'no_platform');
      setSubmittedEmail(variables.email);
      setEmail("");
      setPlatform("");
      setShowInsightDialog(true);
    },
    onError: (error: Error) => {
      trackEvent('waitlist_error', 'conversion', error.message);
      toast({
        title: "Oops!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInsightSubmit = async () => {
    if (biggestChallenge && submittedEmail) {
      trackEvent('user_insight', 'feedback', biggestChallenge);
      try {
        await fetch(`/api/waitlist/${encodeURIComponent(submittedEmail)}/insight`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ biggestChallenge }),
        });
      } catch (e) {
        console.error("Failed to save insight:", e);
      }
    }
    setShowInsightDialog(false);
    setBiggestChallenge("");
    setSubmittedEmail("");
    toast({
      title: "You're on the list!",
      description: "We'll notify you when Wazifly is ready for you.",
    });
  };

  // Spacebar shortcut to navigate to signup (Merlin-inspired)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        window.location.href = '/signup';
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
    return () => reveals.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div ref={cursorRef} className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Merlin-inspired animated background glows */}
      <div data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="absolute top-[-25%] right-[-15%] w-[80%] h-[80%] pointer-events-none z-0 animate-float">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-[140px] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
      </div>
      <div data-cursor-animate data-cursor-intensity="0.4" data-cursor-translate-only="true" data-cursor-reverse="true" className="absolute top-[5%] left-[-20%] w-[70%] h-[70%] pointer-events-none z-0 animate-float" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}>
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent rounded-full blur-[120px] animate-pulse" 
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
      </div>

      {/* AI Agent Face that follows cursor */}
      <AIAgentFace />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-32">
        <div className="container px-4 mx-auto relative z-10">
          {/* Merlin-style stat badge */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div data-cursor-animate data-cursor-intensity="0.5" data-cursor-translate-only="true" className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Average merchant saves <span className="text-primary font-bold">12+ hours/week</span></span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salla/10 text-salla text-sm font-medium border border-salla/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salla opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-salla"></span>
                </span>
                Built for Salla & Zid Merchants
              </div>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
                AI That Acts. <br />
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">You Stay in Control.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Wazifly AI employees analyze your store, propose smart actions, and <strong className="text-foreground">wait for your approval</strong> before executing. Full automation. Full control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 rounded-2xl group transition-all duration-300 active:scale-95">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard-preview">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base border-primary/20 hover:bg-primary/5 text-primary rounded-2xl transition-all duration-300 active:scale-95">
                    Try Interactive Demo
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Trusted by professionals at</p>
                <div className="flex items-center gap-8 opacity-90">
                  <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 active:scale-125">
                    <img 
                      src="https://cdn.prod.website-files.com/63fe4a8108c3c17052878ef9/63ff3b8cdc32cb6e17422010_Group%20(36).svg" 
                      alt="Salla" 
                      className="h-14 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,186,155,0.3)]"
                    />
                    <span className="text-lg font-bold text-foreground/80 font-heading tracking-tight transition-all duration-500 group-hover:text-primary group-hover:translate-x-1">salla</span>
                  </div>
                  
                  <div className="h-8 w-px bg-border/60" />

                  <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 active:scale-125">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-border/50 group-hover:border-zid/50 group-hover:shadow-[0_0_20px_rgba(155,81,224,0.2)] transition-all duration-500">
                      <img 
                        src="/src/assets/images/zid-logo.jpg" 
                        alt="Zid" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                    </div>
                    <span className="text-lg font-bold text-foreground/80 font-heading tracking-tight transition-all duration-500 group-hover:text-[#9B51E0] group-hover:translate-x-1">zid</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Merlin-inspired floating chat demo */}
            <div className="relative animate-in fade-in duration-1000 delay-300">
              <div data-cursor-animate data-cursor-intensity="0.8" className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-background/50 backdrop-blur-sm aspect-square md:aspect-[4/3]">
                <img 
                  src={heroImage} 
                  alt="AI Agents Dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating AI Chat Card (Merlin-style) */}
              <Card data-cursor-animate data-cursor-intensity="1.5" data-cursor-reverse="true" className="absolute -bottom-8 -left-8 w-80 shadow-2xl border-border/40 hidden md:block animate-in slide-in-from-bottom-10 delay-500 duration-700 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Support Agent</p>
                      <p className="text-sm">Customer "Ahmed" is asking about order #4521. Should I send tracking details?</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 h-8 rounded-lg bg-primary hover:bg-primary/90 text-xs" data-testid="button-approve-support">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 rounded-lg text-xs" data-testid="button-view-details">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Second floating card */}
              <Card data-cursor-animate data-cursor-intensity="1.8" data-cursor-reverse="true" className="absolute -top-4 -right-4 w-56 shadow-xl border-border/40 hidden md:block animate-in slide-in-from-right-10 delay-700 duration-700 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-muted-foreground">Sales Agent Active</span>
                  </div>
                  <p className="text-sm font-medium">Recovered 3 carts</p>
                  <p className="text-xs text-muted-foreground">+2,450 SAR in last hour</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Testimonial Banner (Merlin-style) */}
      <section className="py-12 bg-muted/20 border-y border-border/40">
        <div className="container px-4 mx-auto">
          <div className="reveal flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl italic text-foreground/80">
              "Wazifly became the operating system for my store—cleared my plate and gave me back <span className="text-primary font-bold not-italic">12 hours a week</span>."
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                AM
              </div>
              <div>
                <p className="font-bold text-sm">Ahmed Mohammed</p>
                <p className="text-xs text-muted-foreground">CEO, Al-Riyadh Electronics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="reveal text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">The Enterprise Reality</h2>
            <p className="text-muted-foreground text-lg">
              Growing eCommerce teams face high operational load, slow decision cycles, and risk exposure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: MessageSquare, 
                title: "High Operational Load", 
                desc: "Support, sales, and fulfillment teams are overwhelmed by volume.",
                expanded: {
                  stat: "80%",
                  statLabel: "of time spent on repetitive tasks",
                  details: [
                    "Manual response to every customer inquiry",
                    "Repetitive order processing tasks",
                    "Time-consuming inventory checks",
                    "Exhausted teams with high turnover"
                  ],
                  solution: "Wazifly AI handles repetitive tasks 24/7"
                }
              },
              { 
                icon: ShoppingCart, 
                title: "Slow Decision Cycles", 
                desc: "Manual approvals and fragmented tools slow down execution.",
                expanded: {
                  stat: "3-5 days",
                  statLabel: "average approval time",
                  details: [
                    "Multiple tools that don't communicate",
                    "Long email chains for simple approvals",
                    "Delayed responses lose customers",
                    "Missed opportunities from slow action"
                  ],
                  solution: "One-click approvals in Wazifly dashboard"
                }
              },
              { 
                icon: Settings, 
                title: "Risk Exposure", 
                desc: "Fear of uncontrolled automation or 'black-box' AI decisions.",
                expanded: {
                  stat: "67%",
                  statLabel: "of merchants fear AI mistakes",
                  details: [
                    "Unpredictable AI behavior concerns",
                    "No visibility into decision logic",
                    "Fear of customer-facing errors",
                    "Compliance and audit worries"
                  ],
                  solution: "Approval-First model: AI proposes, you decide"
                }
              },
              { 
                icon: BarChart3, 
                title: "Limited Visibility", 
                desc: "Lack of clarity into who did what, when, and why.",
                expanded: {
                  stat: "0%",
                  statLabel: "audit trail in most stores",
                  details: [
                    "No record of team actions",
                    "Can't trace decision history",
                    "Difficult to optimize processes",
                    "Compliance gaps and risks"
                  ],
                  solution: "Full audit log of every AI action"
                }
              },
            ].map((item, i) => (
              <div key={i} className="reveal h-80 perspective-1000" style={{ perspective: '1000px' }}>
                <div className="relative w-full h-full transition-transform duration-700 group" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front of card */}
                  <Card 
                    className="absolute inset-0 border border-border/40 shadow-sm bg-card rounded-2xl backface-hidden group-hover:[transform:rotateY(180deg)] transition-transform duration-700" 
                    style={{ backfaceVisibility: 'hidden', transitionDelay: `${i * 50}ms` }}
                  >
                    <CardHeader className="pb-2">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                      <p className="text-xs text-primary/60 mt-6 flex items-center gap-1">
                        <span>↻</span> Hover to flip
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Back of card */}
                  <Card 
                    className="absolute inset-0 border border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl backface-hidden [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)] transition-transform duration-700 overflow-hidden" 
                    style={{ backfaceVisibility: 'hidden', transitionDelay: `${i * 50}ms` }}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Stat highlight */}
                      <div className="text-center mb-4 pb-4 border-b border-border/30">
                        <div className="text-3xl font-bold text-primary">{item.expanded.stat}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.expanded.statLabel}</div>
                      </div>
                      
                      {/* Pain points */}
                      <ul className="space-y-2 mb-4 flex-1">
                        {item.expanded.details.slice(0, 3).map((detail, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <span className="text-red-500 mt-0.5">✕</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Solution */}
                      <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-xl mt-auto">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-sm font-medium text-primary">{item.expanded.solution}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Enhanced with Merlin chat style */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                The Solution
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                Your Store, Calendar & Operations – finally working together
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Wazifly syncs with Salla, Zid, and WhatsApp so you can recover carts, clear support tickets, and manage inventory from one chat.
              </p>
              <ul className="space-y-4">
                {[
                  "Analyze real store data & context",
                  "Propose actions with clear business reasoning",
                  "Wait for explicit approval before execution",
                  "Execute actions inside the store instantly",
                  "Log every decision for audit and compliance"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/agents">
                  <Button variant="outline" className="gap-2 rounded-xl transition-all duration-300 active:scale-95">
                    Explore All Agents <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Merlin-style chat demo */}
            <TiltCard className="reveal-right" maxRotate={3} scale={1.01}>
              <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl p-6 border border-border/40 shadow-xl">
              <div className="space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                    <p className="text-sm">Hey Wazifly - What's my top priority today?</p>
                  </div>
                </div>
                
                {/* AI response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm border border-border/50 max-w-[85%]">
                    <p className="text-sm mb-3">I've analyzed your store. Here's what matters today:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-200 dark:border-red-900/30">
                        <span className="text-red-500">🔴</span>
                        <span><strong>12 abandoned carts</strong> worth 8,500 SAR</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200 dark:border-amber-900/30">
                        <span className="text-amber-500">🟡</span>
                        <span><strong>5 support tickets</strong> waiting &gt;2 hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950/20 p-2 rounded-lg border border-blue-200 dark:border-blue-900/30">
                        <span className="text-blue-500">🔵</span>
                        <span><strong>Low stock alert</strong> for 3 SKUs</span>
                      </div>
                    </div>
                    <p className="text-sm mt-3 text-muted-foreground">Want me to handle the abandoned carts first?</p>
                  </div>
                </div>
                
                {/* Quick actions */}
                <div className="flex gap-2 pl-11">
                  <Button size="sm" className="rounded-full h-8 text-xs" data-testid="button-recover-carts">Yes, recover carts</Button>
                  <Button size="sm" variant="outline" className="rounded-full h-8 text-xs" data-testid="button-show-details">Show me details</Button>
                </div>
              </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Why Wazifly Section - Differentiation (moved before How It Works) */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Why Choose Wazifly
            </div>
            <h2 data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="reveal text-3xl lg:text-4xl font-heading font-bold mb-4">
              Not Another Chatbot. Not Just Automation.
            </h2>
            <p className="reveal text-lg text-muted-foreground max-w-2xl mx-auto">
              Wazifly is a new category: AI employees that think, act, and work alongside you.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Traditional Chatbots",
                type: "old",
                icon: "💬",
                description: "Rule-based responses that frustrate customers",
                points: [
                  { text: "Scripted answers only", negative: true },
                  { text: "No store integration", negative: true },
                  { text: "Can't take real actions", negative: true },
                  { text: "Generic, not personalized", negative: true }
                ]
              },
              {
                title: "Wazifly AI Employees",
                type: "wazifly",
                icon: "🤖",
                description: "Autonomous agents with merchant control",
                points: [
                  { text: "Understands your store context", negative: false },
                  { text: "Deep Salla & Zid integration", negative: false },
                  { text: "Takes real actions (with approval)", negative: false },
                  { text: "Learns your business preferences", negative: false }
                ]
              },
              {
                title: "Manual Operations",
                type: "old",
                icon: "⏰",
                description: "Time-consuming work that doesn't scale",
                points: [
                  { text: "12+ hours weekly on repetitive tasks", negative: true },
                  { text: "Human errors and delays", negative: true },
                  { text: "Can't operate 24/7", negative: true },
                  { text: "Doesn't scale with growth", negative: true }
                ]
              }
            ].map((item, i) => (
              <TiltCard key={i} maxRotate={3} scale={1.02} className="reveal h-full" style={{ animationDelay: `${i * 100}ms` }}>
                <Card className={`h-full border-2 transition-all duration-300 ${
                  item.type === 'wazifly' 
                    ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10' 
                    : 'border-border/40 bg-card'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      {item.type === 'wazifly' && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <CardTitle className={`text-xl ${item.type === 'wazifly' ? 'text-primary' : ''}`}>
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {item.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className={`mt-0.5 flex-shrink-0 ${point.negative ? 'text-red-500' : 'text-green-500'}`}>
                            {point.negative ? '✕' : '✓'}
                          </span>
                          <span className={`text-sm ${point.negative ? 'text-muted-foreground' : 'font-medium'}`}>
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            ))}
          </div>

          {/* Trust Pillars */}
          <div className="reveal bg-card rounded-3xl border border-border/40 p-8 lg:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-3">Built for Trust & Control</h3>
              <p className="text-muted-foreground">Your store, your rules. Every action goes through you.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Approval-First",
                  desc: "No action happens without your explicit approval"
                },
                {
                  icon: Lock,
                  title: "Data Privacy",
                  desc: "Your store data stays secure and never shared"
                },
                {
                  icon: Clock,
                  title: "Full Audit Log",
                  desc: "Every decision logged for transparency"
                },
                {
                  icon: Users,
                  title: "Human-in-Loop",
                  desc: "AI proposes, you decide, then it executes"
                }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">How it Works</Badge>
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to win back 12 hours a week?</h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to transform your store operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Connect in minutes", desc: "Sync Salla, Zid, and WhatsApp. Wazifly filters the noise and finds what matters.", icon: "🔗" },
              { step: "2", title: "See your day prioritized", desc: "Wazifly surfaces the orders, tickets, and tasks that matter most to your day.", icon: "📊" },
              { step: "3", title: "Take back your time", desc: "Complete high-impact priorities with one click and reclaim 12+ hours a week.", icon: "⚡" },
            ].map((item, i) => (
              <TiltCard key={i} className="reveal" maxRotate={5} scale={1.03}>
                <div className="bg-background rounded-2xl p-8 border border-border shadow-sm text-center h-full hover:shadow-xl transition-all duration-500">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container px-4 mx-auto text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            200+ merchants already on the waitlist
          </div>
          <h2 data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="reveal text-3xl lg:text-5xl font-heading font-bold mb-6">Get Early Access Before Launch</h2>
          <p data-cursor-animate data-cursor-intensity="0.2" data-cursor-translate-only="true" className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be among the first Salla & Zid merchants to automate operations with AI employees that respect your control.
          </p>
          <TiltCard className="max-w-lg mx-auto" maxRotate={3} scale={1.02}>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <form 
              className="flex flex-col sm:flex-row gap-2" 
              data-testid="waitlist-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) waitlistMutation.mutate({ email, storePlatform: platform || undefined });
              }}
            >
              <div className="flex gap-2 flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 rounded-lg text-white placeholder:text-white/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
                  data-testid="input-email"
                  required
                />
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="w-[120px] bg-white/10 border-none text-white" data-testid="select-platform">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salla">Salla</SelectItem>
                    <SelectItem value="zid">Zid</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="font-bold rounded-xl whitespace-nowrap" 
                data-testid="button-join-waitlist"
                disabled={waitlistMutation.isPending}
              >
                {waitlistMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {waitlistMutation.isPending ? "Joining..." : "Get Early Access"}
              </Button>
            </form>
            </div>
          </TiltCard>
          <p className="text-sm opacity-60 mt-4">Limited spots for launch partners. No credit card required.</p>
        </div>
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </section>

      {/* Spacebar hint (Merlin-style) */}
      {showSpaceHint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div 
            className="flex items-center gap-3 px-4 py-2 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full shadow-xl cursor-pointer hover:bg-background transition-colors"
            onClick={() => setShowSpaceHint(false)}
          >
            <span className="text-sm text-muted-foreground">Press</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono font-bold">Space</kbd>
            <span className="text-sm text-muted-foreground">to start your free trial</span>
          </div>
        </div>
      )}

      {/* Post-Signup Insight Dialog */}
      <Dialog open={showInsightDialog} onOpenChange={setShowInsightDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">Welcome to the waitlist!</DialogTitle>
            <DialogDescription className="text-base">
              One quick question to help us serve you better:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="font-medium text-foreground">What's your biggest challenge managing your store?</p>
            <div className="grid gap-2">
              {[
                { value: "order_management", label: "Managing orders & fulfillment" },
                { value: "customer_support", label: "Responding to customer messages" },
                { value: "inventory", label: "Keeping inventory updated" },
                { value: "time", label: "Not enough hours in the day" },
                { value: "other", label: "Something else" }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={biggestChallenge === option.value ? "default" : "outline"}
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => setBiggestChallenge(option.value)}
                  data-testid={`insight-option-${option.value}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => handleInsightSubmit()} data-testid="skip-insight">
              Skip
            </Button>
            <Button onClick={() => handleInsightSubmit()} disabled={!biggestChallenge} data-testid="submit-insight">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
