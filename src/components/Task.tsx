import { useState } from 'react';
import styles from './Task.module.css';

import { Trash } from '@phosphor-icons/react';
import { TaskProps } from './Body';

interface TaskInnerProps {
    task: TaskProps
    onDeleteTask: (id: number) => void
    onCompleteTask: (id: number) => void
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskInnerProps) {

    function handleCompleteTask() {
        onCompleteTask(task.id)
    }

    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.task}>
                <div>
                    <input 
                        type="checkbox" 
                        id='task' 
                        onChange={handleCompleteTask}
                        required
                    />
                    <label 
                        htmlFor="task" 
                        className={!task.isComplete ? styles.noLineThrough : styles.withLineThrough}
                    >
                        { task.title }
                    </label>
                </div>
                <button className={styles.deleteButton} onClick={handleDeleteTask}>
                    <Trash size={24} />
                </button>
            </div>
        </div>
    )
}