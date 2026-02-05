import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">Internal Design System</Badge>
          <h1 className="text-4xl font-heading font-bold mb-4">Wazifly Brand Identity Concepts</h1>
          <p className="text-muted-foreground text-lg">
            Evaluation of Saudi-inspired modern visual directions. 
            <br />
            <strong>Current Active Concept: Concept 1</strong>
          </p>
        </div>

        <div className="grid gap-12">
          {/* Concept 1 */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(162,45%,22%)] flex items-center justify-center text-white text-xl font-bold relative overflow-hidden shadow-sm ring-2 ring-offset-2 ring-[hsl(162,45%,22%)]">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0l5 5-5 5-5-5z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '6px 6px'
                }}></div>
                W
              </div>
              <div>
                <h2 className="text-2xl font-bold">Concept 1: "The Modern Najdi" (Active)</h2>
                <p className="text-muted-foreground">Inspiration: Structural Integrity & Heritage</p>
              </div>
            </div>
            <Card className="border-[hsl(162,45%,22%)]/20 bg-[hsl(162,45%,22%)]/5">
              <CardHeader>
                <CardTitle>Visual Narrative</CardTitle>
                <CardDescription>
                  Draws from the geometric precision of traditional Najdi architecture (Triangle/Diamond motifs). 
                  Represents stability, structure, and building a foundation for growth.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Palette</h4>
                  <div className="space-y-2">
                    <div className="h-12 w-full rounded-md bg-[hsl(162,45%,22%)] flex items-center justify-center text-white text-xs">Heritage Green</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(42,65%,50%)] flex items-center justify-center text-white text-xs">Saudi Gold</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(222,25%,20%)] flex items-center justify-center text-white text-xs">Executive Charcoal</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Typography</h4>
                  <div className="space-y-1">
                    <div className="font-heading font-bold text-2xl">Plus Jakarta Sans</div>
                    <div className="font-sans text-base">Inter (Body text)</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Why this works</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Feels institutional & established</li>
                    <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Subtle cultural nod (no clichés)</li>
                    <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> High trust factor for B2B</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Concept 2 */}
          <section className="space-y-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(215,30%,20%)] flex items-center justify-center text-white text-xl font-bold relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(180,70%,45%)]/30 to-transparent"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[hsl(180,70%,45%)]">
                   <path d="M4 12h16M4 12l6-6M4 12l6 6" transform="rotate(180 12 12)" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Concept 2: "The Digital Horizon"</h2>
                <p className="text-muted-foreground">Inspiration: Red Sea Coast & Future Vision</p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Visual Narrative</CardTitle>
                <CardDescription>
                  Inspired by the flow of the Red Sea and the forward-looking Vision 2030. 
                  Represents momentum, speed, and seamless integration.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Palette</h4>
                  <div className="space-y-2">
                    <div className="h-12 w-full rounded-md bg-[hsl(215,30%,20%)] flex items-center justify-center text-white text-xs">Deep Navy</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(180,70%,45%)] flex items-center justify-center text-white text-xs">Electric Teal</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(210,20%,96%)] flex items-center justify-center text-black text-xs">Clean White</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Typography</h4>
                  <div className="space-y-1">
                    <div className="font-heading font-bold text-2xl tracking-wide">Space Grotesk</div>
                    <div className="font-sans text-base">DM Sans</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Why this works</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Feels tech-forward & fast</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Appeals to younger merchants</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> High energy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Concept 3 */}
          <section className="space-y-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(0,0%,15%)] flex items-center justify-center text-white text-xl font-bold relative overflow-hidden shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[hsl(35,80%,60%)]">
                   <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Concept 3: "The Guiding Star"</h2>
                <p className="text-muted-foreground">Inspiration: Desert Navigation & Leadership</p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Visual Narrative</CardTitle>
                <CardDescription>
                  Minimalist representation of the North Star (guiding merchants). 
                  Represents clarity, precision, and executive decision making.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Palette</h4>
                  <div className="space-y-2">
                    <div className="h-12 w-full rounded-md bg-[hsl(0,0%,15%)] flex items-center justify-center text-white text-xs">Onyx Black</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(35,80%,60%)] flex items-center justify-center text-white text-xs">Bronze Gold</div>
                    <div className="h-12 w-full rounded-md bg-[hsl(0,0%,90%)] flex items-center justify-center text-black text-xs">Platinum</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Typography</h4>
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-2xl">Libre Baskerville</div>
                    <div className="font-sans text-base">Inter</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Why this works</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Feels ultra-premium & VIP</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Very high authority</li>
                    <li className="flex gap-2"><Check className="w-4 h-4" /> Stands out from "SaaS Blue/Green"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}
