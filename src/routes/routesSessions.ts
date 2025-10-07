	import express from 'express'; 
	import { getSession, createSession, updateSession, deleteSession } from '../controllers-b/sessionController';


	const router = express.Router(); 

	router.get('/sessions', getSession);

	router.post('/sessions', createSession); 

	router.put('/sessions/:id', updateSession); 

	router.delete('/sessions/:id', deleteSession); 

	router.get("/ping", (req, res) => {
  res.json({ message: "Servern svarar 🚀" });
});

	export default router; 
