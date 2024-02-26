const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createTodoSchema } = require("../schemas/todoSchemas");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json({ error: false, data: todos });
  } catch (error) {
    res
      .status(500)
      .json({
        error: true,
        message: "An error occurred while fetching todos.",
        data: null,
      });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);

    const todo = await prisma.todo.create({
      data: validatedData,
    });

    // To update api call count
    await prisma.apiCallCount.upsert({
      where: { type: "add" },
      update: { count: { increment: 1 } },
      create: { type: "add", count: 1 },
    });

    res.json({ error: false, data: todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.errors || error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  // First, check if the Todo item exists
  const existingTodo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingTodo) {
    return res
      .status(404)
      .json({ error: true, message: "Todo not found", data: null });
  }

  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, completed },
  });

  // To update api call count
  await prisma.apiCallCount.upsert({
    where: { type: "update" },
    update: { count: { increment: 1 } },
    create: { type: "update", count: 1 },
  });

  res.json({ error: false, data: todo, message: "" });
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const existingTodo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingTodo) {
    return res
      .status(404)
      .json({ error: true, message: "Todo not found", data: null });
  }

  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });

  res.json({ error: false, message: "Todo deleted", data: null });
};
