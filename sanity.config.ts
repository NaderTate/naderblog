import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import { codeInput } from "@sanity/code-input";
import Logo from "./components/Logo";
import StudioNavbar from "./components/StudioNavbar";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export default defineConfig({
  basePath: "/studio",
  name: "NaderBlog_Content_Studio",
  title: "NaderBlog Content Studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
    theme: myTheme,
  },
});
