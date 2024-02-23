import * as todoService from "./services/todoService.js"
import { cacheMethodCalls } from "./util/cacheUtil.js";

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

const cachedTodoService = cacheMethodCalls(todoService, ["addTodo"])

const handleGetTodo = async (urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  return Response.json(await cachedTodoService.getTodo(id))
};

const handleGetTodos = async () => {
  return Response.json(await cachedTodoService.getTodos());
};

const handlePostTodos = async (request) => {
  let todo;
  try {
    todo = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  
  if (todo.item != "") {
    await cachedTodoService.addTodo(todo.item)
    return new Response("OK", { status: 200 });
  }
  return new Response("Bad request", { status: 400 });
};

const handleDeleteTodo = async (urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  return new Response(cachedTodoService.deleteTodo(id))
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
  {
    method: "DELETE",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleDeleteTodo,
  }
];

Deno.serve({ port: 7777, hostname: '0.0.0.0' }, handleRequest);
