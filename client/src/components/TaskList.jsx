// src/components/TaskList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		date: '',
		taskCompleted: false,
	});

	const fetchTasks = () => {
		axios
			.get('http://localhost:4000/api/tasks')
			.then(response => {
				const tasksWithFormattedDates = response.data.map(task => ({
					...task,
					date: task.date ? task.date.split('T')[0] : '',
				}));
				setTasks(tasksWithFormattedDates);
			})
			.catch(error => console.error('Error al obtener las tareas:', error));
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setNewTask(prevTask => ({
			...prevTask,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const addTask = e => {
		e.preventDefault();
		if (newTask.title.trim() === '') return;

		axios
			.post('http://localhost:4000/api/tasks', newTask)
			.then(() => {
				fetchTasks();
				setNewTask({ title: '', description: '', date: '', taskCompleted: false });
			})
			.catch(error => console.error('Error al agregar la tarea:', error));
	};

	const deleteTask = id => {
		axios
			.delete(`http://localhost:4000/api/tasks/${id}`)
			.then(() => fetchTasks())
			.catch(error => console.error('Error al eliminar la tarea:', error));
	};

	const updateTaskInList = updatedTask => {
		setTasks(prevTasks => prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
	};

	return (
		<div className='container mt-4'>
			<h1>Lista de Tareas</h1>

			<form onSubmit={addTask}>
				<input
					type='text'
					name='title'
					value={newTask.title}
					onChange={handleChange}
					placeholder='Título de la tarea'
				/>
				<textarea
					name='description'
					value={newTask.description}
					onChange={handleChange}
					placeholder='Descripción de la tarea'
				/>
				<input
					type='date'
					name='date'
					value={newTask.date}
					onChange={handleChange}
				/>
				<button type='submit'>Agregar</button>
			</form>

			<ul>
				{tasks.map(task => (
					<Task
						key={task._id}
						task={task}
						onDelete={deleteTask}
						onUpdate={updateTaskInList}
					/>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
