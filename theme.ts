import { buildLegacyTheme } from "sanity";
const props = {
  "--my--white": "#fff",
  "--my--black": "#1a1a1a",
  "--my--gray": "#666",
  "--my--green": "#0f0",
  "--my--red": "#f00",
  "--my--blue": "#00f",
  "--my--yellow": "#ff0",
};

export const myTheme = buildLegacyTheme({
  "--black": props["--my--black"],
  "--white": props["--my--white"],
  "--gray": props["--my--gray"],

  "--component-bg": props["--my--black"],
  "--component-text-color": props["--my--white"],

  "--brand-primary": "#666",
  "--default-button-color": props["--my--yellow"],
  "--default-button-primary-color": props["--my--yellow"],
  "--default-button-success-color": props["--my--white"],
  "--default-button-warning-color": props["--my--white"],
  "--default-button-danger-color": props["--my--white"],
  // state
  "--state-success-color": props["--my--green"],
  "--state-warning-color": props["--my--yellow"],
  "--state-danger-color": props["--my--red"],
  "--state-info-color": props["--my--blue"],

  //   Navbar
  "--main-navigation-color": props["--my--black"],
  "--main-navigation-color--inverted": props["--my--white"],
  "--focus-color": props["--my--blue"],
});
