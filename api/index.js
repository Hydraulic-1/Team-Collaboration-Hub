// api/index.js - Backend API for Team Collaboration Hub
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database
let teams = [];
let tasks = [];
let updates = [];

// ========== TEAMS API ==========

// Create a new team
app.post('/api/teams', (req, res) => {
    try {
        const { teamName, memberCount, eventName } = req.body;
        
        if (!teamName) {
            return res.status(400).json({ success: false, error: 'Team name is required' });
        }

        const newTeam = {
            id: Date.now().toString(),
            teamName,
            memberCount: memberCount || 0,
            eventName: eventName || 'General',
            createdAt: new Date().toISOString(),
            status: 'Active'
        };

        teams.push(newTeam);
        res.status(201).json({ success: true, team: newTeam });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Get all teams
app.get('/api/teams', (req, res) => {
    try {
        res.json({ success: true, teams, count: teams.length });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ========== TASKS API ==========

// Create a new task
app.post('/api/tasks', (req, res) => {
    try {
        const { teamName, taskTitle, assignedTo, priority, deadline } = req.body;
        
        if (!teamName || !taskTitle) {
            return res.status(400).json({ success: false, error: 'Team name and task title are required' });
        }

        const newTask = {
            id: Date.now().toString(),
            teamName,
            taskTitle,
            assignedTo: assignedTo || 'Unassigned',
            priority: priority || 'Medium',
            deadline: deadline || '',
            status: 'To Do',
            createdAt: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        tasks.push(newTask);
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    try {
        const { teamName, status } = req.query;
        let filtered = tasks;

        if (teamName) {
            filtered = filtered.filter(t => t.teamName === teamName);
        }

        if (status) {
            filtered = filtered.filter(t => t.status === status);
        }

        res.json({ success: true, tasks: filtered, count: filtered.length });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Update task status
app.patch('/api/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = tasks.find(t => t.id === id);
        
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        task.status = status;
        res.json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);

        if (tasks.length === initialLength) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.json({ success: true, message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ========== UPDATES API ==========

// Post a team update
app.post('/api/updates', (req, res) => {
    try {
        const { teamName, updateText, updateType } = req.body;
        
        if (!teamName || !updateText) {
            return res.status(400).json({ success: false, error: 'Team name and update text are required' });
        }

        const newUpdate = {
            id: Date.now().toString(),
            teamName,
            updateText,
            updateType: updateType || 'General',
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        updates.unshift(newUpdate); // Add to beginning
        res.status(201).json({ success: true, update: newUpdate });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Get all updates
app.get('/api/updates', (req, res) => {
    try {
        const { teamName, limit = 50 } = req.query;
        let filtered = updates;

        if (teamName) {
            filtered = filtered.filter(u => u.teamName === teamName);
        }

        filtered = filtered.slice(0, parseInt(limit));
        res.json({ success: true, updates: filtered, count: filtered.length });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Delete an update
app.delete('/api/updates/:id', (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = updates.length;
        updates = updates.filter(u => u.id !== id);

        if (updates.length === initialLength) {
            return res.status(404).json({ success: false, error: 'Update not found' });
        }

        res.json({ success: true, message: 'Update deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ========== STATISTICS API ==========

app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalTeams: teams.length,
            totalTasks: tasks.length,
            totalUpdates: updates.length,
            tasksByStatus: {
                'To Do': tasks.filter(t => t.status === 'To Do').length,
                'In Progress': tasks.filter(t => t.status === 'In Progress').length,
                'Completed': tasks.filter(t => t.status === 'Completed').length
            },
            tasksByPriority: {
                'High': tasks.filter(t => t.priority === 'High').length,
                'Medium': tasks.filter(t => t.priority === 'Medium').length,
                'Low': tasks.filter(t => t.priority === 'Low').length
            }
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Clear all data
app.delete('/api/clear-all', (req, res) => {
    try {
        teams = [];
        tasks = [];
        updates = [];
        res.json({ success: true, message: 'All data cleared' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Export for Vercel
module.exports = app;
