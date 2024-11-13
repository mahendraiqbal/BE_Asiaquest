import pool from '../utils/database';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

class TodoModel {
    static async getAllTodos(): Promise<Todo[]> {
        const result = await pool.query('SELECT * FROM todos');
        return result.rows;
    }

    static async getTodoById(id: number): Promise<Todo | null> {
        const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    static async createTodo(
        title: string,
        description: string,
        completed: boolean
    ): Promise<Todo> {
        const result = await pool.query(
            'INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
            [title, description, completed]
        );
        return result.rows[0];
    }

    static async updateTodo(
        id: number,
        title: string,
        description: string,
        completed: boolean
    ): Promise<Todo> {
        const result = await pool.query(
            'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
            [title, description, completed, id]
        );
        return result.rows[0];
    }

    static async deleteTodo(id: number): Promise<void> {
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    }
}

export default TodoModel;