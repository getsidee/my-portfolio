import { createClient } from "@sanity/client";

export const client = createClient({

  projectId: "6pwbz48s", 
  dataset: "production",
  useCdn: true, 
  apiVersion: "2024-04-15",
});