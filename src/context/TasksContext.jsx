import { createContext, useContext, useState } from "react";
import {
    createTaskRequest,
    updateTaskRequest,
    deleteTaskRequest,
    getTaskRequest,
    getTasksRequest,
    getOtherTasksRequest
} from "../api/tasks";

const TaskContext = createContext(); 

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);
    const [otherTasks, setOtherTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getOtherTasks = async () => {
        try {
            const res = await getOtherTasksRequest();
            setOtherTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task);
            //return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                createTask,
                getTasks,
                deleteTask,
                getTask,
                updateTask,
                getOtherTasks,
                otherTasks
            }}>
            {children}
        </TaskContext.Provider>
    );
}