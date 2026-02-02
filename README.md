# 🚀 Team Collaboration Hub - Pravaah'26 Web Hackathon

## 📋 Project Overview

**Team Collaboration Hub** - A real-time collaboration platform designed for hackathon teams to manage tasks, share updates, and track progress during Pravaah'26 at IIT Bhubaneswar.

### Problem Statement
During hackathons, teams struggle with:
- Coordinating tasks among team members
- Tracking progress in real-time
- Sharing updates and blockers
- Managing deadlines and priorities

This platform solves these problems with an intuitive dashboard that centralizes all team activities.

---

## ✨ Features

### 📊 Dashboard
- Real-time statistics overview
- Task progress visualization
- Recent activity feed
- Auto-refreshing data

### 👥 Team Management
- Register multiple teams
- Track team members and events
- View all registered teams
- Team status monitoring

### ✅ Task Management
- Create and assign tasks
- Set priorities (High, Medium, Low)
- Track task status (To Do, In Progress, Completed)
- Kanban-style board view
- Deadline management
- Filter by team and status

### 📢 Team Updates
- Post progress updates
- Share achievements
- Report blockers
- Live activity feed
- Update categorization

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js
- **Database**: In-memory (perfect for hackathon demo)
- **Deployment**: Vercel (serverless)

---

## 📁 File Structure

```
team-collaboration-hub/
├── api/
│   └── index.js          ← Backend API (Vercel serverless function)
├── public/               ← Create this folder on GitHub
│   ├── index.html        ← Main webpage
│   ├── styles.css        ← Styling
│   └── script.js         ← Frontend logic
├── package.json          ← Dependencies
├── vercel.json           ← Vercel configuration
└── README.md             ← This file
```

---

## 🚀 DEPLOYMENT GUIDE (Step-by-Step)

### STEP 1: Create GitHub Repository

1. Go to https://github.com/
2. Click "+" → "New repository"
3. Name it: `team-collaboration-hub`
4. Make it **Public**
5. Click "Create repository"

---

### STEP 2: Upload Files to GitHub

#### Upload Main Files:
1. Click "Add file" → "Upload files"
2. Upload these 3 files:
   - `package.json`
   - `vercel.json`
   - `README.md`
3. Click "Commit changes"

#### Create `api` Folder:
1. Click "Add file" → "Create new file"
2. Type: `api/index.js`
3. Copy the content from `api-index.js` file
4. Paste it and click "Commit"

#### Create `public` Folder:
1. Click "Add file" → "Create new file"
2. Type: `public/index.html`
3. Copy the content from `index.html` file
4. Paste it and click "Commit"

5. Repeat for `public/styles.css` and `public/script.js`

---

### STEP 3: Deploy to Vercel

1. Go to https://vercel.com/
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel
4. Click "Add New..." → "Project"
5. Select your `team-collaboration-hub` repository
6. Click "Deploy"
7. Wait 2-3 minutes ⏳
8. You'll get a live URL! 🎉

Example: `https://team-collaboration-hub.vercel.app`

---

## 📊 Judging Criteria Alignment

| Criteria | Score | Implementation |
|----------|-------|----------------|
| **Innovation & Creativity** | 20% | Multi-tab interface, Kanban board, real-time updates |
| **Functionality & Execution** | 30% | Full CRUD operations, filtering, status updates |
| **Technical Implementation** | 25% | RESTful API, serverless architecture, clean code |
| **UI/UX Design** | 15% | Modern gradient design, responsive, intuitive tabs |
| **Adherence to Theme** | 10% | Perfect for hackathon team collaboration |

**Total Alignment: 100%** ✅

---

## 🎯 How to Use (Demo Script)

### 1. Register a Team
- Go to "Teams" tab
- Fill in team name, members, and event
- Click "Register Team"

### 2. Create Tasks
- Go to "Tasks" tab
- Fill in task details
- Assign to team members
- Set priority and deadline
- Click "Create Task"

### 3. Manage Task Progress
- Drag tasks between columns (conceptually)
- Click status buttons to move tasks
- Mark tasks as completed

### 4. Post Updates
- Go to "Updates" tab
- Share progress, achievements, or blockers
- Updates appear in live feed

### 5. View Dashboard
- See real-time statistics
- Monitor task progress
- Check recent activity

---

## 📸 Demo Screenshots

**Include these in your presentation:**
1. Dashboard with statistics
2. Team registration page
3. Kanban task board
4. Live updates feed

---

## 🎤 Presentation Points (5 Slides)

### Slide 1: Title
- Project name: Team Collaboration Hub
- Tagline: "Streamlining Hackathon Teamwork"
- Team members

### Slide 2: Problem & Solution
- Problem: Team coordination challenges
- Solution: Centralized collaboration platform
- Target users: Hackathon participants

### Slide 3: Features
- Dashboard overview
- Task management
- Team updates
- Real-time tracking

### Slide 4: Tech Stack & Architecture
- Frontend: HTML/CSS/JS
- Backend: Node.js/Express
- Deployment: Vercel serverless
- API architecture diagram

### Slide 5: Demo & Impact
- Live website URL
- Key metrics
- Future enhancements
- Call to action

---

## 🌟 Key Selling Points

1. **Real-time Collaboration** - No page refreshes needed
2. **Intuitive Interface** - Tab-based navigation
3. **Task Tracking** - Kanban-style board
4. **Progress Visualization** - Interactive charts
5. **Mobile Responsive** - Works on all devices

---

## 🔧 Local Development (Optional)

If you want to test locally:

```bash
# Install dependencies
npm install

# Run locally
node api/index.js

# Open browser
http://localhost:3000
```

---

## 📝 Submission Checklist

- ✅ GitHub repository created
- ✅ All files uploaded correctly
- ✅ Vercel deployment successful
- ✅ Live URL working
- ✅ 5 presentation slides ready
- ✅ Demo script prepared
- ✅ Team details added
- ✅ README.md complete

---

## 👥 Team Information

**Team Name:** [Your Team Name]

**Members:**
1. [Name] - [Role: Frontend/Backend] - [Email]
2. [Name] - [Role: Frontend/Backend] - [Email]
3. [Name] - [Role: Frontend/Backend] - [Email]
4. [Name] - [Role: Frontend/Backend] - [Email]

---

## 🏆 Prize Pool: ₹20,000

**Event Date:** Feb 7th 10:00 AM to Feb 8th 10:00 AM
**Venue:** UHL, IIT Bhubaneswar

---

## 📞 Contact

For queries: events.pravaah@iitbbs.ac.in

---

## 📄 License

MIT License - Free to use for educational purposes

---

**Built with ❤️ for Pravaah'26 | IIT Bhubaneswar**

Good luck with your hackathon! 🚀🎉
