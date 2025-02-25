import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find();

		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

export const getTaskById = async (req, res) => {
	const { taskId } = req.params;

	try {
		const task = await Task.findById(taskId);

		if (!task) return res.status(404).json({ message: 'La tarea no existe' });

		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

// crear tarea en la base de datos
export const createTask = async (req, res) => {
	const { title, description, date } = req.body;

	try {
		if (await Task.findOne({ title }))
			return res.status(400).json({ message: 'El nombre de la tarea ya existe' });

		const newTask = new Task({
			title,
			description,
			date,
		});

		const taskSaved = await newTask.save();

		res.status(200).json({ taskSaved });
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

export const updateTask = async (req, res) => {
	try {
		const taskUpdated = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
		if (!taskUpdated) return res.status(404).json({ message: 'La tarea no existe' });
		res.status(200).json({ taskUpdated });
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

export const deleteTask = async (req, res) => {
	try {
		const taskDeleted = await Task.findByIdAndDelete(req.params.taskId);
		if (!taskDeleted) return res.status(404).json({ message: 'La tarea no existe' });
		res.status(200).json({ message: 'Tarea eliminada' });
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};
