import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ padding: 12, fontFamily: "system-ui, sans-serif" }}>
      {children}
    </div>
  );
};

export default Layout;
