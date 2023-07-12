import { cache } from "react";
import { client } from "./sanity.client";

export const cachedClient = cache(client.fetch.bind(client));
