import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/interface/Task";

const STORAGE_KEY= 'TASKS';

export const saveTask = async (task:Task[])=>{
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(task));

    } catch (error) {
        console.error("Failed to save task")
    }
}

export const loadTask = async (): Promise<Task[]>=>{
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
         return data ? JSON.parse(data): []
    } catch (error) {
        console.error("Failed to load the data ")
    }
    return []
}

