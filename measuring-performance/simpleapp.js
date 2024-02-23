const todos = [];

const handleGetTodos = async (request) => {
  return Response.json(todos);
};

const handlePostTodos = async (request) => {
  try {
    const todo = await request.json();
    todos.push(todo);
    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Bad request", { status: 400 });
  }
}

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetTodos,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostTodos,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};

Deno.serve({ port: 7777 }, handleRequest);
