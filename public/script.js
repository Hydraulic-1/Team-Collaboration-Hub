// script.js - Frontend JavaScript

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked tab and button
        document.getElementById(tabName).classList.add('active');
        btn.classList.add('active');
        
        // Load data for the tab
        if (tabName === 'dashboard') loadDashboard();
        if (tabName === 'teams') loadTeams();
        if (tabName === 'tasks') loadTasks();
        if (tabName === 'updates') loadUpdates();
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

// ========== TEAMS FUNCTIONS ==========

document.getElementById('teamForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const teamData = {
        teamName: document.getElementById('teamName').value,
        memberCount: document.getElementById('memberCount').value,
        eventName: document.getElementById('eventName').value
    };

    try {
        const response = await fetch(`${API_URL}/teams`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teamData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Team registered successfully!', 'success');
            document.getElementById('teamForm').reset();
            loadTeams();
            loadDashboard();
        } else {
            showNotification('Failed to register team', 'error');
        }
    } catch (error) {
        showNotification('Error connecting to server', 'error');
    }
});

async function loadTeams() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        const data = await response.json();

        const container = document.getElementById('teamsContainer');
        const filterTeam = document.getElementById('filterTeam');

        if (data.success && data.teams.length > 0) {
            container.innerHTML = data.teams.map(team => `
                <div class="team-card">
                    <h4>${team.teamName}</h4>
                    <div class="team-info">👥 Members: ${team.memberCount}</div>
                    <div class="team-info">🎯 Event: ${team.eventName}</div>
                    <div class="team-info">📅 Registered: ${new Date(team.createdAt).toLocaleDateString()}</div>
                    <span class="team-badge">${team.status}</span>
                </div>
            `).join('');

            // Update filter dropdown
            filterTeam.innerHTML = '<option value="">All Teams</option>' + 
                data.teams.map(team => `<option value="${team.teamName}">${team.teamName}</option>`).join('');
        } else {
            container.innerHTML = '<p class="empty-message">No teams registered yet</p>';
        }
    } catch (error) {
        console.error('Error loading teams:', error);
    }
}

// ========== TASKS FUNCTIONS ==========

document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const taskData = {
        teamName: document.getElementById('taskTeamName').value,
        taskTitle: document.getElementById('taskTitle').value,
        assignedTo: document.getElementById('assignedTo').value,
        priority: document.getElementById('priority').value,
        deadline: document.getElementById('deadline').value
    };

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Task created successfully!', 'success');
            document.getElementById('taskForm').reset();
            loadTasks();
            loadDashboard();
        } else {
            showNotification('Failed to create task', 'error');
        }
    } catch (error) {
        showNotification('Error connecting to server', 'error');
    }
});

async function loadTasks() {
    try {
        const teamFilter = document.getElementById('filterTeam')?.value || '';
        const statusFilter = document.getElementById('filterStatus')?.value || '';

        let url = `${API_URL}/tasks?`;
        if (teamFilter) url += `teamName=${teamFilter}&`;
        if (statusFilter) url += `status=${statusFilter}`;

        const response = await fetch(url);
        const data = await response.json();

        const todoContainer = document.getElementById('todoTasks');
        const inprogressContainer = document.getElementById('inprogressTasks');
        const completedContainer = document.getElementById('completedTasks');

        const todoTasks = data.tasks.filter(t => t.status === 'To Do');
        const inprogressTasks = data.tasks.filter(t => t.status === 'In Progress');
        const completedTasks = data.tasks.filter(t => t.status === 'Completed');

        todoContainer.innerHTML = todoTasks.length ? todoTasks.map(task => createTaskCard(task)).join('') : '<p class="empty-message">No tasks</p>';
        inprogressContainer.innerHTML = inprogressTasks.length ? inprogressTasks.map(task => createTaskCard(task)).join('') : '<p class="empty-message">No tasks</p>';
        completedContainer.innerHTML = completedTasks.length ? completedTasks.map(task => createTaskCard(task)).join('') : '<p class="empty-message">No tasks</p>';

    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function createTaskCard(task) {
    const priorityIcon = task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢';
    
    return `
        <div class="task-card priority-${task.priority}">
            <div class="task-title">${task.taskTitle}</div>
            <div class="task-details">👤 ${task.assignedTo}</div>
            <div class="task-details">👥 ${task.teamName}</div>
            <div class="task-details">${priorityIcon} ${task.priority} Priority</div>
            ${task.deadline ? `<div class="task-details">⏰ ${new Date(task.deadline).toLocaleString()}</div>` : ''}
            <div class="task-actions">
                ${task.status !== 'To Do' ? `<button style="background: #3498db; color: white;" onclick="updateTaskStatus('${task.id}', 'To Do')">To Do</button>` : ''}
                ${task.status !== 'In Progress' ? `<button style="background: #f39c12; color: white;" onclick="updateTaskStatus('${task.id}', 'In Progress')">In Progress</button>` : ''}
                ${task.status !== 'Completed' ? `<button style="background: #2ecc71; color: white;" onclick="updateTaskStatus('${task.id}', 'Completed')">Complete</button>` : ''}
                <button class="btn-danger" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        </div>
    `;
}

async function updateTaskStatus(taskId, newStatus) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Task status updated!', 'success');
            loadTasks();
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error updating task', 'error');
    }
}

