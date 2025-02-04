export interface Event {
  name: string;
  description: string | null;
  location: string;
  date: Date;
  totalTickets: number;
  maxTicketsPerUser: number;
  price: number;
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  availableTickets: number;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  verified: boolean;
}

export interface Payment {
  amount: number;
  userId: number;
  status: "success" | "failed" | "pending";
  id: number;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  paymentDate: Date;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
}

export interface Ticket {
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  userId: number;
  purchasedAt: Date | null;
  paymentId: number;
  ticketUid: string;
}

export interface TicketC extends Ticket {
  user: User;
  event: Event;
  payment: Payment;
  qr: string;
}

export interface UserTickets extends Event {
  tickets: TicketC[];
}
