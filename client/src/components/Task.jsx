// src/components/Task.jsx
import { useState } from 'react';
import axios from 'axios';

const Task = ({ task, onDelete, onUpdate }) => {
	const [editableTask, setEditableTask] = useState({ ...task });

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setEditableTask(prevTask => ({
			...prevTask,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSave = () => {
		axios
			.put(`http://localhost:4000/api/tasks/${editableTask._id}`, editableTask)
			.then(response => {
				onUpdate(response.data); // Actualiza la tarea en la lista principal
			})
			.catch(error => console.error('Error al actualizar la tarea:', error));
	};

	return (
		<li>
			<input
				type='text'
				name='title'
				value={editableTask.title}
				onChange={handleChange}
			/>
			<textarea
				name='description'
				value={editableTask.description}
				onChange={handleChange}
			/>
			<input
				type='date'
				name='date'
				value={editableTask.date}
				onChange={handleChange}
			/>
			<label>
				Completada:
				<input
					type='checkbox'
					name='taskCompleted'
					checked={editableTask.taskCompleted}
					onChange={handleChange}
				/>
			</label>
			<button onClick={handleSave}>Guardar</button>
			<button onClick={() => onDelete(task._id)}>Eliminar</button>
		</li>
	);
};

export default Task;
