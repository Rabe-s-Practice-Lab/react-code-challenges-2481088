import React from "react";

export default function DarkMode() {
  const [hasDarkMode, setHasDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (hasDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [hasDarkMode]);

  return (
    <div className="page">
      <button className="dark-mode-button" onClick={() => setHasDarkMode(true)}>
        Dark Mode
      </button>
      <button
        className="light-mode-button"
        onClick={() => setHasDarkMode(false)}
      >
        Light Mode
      </button>
    </div>
  );
}
