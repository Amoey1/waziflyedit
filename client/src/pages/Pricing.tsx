import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Lock, Server, Zap, Users, BarChart3, AlertCircle, Fingerprint, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useCursorAnimation } from "@/hooks/useCursorAnimation";
import { TiltCard } from "@/components/TiltCard";

export default function Pricing() {
  const cursorRef = useCursorAnimation<HTMLDivElement>({
    translateIntensity: 0.012,
    rotateIntensity: 0.006,
    maxTranslate: 15,
    maxRotate: 3,
    smoothing: 0.06,
  });
  const plans = [
    {
      title: "Single Agent",
      price: "80 SAR/mo",
      description: "Designed for controlled entry and evaluation.",
      features: [
        "1 Specialized AI Employee",
        "Approval-first execution",
        "Core audit logs",
        "Standard Support"
      ],
      cta: "Start Evaluation",
      highlighted: false
    },
    {
      title: "Two Agents",
      price: "120 SAR/mo",
      description: "Suitable for growing operations.",
      features: [
        "2 Specialized AI Employees",
        "Higher action volume",
        "Expanded approvals & governance",
        "Priority Support"
      ],
      cta: "Scale Up",
      highlighted: false
    },
    {
      title: "Three Agents",
      price: "200 SAR/mo",
      description: "Built for scaling teams.",
      features: [
        "3 Specialized AI Employees",
        "Advanced governance",
        "Priority execution & insights",
        "Dedicated Success Manager"
      ],
      cta: "Expand Workforce",
      highlighted: false
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For high-volume merchants demanding autonomy.",
      features: [
        "4+ Specialized AI Employees",
        "Full governance & SLA",
        "Custom integrations & workflows",
        "Dedicated Account Management"
      ],
      cta: "Request Access",
      highlighted: true
    }
  ];

  return (
    <div ref={cursorRef} className="pt-24 pb-24 min-h-screen bg-[#2A3B5F] text-white relative overflow-hidden">
      {/* Superhuman-inspired background effects */}
      <div data-cursor-animate data-cursor-intensity="0.5" data-cursor-translate-only="true" className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#4A6FA5]/20 to-transparent pointer-events-none" />
      <div data-cursor-animate data-cursor-intensity="0.6" data-cursor-translate-only="true" data-cursor-reverse="true" className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#9B51E0]/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 1. HERO SECTION */}
      <section className="container px-4 mx-auto text-center mb-20 relative z-10">
        <Badge data-cursor-animate data-cursor-intensity="0.3" variant="outline" className="mb-4 text-white border-white/20 bg-white/5">Enterprise-Grade Operations</Badge>
        <h1 data-cursor-animate data-cursor-intensity="0.2" data-cursor-translate-only="true" className="text-4xl lg:text-6xl font-heading font-bold mb-6 tracking-tight text-white">
          Invest in Outcomes, <br className="hidden md:block" />
          <span className="text-[#89A8E0]">Not Just Software.</span>
        </h1>
        <p data-cursor-animate data-cursor-intensity="0.15" data-cursor-translate-only="true" className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
          Our pricing model adapts to your operational scale, risk profile, and automation volume. 
          Move beyond per-seat licensing to a value-based partnership.
        </p>
      </section>

      {/* 2. PRICING LOGIC SECTION */}
      <section className="container px-4 mx-auto mb-24 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2 text-white">What Your Investment Is Based On</h2>
          <p className="text-blue-100/60">Transparent factors that drive your custom enterprise plan.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Users, 
              title: "Active Workforce", 
              desc: "Number of specialized AI agents deployed (Sales, Support, Ops, etc)." 
            },
            { 
              icon: Zap, 
              title: "Action Volume", 
              desc: "Scale of executed operations (not chat messages) per month." 
            },
            { 
              icon: Shield, 
              title: "Governance Level", 
              desc: "Depth of audit trails, approval workflows, and risk controls required." 
            },
            { 
              icon: Server, 
              title: "Integration Depth", 
              desc: "Complexity of connections to Salla, Zid, ERPs, and external APIs." 
            }
          ].map((item, i) => (
            <TiltCard key={i} maxRotate={4} scale={1.02}>
              <Card className="h-full bg-white/5 border border-white/10 shadow-sm hover:shadow-lg transition-all rounded-2xl group backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-4 text-[#89A8E0] transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 3. PRICING CARDS SECTION */}
      <section className="container px-4 mx-auto mb-24 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <TiltCard key={i} maxRotate={plan.highlighted ? 3 : 5} scale={plan.highlighted ? 1.01 : 1.03}>
              <Card 
                className={`relative flex flex-col h-full rounded-2xl transition-all duration-300 backdrop-blur-md ${
                  plan.highlighted 
                    ? "border-[#89A8E0]/50 shadow-2xl bg-white/10 ring-1 ring-white/20" 
                    : "border-white/10 shadow-sm bg-white/5 hover:shadow-lg"
                }`}
              >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-[#89A8E0] via-white to-[#9B51E0]"></div>
              )}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#89A8E0] text-[#2A3B5F] shadow-lg px-3 py-1 rounded-full font-bold">RECOMMENDED</Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-white">{plan.title}</CardTitle>
                <div className="text-3xl font-bold mt-2 mb-2 tracking-tight text-white">{plan.price}</div>
                <CardDescription className="min-h-[40px] leading-relaxed text-blue-100/60">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 pb-4">
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${plan.highlighted ? "bg-[#89A8E0]/20 text-[#89A8E0]" : "bg-white/10 text-blue-100/40"}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={plan.highlighted ? "text-white font-medium" : "text-blue-100/70"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Link href="/signup" className="w-full">
                  <Button 
                    className={`w-full font-bold h-11 rounded-xl shadow-md transition-all active:scale-95 ${
                      plan.highlighted 
                        ? "bg-[#89A8E0] hover:bg-[#A5C1F0] text-[#2A3B5F]" 
                        : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                    }`} 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
              </Card>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. SECURITY & COMPLIANCE */}
      <section className="container px-4 mx-auto mb-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Enterprise-Grade Security</h2>
          <p className="text-blue-100/60">
            Built for the Saudi market with strict adherence to data privacy and security standards.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { 
               icon: Lock, 
               title: "Data Encryption", 
               desc: "AES-256 encryption for all stored data and TLS 1.3 for data in transit." 
             },
             { 
               icon: Fingerprint, 
               title: "Role-Based Access", 
               desc: "Granular permissions for team members. You control who approves what." 
             },
             { 
               icon: AlertCircle, 
               title: "Saudi Compliance", 
               desc: "Servers and data handling practices aligned with local regulations." 
             }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#89A8E0]">
                 <item.icon className="w-6 h-6" />
               </div>
               <h3 className="font-bold mb-2 text-white">{item.title}</h3>
               <p className="text-sm text-blue-100/60">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 5. WHO THIS IS FOR */}
      <section className="container px-4 mx-auto mb-24 bg-white/5 py-16 rounded-3xl relative z-10 backdrop-blur-sm border border-white/10">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#89A8E0]">Who This Is For</h3>
            <ul className="space-y-4">
              {[
                "Mid-market & Enterprise merchants on Salla/Zid",
                "Teams overwhelmed by high-volume support & ops",
                "Businesses requiring strict approval governance",
                "Merchants scaling beyond 50+ daily orders"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#89A8E0]/20 text-[#89A8E0] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-100/40">Who This Is Not For</h3>
            <ul className="space-y-4">
              {[
                "Hobbyists or dropshippers just starting out",
                "Merchants wanting unsupervised 'set and forget' AI",
                "Businesses executing fewer than 10 orders/day",
                "Teams looking for a basic chatbot tool"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-white/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold">X</span>
                  </div>
                  <span className="text-sm text-blue-100/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="container px-4 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-heading font-bold mb-6 text-white">Ready to Scale Control?</h2>
        <p className="text-lg text-blue-100/60 mb-8 max-w-xl mx-auto">
          Join the leading Saudi enterprises automating their operations with Wazifly.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="px-10 h-12 text-base font-bold shadow-xl shadow-[#89A8E0]/20 bg-[#89A8E0] text-[#2A3B5F] hover:bg-[#A5C1F0] active:scale-95 transition-all">
              Request Enterprise Access
            </Button>
          </Link>
          <p className="text-sm text-blue-100/40">
            Consultation includes a live demo on your data.
          </p>
        </div>
      </section>

    </div>
  );
}
