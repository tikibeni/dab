import { serve } from "./deps.js";
import { sql } from "./database.js";

const handleRequest = async (request) => {
  console.log(`Request to ${request.url}`);
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);

  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 })
  }
};

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const todo = await sql`SELECT * FROM todos WHERE id = ${id}`;
  
  if (!todo[0]) {
      return new Response("Not found", { status: 404 });
  }
  return Response.json(todo[0]);
};

const handleGetTodos = async (request) => {
  const todos = await sql`SELECT * FROM todos`;
  return Response.json(todos);
};

const handlePostTodos = async (request) => {
  let todo;
  try {
    todo = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  
  if (todo.item != "") {
    await sql`INSERT INTO todos (item) VALUES (${todo.item})`;
    return new Response("OK", { status: 200 });
  }
  return new Response("Bad request", { status: 400 });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetTodos,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleGetTodo,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostTodos,
  },
];

serve(handleRequest, { port: 7777 });
