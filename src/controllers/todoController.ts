import { Request, Response } from 'express';
import TodoModel from '../models/todoModel';

class TodoController {
    static async getAllTodos(req: Request, res: Response) {
        try {
            const todos = await TodoModel.getAllTodos();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async getTodoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const todo = await TodoModel.getTodoById(Number(id));
            if (!todo) {
                res.status(404).json({ error: 'Todo not found' });
            } else {
                res.status(200).json(todo);
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async createTodo(req: Request, res: Response) {
        try {
            const { title, description, completed } = req.body;
            const newTodo = await TodoModel.createTodo(
                title,
                description,
                completed
            );
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async updateTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, completed } = req.body;
            const updatedTodo = await TodoModel.updateTodo(
                Number(id),
                title,
                description,
                completed
            );
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await TodoModel.deleteTodo(Number(id));
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default TodoController;