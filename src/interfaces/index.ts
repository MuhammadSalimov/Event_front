export interface IPost {
  id: string;
  title: string;
  description: string;
  photo: string;
  price?: number;
  format: string;
  location?: string;
  startTime: string;
  startDate: string;
  maxAttendees?: number;
  categoryId: string;
  category: { categoryName: string };
  organizer: { fullName: string };
  _count: { participants: number };
}

export interface IUser {
  fullName: string;
  isActivated: boolean;
  id: string;
  role: string;
}

export interface IBooking {
  id: string;
  clientId: string;
  eventId: string;
  createdAt: string;
}

export interface ITicket {
  event: {
    format: string;
    location: string;
    maxAttendees: number;
    photo: string;
    price: number;
    startDate: string;
    title: string;
    startTime: string;
    organizer: { fullName: string };
  };
  user: {
    fullName: string;
  };
  eventId: string;
  id: string;
  userId: string;
}

export type AuthType = "register" | "login" | "forgot-password";

export interface IUserInfo {
  createdAt: string;
  email: string;
  fullName: string;
  isActivated: boolean;
  _count: { Participant: number; events: number };
}

export interface IDataCount {
  countParts: number;
  countEvent: number;
  countUser: number;
  countCateg: number;
  userInfo: IUserInfo[];
}

export interface Icategory {
  id: string;
  categoryName: string;
}
