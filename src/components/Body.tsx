import styles from "./Body.module.css";
import { PlusCircle } from "@phosphor-icons/react";

import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { Task } from "./Task";

import clipboard from '../assets/clipboard.svg';

export interface TaskProps {
    id: number
    title: string
    isComplete: boolean
}

const TASKS_ITEMS_STORAGE_KEY = '@todoapp:gregolly'

export function Body() {
    const [tasks, setTasks] = useState<TaskProps[]>(() => {
        const storedTasks = localStorage.getItem(TASKS_ITEMS_STORAGE_KEY)

        if(storedTasks) {
            return JSON.parse(storedTasks)
        }

        return []
    });
    const [newTask, setNewTask] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        setTasks([{id: Math.random(), title: newTask, isComplete: false }, ...tasks]);
        setNewTask('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTask(event.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo e obrigatorio!');
    }

    function deleteTask(id: number) {
        const tasksWithoutTheDeletedOne = tasks.filter(task => {
            return task.id !== id;
        })

        setTasks(tasksWithoutTheDeletedOne)
    }

    function taskComplete(id: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }
            return task
        }))
    }

    useEffect(() => {
        localStorage.setItem(TASKS_ITEMS_STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    let isNewTaskEmpty = newTask.length === 0
    let amountOfCompleteTask = tasks.filter(task => task.isComplete).length

    return (
        <div className={styles.wrapper}>
            <form className={styles.formWrapper} onSubmit={handleCreateNewTask}>
                <input 
                    className={styles.searchInput} 
                    type="text" 
                    placeholder="Adicione uma nova tarefa" 
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    value={newTask}
                    required
                />
                <button className={styles.createButton} type="submit" disabled={isNewTaskEmpty}>
                    Criar
                    <PlusCircle size={16} />
                </button>
            </form>

            <div className={styles.tasksWrapper}>
                <div className={styles.labels}>
                    <div className={styles.createdTasks}>Tarefas criadas <span>{ tasks.length }</span></div>
                    <div className={styles.doneTasks}>Concluídas <span>{amountOfCompleteTask} de { tasks.length }</span></div>
                </div>
                {
                    tasks.length > 0 ?
                        (<div className={styles.task}>
                            {tasks.map((task) => {
                                return (
                                    <Task
                                        task={task}
                                        onDeleteTask={deleteTask}
                                        onCompleteTask={taskComplete}
                                    />
                                )
                            })}
                        </div>
                        ) : (
                        <div className={styles.noTask}>
                            <img src={clipboard} alt="" />
                            <p className={styles.firstParagraph}>Você ainda não tem tarefas cadastradas</p>
                            <p className={styles.secondParagraph}>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    )
                } 
            </div>
        </div>
    )
}