import { postgres } from "../deps.js";

const sql = postgres({});

const getTodo = async (id) => {
  const todo = await sql`SELECT * FROM todos WHERE id = ${id}`;
  if (!todo[0]) return ("Not found", { status: 404 })
  return todo[0]
};

const getTodos = async () => {
  return await sql`SELECT * FROM todos`;
};

const addTodo = async (item) => {
  await sql`INSERT INTO todos (item) VALUES (${item})`;
};

const deleteTodo = async (id) => {
  try {
    await sql`DELETE FROM todos WHERE id = ${id}`;
      return ("OK", { status: 200 });
    } catch {
      return ("Not found", { status: 404 });
    }
}

export { getTodo, getTodos, addTodo, deleteTodo };
