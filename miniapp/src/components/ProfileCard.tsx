import React from "react";

interface Props {
  username?: string;
  trophies: number;
}

const ProfileCard: React.FC<Props> = ({ username, trophies }) => {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: 12,
        background: "rgba(0,0,0,0.1)",
        marginBottom: 12
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600 }}>
        {username || "Игрок"}
      </div>
      <div style={{ marginTop: 4 }}>Трофеи: {trophies}</div>
    </div>
  );
};

export default ProfileCard;
