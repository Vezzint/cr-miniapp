import React from "react";

interface Mode {
  id: number;
  name: string;
  description: string;
}

interface Props {
  modes: Mode[];
  onStartBattle: (modeId: number) => void;
}

const ModesList: React.FC<Props> = ({ modes, onStartBattle }) => {
  return (
    <div>
      <h3>Режимы</h3>
      {modes.map((m) => (
        <div
          key={m.id}
          style={{
            borderRadius: 12,
            padding: 10,
            background: "rgba(0,0,0,0.05)",
            marginBottom: 8
          }}
        >
          <div style={{ fontWeight: 600 }}>{m.name}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{m.description}</div>
          <button
            style={{ marginTop: 6 }}
            onClick={() => onStartBattle(m.id)}
          >
            Играть
          </button>
        </div>
      ))}
    </div>
  );
};

export default ModesList;
