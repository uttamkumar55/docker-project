// Initial tasks array
let tasks = [
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Send weekly report", completed: true },
    { id: 3, text: "Schedule team meeting", completed: false }
];

// Current filter
let currentFilter = 'all';

// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const activeCounter = document.getElementById('activeCounter');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
        themeToggle.setAttribute('title', 'Toggle light mode');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.setAttribute('title', 'Toggle dark mode');
    }
});

// Render tasks based on filter
function renderTasks() {
    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Update counter
    const activeTasks = tasks.filter(task => !task.completed).length;
    activeCounter.textContent = activeTasks;
    
    // Clear list
    tasksList.innerHTML = '';
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
    
    // Render tasks
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                aria-label="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}"
                title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="task-btn edit" aria-label="Edit task" title="Edit task">
                    <i class="fas fa-pen" aria-hidden="true"></i>
                </button>
                <button class="task-btn delete" aria-label="Delete task" title="Delete task">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        `;
        
        // Handle task completion
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            toggleTaskStatus(task.id);
        });
        
        // Handle edit button
        const editBtn = li.querySelector('.edit');
        editBtn.addEventListener('click', () => {
            editTask(task.id);
        });
        
        // Handle delete button
        const deleteBtn = li.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });
        
        tasksList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        
        tasks.unshift(newTask); // Add to beginning for better UX
        taskInput.value = '';
        renderTasks();
    }
}

// Toggle task status
function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit task:', task.text);
    
    if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText.trim() };
            }
            return task;
        });
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

// Change filter
function changeFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    renderTasks();
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        changeFilter(btn.getAttribute('data-filter'));
    });
});

// Initial render
renderTasks();