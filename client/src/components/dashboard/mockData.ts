import type { Approval } from "./ApprovalCard";

export const mockApprovals: Approval[] = [
  {
    id: "apr-001",
    agentId: "agent-cart",
    agentName: "Cart Recovery AI",
    agentIcon: "🛒",
    actionType: "send_whatsapp",
    actionTitle: "Send cart recovery message to Ahmed",
    actionDescription: "Customer abandoned cart worth SAR 450. AI suggests sending a personalized WhatsApp message with a 10% discount offer.",
    actionParams: {
      customerName: "Ahmed Mohammed",
      customerPhone: "+966 50 123 4567",
      cartValue: 450,
      cartItems: ["Nike Air Max", "Adidas Hoodie"],
      discountPercent: 10
    },
    editableFields: [
      { key: "message", label: "Message", value: "Hi Ahmed! You left some great items in your cart. Complete your order now and get 10% off with code COMEBACK10 🛒", type: "textarea" },
      { key: "discountPercent", label: "Discount %", value: 10, type: "number" }
    ],
    status: "pending",
    priority: "high",
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3600000).toISOString()
  },
  {
    id: "apr-002",
    agentId: "agent-pricing",
    agentName: "Pricing Agent",
    agentIcon: "💰",
    actionType: "update_price",
    actionTitle: "Reduce price for slow-moving inventory",
    actionDescription: "Product 'Summer Collection Dress' has been in stock for 45 days with only 2 sales. AI suggests a 15% price reduction to increase turnover.",
    actionParams: {
      productId: "prod-789",
      productName: "Summer Collection Dress",
      currentPrice: 299,
      suggestedPrice: 254,
      daysInStock: 45,
      salesCount: 2
    },
    editableFields: [
      { key: "suggestedPrice", label: "New Price (SAR)", value: 254, type: "number" }
    ],
    status: "pending",
    priority: "medium",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: "apr-003",
    agentId: "agent-support",
    agentName: "Customer Support AI",
    agentIcon: "💬",
    actionType: "send_response",
    actionTitle: "Reply to shipping inquiry",
    actionDescription: "Customer asked about delivery time for order #12345. AI drafted a response with tracking information.",
    actionParams: {
      ticketId: "ticket-456",
      customerName: "Sara Al-Hassan",
      orderNumber: "12345",
      estimatedDelivery: "Tomorrow, 2-4 PM"
    },
    editableFields: [
      { key: "response", label: "Response", value: "Hi Sara! Your order #12345 is on its way. Expected delivery: Tomorrow between 2-4 PM. Track here: [link]", type: "textarea" }
    ],
    status: "pending",
    priority: "low",
    createdAt: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    id: "apr-004",
    agentId: "agent-inventory",
    agentName: "Inventory Agent",
    agentIcon: "📦",
    actionType: "reorder_stock",
    actionTitle: "Reorder low-stock item",
    actionDescription: "iPhone 15 Pro cases are running low (3 remaining). AI suggests ordering 50 units from supplier.",
    actionParams: {
      productName: "iPhone 15 Pro Case - Black",
      currentStock: 3,
      reorderQuantity: 50,
      supplier: "TechSupplies Co.",
      estimatedCost: 1250
    },
    editableFields: [
      { key: "reorderQuantity", label: "Quantity", value: 50, type: "number" }
    ],
    status: "pending",
    priority: "urgent",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString()
  },
  {
    id: "apr-005",
    agentId: "agent-cart",
    agentName: "Cart Recovery AI",
    agentIcon: "🛒",
    actionType: "send_email",
    actionTitle: "Send follow-up email to Fatima",
    actionDescription: "Customer viewed products 5 times but didn't purchase. AI suggests a personalized email with product recommendations.",
    actionParams: {
      customerName: "Fatima Khalid",
      email: "fatima.k@email.com",
      viewedProducts: ["Wireless Earbuds", "Smart Watch", "Phone Stand"]
    },
    editableFields: [
      { key: "subject", label: "Email Subject", value: "Still thinking about it? Here's a little help...", type: "text" },
      { key: "message", label: "Email Body", value: "Hi Fatima, we noticed you've been checking out some great items. Here are our top picks just for you!", type: "textarea" }
    ],
    status: "pending",
    priority: "low",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
  }
];

export const mockApprovedActions = [
  {
    id: "apr-010",
    agentName: "Cart Recovery AI",
    agentIcon: "🛒",
    actionTitle: "Sent recovery message to Mohammed",
    status: "approved" as const,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    completedAt: new Date(Date.now() - 2.5 * 3600000).toISOString()
  },
  {
    id: "apr-011",
    agentName: "Pricing Agent",
    agentIcon: "💰",
    actionTitle: "Updated price for Winter Jacket",
    status: "approved" as const,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 3600000).toISOString()
  }
];

export const mockStats = {
  activeAgents: 3,
  pendingApprovals: 12,
  completedToday: 47,
  savedHoursWeek: 8.5
};

export const mockAgents = [
  {
    id: "agent-cart",
    name: "Cart Recovery AI",
    icon: "🛒",
    description: "Recovers abandoned carts via WhatsApp & email",
    status: "active" as const,
    actionsToday: 15,
    successRate: 92
  },
  {
    id: "agent-pricing",
    name: "Pricing Agent",
    icon: "💰",
    description: "Optimizes prices based on demand & competition",
    status: "active" as const,
    actionsToday: 8,
    successRate: 88
  },
  {
    id: "agent-support",
    name: "Customer Support AI",
    icon: "💬",
    description: "Handles customer inquiries automatically",
    status: "active" as const,
    actionsToday: 24,
    successRate: 95
  },
  {
    id: "agent-inventory",
    name: "Inventory Agent",
    icon: "📦",
    description: "Manages stock levels and reorders",
    status: "paused" as const,
    actionsToday: 0,
    successRate: 90
  }
];

export const mockRecentActivity = [
  {
    id: "act-1",
    type: "approval",
    title: "Cart recovery message approved",
    description: "Sent to Mohammed Al-Rashid",
    agent: "Cart Recovery AI",
    icon: "✓",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: "act-2",
    type: "action",
    title: "Price updated automatically",
    description: "Winter Jacket reduced by 20%",
    agent: "Pricing Agent",
    icon: "💰",
    timestamp: new Date(Date.now() - 1 * 3600000).toISOString()
  },
  {
    id: "act-3",
    type: "pending",
    title: "New approval waiting",
    description: "Inventory reorder for iPhone cases",
    agent: "Inventory Agent",
    icon: "⏳",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: "act-4",
    type: "rejection",
    title: "Action rejected",
    description: "Discount too aggressive for margin",
    agent: "Pricing Agent",
    icon: "✗",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString()
  }
];
