import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-domain.com/api"
});

export async function authWithInitData(initData: string) {
  const { data } = await api.post("/auth/auth", { initData });
  return data.user as { id: number; trophies: number; username?: string };
}

export async function fetchProfile(userId: number) {
  const { data } = await api.get(`/profile/profile/${userId}`);
  return data;
}

export async function fetchModes() {
  const { data } = await api.get("/modes/modes");
  return data as { id: number; key: string; name: string; description: string }[];
}

export async function startBattle(userId: number, modeId: number) {
  const { data } = await api.post("/battles/battle/start", { userId, modeId });
  return data as { result: string; delta: number; trophies: number };
}

export async function fetchRewardsConfig() {
  const { data } = await api.get("/rewards/rewards/current");
  return data;
}
