import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

export default function SignUp() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/30 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-border/60">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white text-xl font-bold relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              W
            </div>
          </div>
          <CardTitle className="text-2xl font-heading font-bold">Request Enterprise Access</CardTitle>
          <p className="text-muted-foreground">Deploy AI employees with approval-first governance.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" placeholder="My Awesome Store" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salla">Salla</SelectItem>
                  <SelectItem value="zid">Zid</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              No credit card required for waitlist registration.
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold mt-4">
              Get Started
            </Button>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              By joining, you agree to our Terms. Your data is encrypted and secure.
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/dashboard-preview" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
