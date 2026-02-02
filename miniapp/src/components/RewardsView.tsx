import React from "react";

interface Tier {
  tier: string;
  minTrophies: number;
}

interface Props {
  seasonName?: string;
  tiers: Tier[];
}

const RewardsView: React.FC<Props> = ({ seasonName, tiers }) => {
  if (!tiers.length) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <h3>Награды сезона {seasonName}</h3>
      {tiers.map((t) => (
        <div key={t.tier}>
          {t.tier.toUpperCase()} — от {t.minTrophies} трофеев
        </div>
      ))}
    </div>
  );
};

export default RewardsView;
