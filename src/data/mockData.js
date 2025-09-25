// src/data/mock/mockData.js
export const mockData = {
  overview: {
    totalProjects: 12,
    activeTasks: 24,
    nextMilestone: 'in 3 days',
    completionRate: 72,
    upcomingEvents: [
      { title: 'Team Sync Meeting', date: 'Today', time: '2:00 PM' },
      { title: 'Project Deadline', date: 'Tomorrow', time: '5:00 PM' },
      { title: 'Client Presentation', date: 'Dec 15', time: '10:00 AM' }
    ]
  },
  recentProjects: [
    {
    id: 1,
    name: 'Itgram – Social Media Platform',
    description: 'A full-featured social media platform with stories, chat, job opportunities, and Amharic translation support.',
    status: 'active',
    progress: 65,
    nextTask: 'Implement chat feature with real-time notifications',
    dueDate: 'Dec 20, 2023'
  },
  {
    id: 2,
    name: 'Negari – Community Issue Reporter',
    description: 'AI-powered platform for reporting local issues, integrating maps, priority checks, and spam detection.',
    status: 'active',
    progress: 42,
    nextTask: 'Mobile optimization and offline support',
    dueDate: 'Jan 5, 2024'
  },
  {
    id: 3,
    name: 'LMS – Learning Management System',
    description: 'An interactive learning management system with courses, modules, quizzes, and progress tracking for students.',
    status: 'active',
    progress: 88,
    nextTask: 'Final testing and deployment preparation',
    dueDate: 'Dec 12, 2023'
  },
  {
    id: 4,
    name: 'Tax Payment System – Online Filing',
    description: 'A secure online platform for tax calculation, reporting, and payments with dashboards for officials and taxpayers.',
    status: 'planning',
    progress: 15,
    nextTask: 'Database design and schema setup',
    dueDate: 'Feb 1, 2024'
  }
  ],
  tasks: [
    {
      id: 1,
      title: 'Finish LMS Module Update',
      project: 'LMS',
      priority: 'high',
      dueDate: 'Today'
    },
    {
      id: 2,
      title: 'Add AI to Negari',
      project: 'Negari',
      priority: 'medium',
      dueDate: 'Dec 18'
    },
    {
      id: 3,
      title: 'Design new template',
      project: 'Itgram',
      priority: 'low',
      dueDate: 'Dec 22'
    },
    {
      id: 4,
      title: 'Setup Supabase backend',
      project: 'Tax System',
      priority: 'high',
      dueDate: 'Dec 14'
    }
  ],
  activityFeed: [
    {
      type: 'completed',
      message: 'You completed "Setup Supabase"',
      time: '2 hours ago'
    },
    {
      type: 'created',
      message: 'New project "Portfolio Manager" created',
      time: '4 hours ago'
    },
    {
      type: 'milestone',
      message: 'Milestone reached "MVP Complete"',
      time: '1 day ago'
    },
    {
      type: 'completed',
      message: 'You completed "User authentication"',
      time: '2 days ago'
    }
  ],
  aiInsights: [
    {
      title: '3 overdue tasks detected',
      description: 'Consider rescheduling or delegating'
    },
    {
      title: 'Suggesting 2 new checkpoints',
      description: 'Based on your progress patterns'
    },
    {
      title: 'Team workload optimal',
      description: 'Current distribution is efficient'
    }
  ]
};