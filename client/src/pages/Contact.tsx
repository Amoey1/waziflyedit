import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary">
            Get in Touch
          </Badge>
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions about Wazifly? We're here to help you automate your store.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="border-border/40">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">For general inquiries</p>
                  <a href="mailto:hello@wazifly.com" className="text-primary text-sm hover:underline">
                    hello@wazifly.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-2">Quick support chat</p>
                  <a href="https://wa.me/966500000000" className="text-primary text-sm hover:underline">
                    +966 50 000 0000
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground mb-2">Our headquarters</p>
                  <p className="text-sm">Riyadh, Saudi Arabia</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground mb-2">We're quick!</p>
                  <p className="text-sm">Within 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 border-border/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>Fill out the form and we'll get back to you soon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Store Name</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your store name"
                      value={formData.company}
                      onChange={handleChange}
                      data-testid="input-company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      data-testid="input-subject"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    data-testid="input-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full rounded-xl"
                  disabled={isSubmitting}
                  data-testid="btn-submit-contact"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Callout */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <Card className="border-border/40 bg-muted/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2">Looking for quick answers?</h3>
              <p className="text-muted-foreground mb-4">
                Check out our FAQ section for answers to common questions about Wazifly.
              </p>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="/faq">View FAQ</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
