import { sql } from "./database.js";

const handleRequest = async (request) => {
  await sql`INSERT INTO visit_log VALUES (to_timestamp(${Date.now()} / 1000.0))`;
  const rows = await sql`SELECT COUNT(*) AS count FROM visit_log`;
  const count = rows[0].count;
  
  return new Response(`Amount of visits: ${count}`);
};

Deno.serve({ hostname: "0.0.0.0", port: 7777 }, handleRequest);
