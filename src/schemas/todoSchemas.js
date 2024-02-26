const { z } = require("zod");

const createTodoSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
});

module.exports = { createTodoSchema };
