	import express from 'express'; 
	import { getSessions, createSession, updateSession, deleteSession } from '../controllers-b/sessionController.js';


	const router = express.Router(); 

	router.get('/exercises', getSessions);
	router.post('/exercises', createSession);
	router.put('/exercises/:id', updateSession);
	router.delete('/exercises/:id', deleteSession);

	router.get("/ping", (req, res) => {
  res.json({ message: "Servern svarar" });
});

	export default router; 
