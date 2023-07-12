"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";
import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio/metadata";

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata: Metadata = {
  ...studioMetadata,
  // Overrides the viewport to resize behavior
  viewport: `${studioMetadata.viewport}, interactive-widget=resizes-content`,
};
export default function Studio() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return <NextStudio config={config} />;
}
