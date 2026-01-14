import axios from "axios";
import { loggedInUser } from "$lib/runes.svelte";
import type { Club } from "$lib/types/placemark-types";

const baseUrl = "http://localhost:3000";

export const placemarkService = {
  // Registrierung
  async signup(firstName: string, lastName: string, email: string, password: string) {
    console.log("Signing up user:", email);
    try {
      const user = { firstName, lastName, email, password };
      // POST an /api/users
      const response = await axios.post(`${baseUrl}/api/users`, user);
      console.log("Signup response:", response.data);
      return response.status === 201; 
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // Login
  async login(email: string, password: string) {
    try {
      // POST an /api/users/authenticate
      const response = await axios.post(`${baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        loggedInUser.email = email;
        loggedInUser.userId = response.data.userId; // User ID speichern
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

  async createClub(club: Club) {
    try {
      // Backend erwartet die userId im Body
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
  }
};