export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Club {
  _id?: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  userId?: string;
  imageUrls?: string[];
}