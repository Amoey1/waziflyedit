import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-primary mb-4 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white relative shadow-sm overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0l5 5-5 5-5-5z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '6px 6px'
                }}></div>
                <span className="text-sm">W</span>
              </div>
              Wazifly
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Action-Taking AI Agents for Salla & Zid merchants.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 Wazifly. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/agents" className="hover:text-primary cursor-pointer">AI Employees</Link></li>
              <li><Link href="/dashboard-info" className="hover:text-primary cursor-pointer">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-primary cursor-pointer">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary cursor-pointer">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary cursor-pointer">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary cursor-pointer">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary cursor-pointer">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
