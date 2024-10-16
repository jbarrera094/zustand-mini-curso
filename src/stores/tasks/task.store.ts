import { create, type StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";

import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

// import { produce } from "immer";

import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<
  TaskState,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",
      status: "open",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",
      status: "open",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",
      status: "open",
    },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // const tasks = get().tasks;
    // const task = tasks[taskId];
    // task.status = status;

    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });

    // ? forma nativa de zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const traskId = get().draggingTaskId;
    if (!traskId) return;

    get().changeTaskStatus(traskId, status);
    get().removeDraggingTaskId();
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = {
      id: uuidv4(),
      title,
      status,
    };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // ? forma nativa de zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));

    // ? requiere npm i immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );
  },
});

export const useTaskStore = create<TaskState>()(devtools(immer(storeApi)));
