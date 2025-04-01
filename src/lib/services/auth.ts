import api from "../axios";

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (!response.data) throw new Error("Invalid credentials");

    const { access_token, refresh_token } = response.data;
    const user = await getUser(access_token);
    
    return { user: user, accessToken: access_token, refreshToken: refresh_token };
  } catch (error) {
    console.error("Authentication Error:", error);
    throw new Error("Authentication failed");
  }
}

export async function getUser(token: string) {
  try {
    const { data } = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data) throw new Error("User not found");
    return data;
  } catch (error) {
    console.error("User Fetch Error:", error);
    throw new Error("Failed to fetch user data");
  }
}


export async function refreshToken(token: string) {
  try {
    const response = await api.post("/auth/refresh-token", { token });
    return response.data;
  } catch (error) {
    console.error("User Fetch Error:", error);
    throw new Error("Unable to refresh token");
  }
}