async function deleteTask(taskId) {
    if (!confirm('Delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Task deleted', 'success');
            loadTasks();
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error deleting task', 'error');
    }
}

// ========== UPDATES FUNCTIONS ==========

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const updateData = {
        teamName: document.getElementById('updateTeamName').value,
        updateType: document.getElementById('updateType').value,
        updateText: document.getElementById('updateText').value
    };

    try {
        const response = await fetch(`${API_URL}/updates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Update posted successfully!', 'success');
            document.getElementById('updateForm').reset();
            loadUpdates();
            loadDashboard();
        } else {
            showNotification('Failed to post update', 'error');
        }
    } catch (error) {
        showNotification('Error connecting to server', 'error');
    }
});

async function loadUpdates() {
    try {
        const response = await fetch(`${API_URL}/updates`);
        const data = await response.json();

        const container = document.getElementById('updatesContainer');

        if (data.success && data.updates.length > 0) {
            container.innerHTML = data.updates.map(update => {
                const typeIcon = {
                    'Progress': '📈',
                    'Achievement': '🏆',
                    'Blocker': '⚠️',
                    'General': '💬'
                }[update.updateType] || '💬';

                return `
                    <div class="update-item ${update.updateType}">
                        <div class="update-header">
                            <span class="update-team">${update.teamName}</span>
                            <span class="update-type">${typeIcon} ${update.updateType}</span>
                        </div>
                        <div class="update-text">${update.updateText}</div>
                        <div class="update-footer">
                            <span>${update.date} ${update.time}</span>
                            <button class="btn-danger" onclick="deleteUpdate('${update.id}')">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            container.innerHTML = '<p class="empty-message">No updates posted yet</p>';
        }
    } catch (error) {
        console.error('Error loading updates:', error);
    }
}

async function deleteUpdate(updateId) {
    if (!confirm('Delete this update?')) return;

    try {
        const response = await fetch(`${API_URL}/updates/${updateId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Update deleted', 'success');
            loadUpdates();
            loadDashboard();
        }
    } catch (error) {
        showNotification('Error deleting update', 'error');
    }
}

// ========== DASHBOARD FUNCTIONS ==========

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();

        if (data.success) {
            const stats = data.stats;

            // Update stat cards
            document.getElementById('statsTeams').textContent = stats.totalTeams;
            document.getElementById('statsTasks').textContent = stats.totalTasks;
            document.getElementById('statsUpdates').textContent = stats.totalUpdates;

            // Update progress bars
            const total = stats.totalTasks || 1;
            document.getElementById('progressTodo').style.width = `${(stats.tasksByStatus['To Do'] / total) * 100}%`;
            document.getElementById('progressInProgress').style.width = `${(stats.tasksByStatus['In Progress'] / total) * 100}%`;
            document.getElementById('progressCompleted').style.width = `${(stats.tasksByStatus['Completed'] / total) * 100}%`;

            document.getElementById('countTodo').textContent = stats.tasksByStatus['To Do'];
            document.getElementById('countInProgress').textContent = stats.tasksByStatus['In Progress'];
            document.getElementById('countCompleted').textContent = stats.tasksByStatus['Completed'];
        }

        // Load recent updates
        const updatesResponse = await fetch(`${API_URL}/updates?limit=5`);
        const updatesData = await updatesResponse.json();

        const recentContainer = document.getElementById('recentUpdates');

        if (updatesData.success && updatesData.updates.length > 0) {
            recentContainer.innerHTML = updatesData.updates.map(update => `
                <div class="update-item-small">
                    <div class="team-name">${update.teamName}</div>
                    <div class="update-text">${update.updateText}</div>
                    <div class="update-time">${update.date} ${update.time}</div>
                </div>
            `).join('');
        } else {
            recentContainer.innerHTML = '<p class="empty-message">No updates yet</p>';
        }

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// ========== UTILITY FUNCTIONS ==========

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto-refresh every 30 seconds
setInterval(() => {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    if (activeTab === 'dashboard') loadDashboard();
    if (activeTab === 'teams') loadTeams();
    if (activeTab === 'tasks') loadTasks();
    if (activeTab === 'updates') loadUpdates();
}, 30000);
