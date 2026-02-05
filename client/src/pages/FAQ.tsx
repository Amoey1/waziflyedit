import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCursorAnimation } from "@/hooks/useCursorAnimation";

export default function FAQ() {
  const cursorRef = useCursorAnimation<HTMLDivElement>({
    translateIntensity: 0.012,
    rotateIntensity: 0.006,
    maxTranslate: 12,
    maxRotate: 2,
    smoothing: 0.08,
  });
  const faqs = [
    {
      question: "What if the AI makes a mistake in a chat?",
      answer: "You set the boundaries. For sensitive topics, the agent will draft a response and ask for your approval. If it's unsure, it escalates the ticket to a human human automatically."
    },
    {
      question: "Do AI agents act without my permission?",
      answer: "No. Wazifly operates on an 'Approval-First' governance model. For any sensitive action (like refunding money, placing orders, or sending discounts), the agent must request your approval via the dashboard."
    },
    {
      question: "Is my store data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and strictly adhere to data privacy standards. We only access the data necessary for the agents to function, and we never share your data with third parties."
    },
    {
      question: "Can I stop the AI at any time?",
      answer: "Yes. You can pause or disable any specific agent instantly from your dashboard settings. You have full control over the 'workforce'."
    },
    {
      question: "What happens if I reject an action?",
      answer: "The action is immediately cancelled and logged as 'Rejected'. The agent learns from this decision to improve future proposals. Nothing is executed on your store without your explicit 'Approve' click."
    },
    {
      question: "Is this built only for Salla & Zid?",
      answer: "Currently, yes. We have deeply integrated with Salla and Zid APIs to ensure seamless operation for Saudi merchants. We plan to expand to other platforms in the future."
    },
    {
      question: "How do the agents learn about my products?",
      answer: "Once connected, our agents scan your store's product catalog, policies, and past order history to build a knowledge base specific to your business."
    }
  ];

  return (
    <div ref={cursorRef} className="pt-24 pb-24 min-h-screen relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-3xl">
        <h1 data-cursor-animate data-cursor-intensity="0.3" data-cursor-translate-only="true" className="text-3xl font-heading font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem data-cursor-animate data-cursor-intensity="0.4" key={i} value={`item-${i}`} className="border border-border/40 rounded-xl px-4 bg-card shadow-sm hover:shadow-lg transition-all">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
