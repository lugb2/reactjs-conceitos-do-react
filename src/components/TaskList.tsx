import { useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {

	// estados
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	// função para gerar um id random e garantir que não estará repetindo
	function generateRandomId(){
		
		// cria um id random
		let id = Math.random();

		// valida que não está repetindo
		let taskId = tasks.find((task) => task.id === id);

		// se encontrado task com o id
		if(taskId){

			// gera novamente
			id = generateRandomId();
		}

		// retorna o id
		return id;

	}

	// função para adicionar nova task
	function handleCreateNewTask() {
		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
		
		// verifica se preenchido task
		if(!newTaskTitle.trim()){
			return;
		}
		
		// cria nova task
		let newTask = {
			id: generateRandomId(),
			title: newTaskTitle,
			isComplete: false
		}

		// adiciona nova task
		setTasks([...tasks, newTask]);

		// limpa o título para uma nova task
		setNewTaskTitle('');

	}

	// função para alterar task para completa/incompleta
	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

		// encontra e altera a task marcada como completa / não completa
		setTasks(tasks.map((task) => {
			return task.id === id ? {
				...task,
				isComplete: !task.isComplete
			} : task;
		}));
	}

	// função para remover uma task
	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID

		// mantém apenas outras tasks
		let tasksFiltered = tasks.filter((task) => task.id !== id);

		// altera array de tasks
		setTasks(tasksFiltered);
		
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input 
						type="text" 
						placeholder="Adicionar novo todo" 
						onChange={(e) => setNewTaskTitle(e.target.value)}
						onKeyDown={(e) => e.keyCode === 13 && handleCreateNewTask()}
						value={newTaskTitle}
					/>
					<button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff"/>
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map(task => (
						<li key={task.id}>
							<div className={task.isComplete ? 'completed' : ''} data-testid="task" >
								<label className="checkbox-container">
								<input 
									type="checkbox"
									readOnly
									checked={task.isComplete}
									onClick={() => handleToggleTaskCompletion(task.id)}
								/>
								<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
								<FiTrash size={16}/>
							</button>
						</li>
					))}
				
				</ul>
			</main>
		</section>
	)
}