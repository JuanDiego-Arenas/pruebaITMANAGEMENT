import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {FRONTEND_URL} from './config.js'

// Rutas importadas


const app = express();

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_URL,
	})
);
app.use(morgan('dev'));
app.use(express.json());

// Rutas


app.use((req, res, next) => {
	res.status(404).json({
		message: 'Not found',
	});
});

export default app;
