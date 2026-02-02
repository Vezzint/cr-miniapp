import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import ProfileCard from "./components/ProfileCard";
import ModesList from "./components/ModesList";
import BattleResult from "./components/BattleResult";
import RewardsView from "./components/RewardsView";
import {
  authWithInitData,
  fetchModes,
  startBattle,
  fetchRewardsConfig
} from "./api";

declare global {
  interface Window {
    Telegram: any;
  }
}

interface User {
  id: number;
  trophies: number;
  username?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modes, setModes] = useState<any[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [delta, setDelta] = useState<number | null>(null);
  const [tiers, setTiers] = useState<{ tier: string; minTrophies: number }[]>(
    []
  );
  const [seasonName, setSeasonName] = useState<string | undefined>();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();

    const initData = tg?.initData || "";
    authWithInitData(initData)
      .then(async (u) => {
        setUser(u);
        const [modesData, rewards] = await Promise.all([
          fetchModes(),
          fetchRewardsConfig()
        ]);
        setModes(modesData);
        setTiers(rewards.rewardsConfig || []);
        setSeasonName(rewards.season?.name);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleStartBattle = async (modeId: number) => {
    if (!user) return;
    const res = await startBattle(user.id, modeId);
    setResult(res.result);
    setDelta(res.delta);
    setUser((prev) =>
      prev ? { ...prev, trophies: res.trophies } : prev
    );
  };

  if (!user) {
    return (
      <Layout>
        <div>Загрузка...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileCard username={user.username} trophies={user.trophies} />
      <ModesList modes={modes} onStartBattle={handleStartBattle} />
      <BattleResult result={result} delta={delta} />
      <RewardsView tiers={tiers} seasonName={seasonName} />
    </Layout>
  );
};

export default App;
