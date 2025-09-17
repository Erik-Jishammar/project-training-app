import express from 'express'; 
import { getExercises, createExercise, updateExercise, deleteExercise } from '../controllers/exerciseController.js';

const router = express.Router(); 

router.get('/exercises', getExercises);

router.post('/form', createExercise); 

router.put('/exercises/:id', updateExercise); 

router.delete('/exercises/:id', deleteExercise); 

export default router; 