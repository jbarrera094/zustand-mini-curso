import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import type { TaskStatus } from "../interfaces";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  const [onDragOver, setOnDragOver] = useState(false);
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);

  const addTask = useTaskStore((state) => state.addTask);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nuevo Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el titulo de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "El titulo es requerido";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  return {
    // Propierties
    isDragging,
    onDragOver,

    // Methods
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
