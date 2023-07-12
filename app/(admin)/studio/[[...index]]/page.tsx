"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Set the right `viewport`, `robots` and `referer` meta tags

export default function Studio() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return <NextStudio config={config} />;
}
