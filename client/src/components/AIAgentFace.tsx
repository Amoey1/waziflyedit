import { useEffect, useRef, useState } from 'react';
import mascotImage from "@assets/image_1769082420164.png";
import { X, Send, Sparkles } from "lucide-react";

export function AIAgentFace() {
  const faceRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{text: string; isUser: boolean; time: string}[]>([
    { text: "مرحباً! أنا مساعدك الذكي من Wazifly. كيف يمكنني مساعدتك اليوم؟", isUser: false, time: "Now" },
    { text: "Hi! I'm your AI assistant from Wazifly. How can I help you today?", isUser: false, time: "Now" }
  ]);

  const quickReplies = [
    "How does Wazifly work?",
    "What are the pricing plans?",
    "Can I integrate with Salla?",
    "Tell me about AI agents"
  ];

  const getResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("price") || lowerMsg.includes("pricing") || lowerMsg.includes("cost")) {
      return "Our pricing is customized based on your store volume. We offer flexible plans starting from basic automation to full AI workforce. Visit our Pricing page or join the waitlist for a personalized quote!";
    }
    if (lowerMsg.includes("salla") || lowerMsg.includes("zid")) {
      return "Yes! Wazifly integrates natively with both Salla and Zid platforms. Our AI agents connect directly to your store and can access orders, customers, inventory, and more.";
    }
    if (lowerMsg.includes("work") || lowerMsg.includes("how")) {
      return "Wazifly provides AI employees that analyze your store data, propose actions (like cart recovery or inventory alerts), wait for your approval, then execute. You stay in control with our Approval-First model!";
    }
    if (lowerMsg.includes("agent")) {
      return "We have 5 specialized AI agents: Sales (cart recovery), Support (customer service), Marketing (campaigns), Operations (inventory), and Analytics (insights). Each works 24/7 in Arabic and English!";
    }
    return "Thanks for your question! For detailed information, please join our waitlist or contact us at hello@wazifly.com. Our team will get back to you within 24 hours!";
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { text: message, isUser: true, time: now }]);
    
    const response = getResponse(message);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false, time: now }]);
    }, 1000);
    
    setMessage("");
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 100);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;

      const face = faceRef.current;
      const rect = face.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      const maxTilt = 15;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const tiltX = distance > 0 ? (deltaY / distance) * Math.min(distance * 0.015, maxTilt) : 0;
      const tiltY = distance > 0 ? (-deltaX / distance) * Math.min(distance * 0.015, maxTilt) : 0;

      setTilt({ x: tiltX, y: tiltY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <>
      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-32 right-8 z-50 w-80 sm:w-96 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-500 p-4 flex items-center gap-3">
              <img src={mascotImage} alt="AI" className="w-10 h-10 rounded-full border-2 border-white/30" />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Wazifly AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs">Online • Replies instantly</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-muted/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.isUser 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-muted rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Replies */}
            <div className="p-3 border-t border-border/30 bg-muted/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mascot Button */}
      <div
        ref={faceRef}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-24 right-8 z-40 cursor-pointer group"
      >
        {/* Outer glow aura */}
        <div className="absolute inset-[-12px] rounded-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: '8s' }} />
        
        {/* Rotating ring */}
        <div className="absolute inset-[-6px] rounded-full border border-dashed border-primary/40 animate-spin" style={{ animationDuration: '12s' }} />
        
        {/* Pulsing ring */}
        <div className="absolute inset-[-4px] rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Main container */}
        <div 
          className="relative w-20 h-20 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 group-hover:shadow-primary/60 overflow-hidden animate-float"
          style={{ 
            transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            animationDuration: '3s'
          }}
        >
          {/* Gradient background ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary p-[3px]">
            <div className="w-full h-full rounded-full bg-background" />
          </div>
          
          {/* Mascot image */}
          <img 
            src={mascotImage} 
            alt="AI Assistant" 
            className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] object-cover rounded-full transition-transform duration-200"
            style={{ 
              transform: isBlinking ? 'scaleY(0.95)' : 'scaleY(1)',
              filter: isBlinking ? 'brightness(0.95)' : 'brightness(1)'
            }}
          />
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Shine sweep effect */}
          <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"
              style={{ animationDuration: '3s' }}
            />
          </div>
          
          {/* Sparkle dots */}
          <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" style={{ animationDuration: '1.5s' }} />
          <div className="absolute top-3 right-0 w-1 h-1 rounded-full bg-white/60 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        </div>
        
        {/* Status indicator */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
        
        {/* Tooltip - only show when chat is closed */}
        {!isChatOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-background/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-xl shadow-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap pointer-events-none">
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Click to chat with me!
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-background/95" />
          </div>
        )}
      </div>
    </>
  );
}
