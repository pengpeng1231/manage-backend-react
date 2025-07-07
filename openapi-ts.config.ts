import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8080/doc/v3/api-docs",
  output: "src/client",
  plugins: [
    {
      name: "@hey-api/client-axios",
    },
  ],
});
