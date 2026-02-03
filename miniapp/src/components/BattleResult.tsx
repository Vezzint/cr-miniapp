import React from "react";

interface Props {
  result: string | null;
  delta: number | null;
}

const BattleResult: React.FC<Props> = ({ result, delta }) => {
  if (!result) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div>Результат: {result}</div>
      <div>Изменение трофеев: {delta}</div>
    </div>
  );
};

export default BattleResult;
