import { Badge } from "@/components/ui/badge";

export default function Terms() {
  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container px-4 mx-auto max-w-4xl">
        <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary">
          Legal
        </Badge>
        <h1 className="text-4xl font-heading font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Wazifly's AI-powered automation platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service. These Terms apply to all visitors, users, and merchants who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wazifly provides AI-powered autonomous agents for eCommerce merchants on Salla and Zid platforms. Our agents analyze store data, propose actions, await merchant approval, and execute tasks—all under merchant control through our "Approval-First" governance model.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You must provide accurate and complete registration information</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must notify us immediately of any unauthorized access to your account</li>
              <li>You must be at least 18 years old to use the Service</li>
              <li>One person or business may not maintain more than one account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Merchant Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a merchant using our Service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Review and approve AI agent actions before execution</li>
              <li>Set appropriate limits and parameters for agent activities</li>
              <li>Ensure compliance with all applicable laws and regulations</li>
              <li>Maintain accurate store data and customer information</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. AI Agent Governance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our AI agents operate under an "Approval-First" model:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Decision:</strong> Agents analyze data and propose actions</li>
              <li><strong>Approval:</strong> You review and approve proposed actions</li>
              <li><strong>Execution:</strong> Approved actions are carried out</li>
              <li><strong>Logging:</strong> All actions are recorded for transparency</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You maintain full control over agent behavior through configurable limits and approval workflows.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payment</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Subscription fees are billed monthly or annually in advance</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>You are responsible for all applicable taxes</li>
              <li>Failure to pay may result in service suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Platform Integration</h2>
            <p className="text-muted-foreground leading-relaxed">
              By connecting your Salla or Zid store, you authorize Wazifly to access your store data as necessary to provide the Service. You represent that you have the authority to grant such access and that your use complies with Salla and Zid's terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by Wazifly and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of your store data and content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Wazifly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free. AI agent recommendations are suggestions only; you are responsible for final approval of all actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account at any time for violation of these Terms. You may cancel your subscription at any time through your account settings. Upon termination, your right to use the Service will cease immediately, and we will delete your data within 30 days unless retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Riyadh, Saudi Arabia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the Service. Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Email:</strong> legal@wazifly.com<br />
              <strong>Address:</strong> Riyadh, Saudi Arabia
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
