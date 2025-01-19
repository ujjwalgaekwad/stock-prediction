const toggleThemeModeAtRootElem = (theme) => {
  const rootElem = document.getElementById("theme-root");
  rootElem?.classList.remove("dark", "light");
  rootElem?.classList.add(theme);
};

const getThemeModeAtRootElem = () =>
  document.getElementById("theme-root")?.classList.contains("dark")
    ? "dark"
    : "light";

const syncRootTheme = (theme) => {
  if (getThemeModeAtRootElem() !== theme) {
    toggleThemeModeAtRootElem(theme)
  }
};

export { toggleThemeModeAtRootElem, getThemeModeAtRootElem, syncRootTheme };
