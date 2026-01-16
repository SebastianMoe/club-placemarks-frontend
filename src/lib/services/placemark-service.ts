import axios from "axios";
import { loggedInUser } from "$lib/runes.svelte";
import type { Club, User, MemberStats } from "$lib/types/placemark-types";

const baseUrl = "http://localhost:3000";

export const placemarkService = {
  async signup(firstName: string, lastName: string, email: string, password: string) {
    console.log("Signing up user:", email);
    try {
      const user = { firstName, lastName, email, password };
      const response = await axios.post(`${baseUrl}/api/users`, user);
      console.log("Signup response:", response.data);
      return response.status === 201; 
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        loggedInUser.email = email;
        loggedInUser.userId = response.data.userId; 
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getClubs() {
    try {
      const response = await axios.get(`${baseUrl}/api/clubs`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getClub(id: string): Promise<Club | null> {
    try {
      const response = await axios.get(`${baseUrl}/api/clubs/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async createClub(club: Club) {
    try {
      const newClub = {
        ...club,
        userId: loggedInUser.userId
      };
      const response = await axios.post(`${baseUrl}/api/clubs`, newClub);
      return response.status === 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async createClubWithImage(name: string, description: string, category: string, lat: number, lng: number, file: File | null) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("latitude", lat.toString());
      formData.append("longitude", lng.toString());
      formData.append("userId", loggedInUser.userId); 
      
      if (file) {
        formData.append("image", file); 
      }

      const response = await axios.post(`${baseUrl}/api/clubs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.status === 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async deleteClub(id: string) {
    try {
      const response = await axios.delete(`${baseUrl}/api/clubs/${id}`);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async deleteUser(id: string) {
    try {
      const response = await axios.delete(`${baseUrl}/api/users/${id}`);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async logout() {
    loggedInUser.email = "";
    loggedInUser.userId = "";
    return true;
  },

  async getMemberStats(clubId: string): Promise<MemberStats[]> {
    try {
      const response = await axios.get(`${baseUrl}/api/clubs/${clubId}/stats`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async addMemberStats(clubId: string, stats: MemberStats): Promise<boolean> {
    try {
      const response = await axios.post(`${baseUrl}/api/clubs/${clubId}/stats`, stats);
      return response.status === 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};