import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addTodo = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const { title } = args;

    await ctx.db.insert("todos", {
      title,
      completed: false,
    });
  },
});

export const getTodos = query({
  args: {},
  handler: async (ctx, _) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const { id } = args;
    const todo = await ctx.db.get(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(id, {
      completed: !todo.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) {
      throw new Error("Id is required");
    }
    await ctx.db.delete(id);
  },
});

export const clearCompletedTodos = mutation({
  args: {},
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .withIndex("byCompleted", (q) => q.eq("completed", true))
      .collect();
    if (!completedTodos.length) {
      throw new Error("No completed todos found");
    }

    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), title: v.string() },
  handler: async (ctx, args) => {
    const { id, title } = args;
    const todo = await ctx.db.get(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await ctx.db.patch(id, {
      title,
    });
  },
});

export const deleteALlTodos = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
  },
});
