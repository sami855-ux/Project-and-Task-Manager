import React, { useState, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarGrid } from './CalendarGrid';
import { CalendarFilters } from './CalendarFilters';
import { TaskDetailsPanel } from './TaskDetailsPanel';
import { AICalendarInsights } from './AICalendarInsights';
import { CalendarStats } from './CalendarStats';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { 
  Plus, 
  Download, 
  Share, 
  Search,
  Calendar as CalendarIcon,
  List,
  Grid,
  Filter,
  Zap,
  Target,
  Sparkles,
  Brain,
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  Flag
} from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState('month');
  const [filters, setFilters] = useState({
    projects: ['LMS', 'Itgram', 'Negari', 'Tax System'],
    priorities: ['high', 'medium', 'low'],
    status: ['active', 'completed'],
    showMilestones: true,
    showTasks: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced mock data with realistic dates and colors
  const { tasks, projects, milestones, aiInsights, calendarStats } = useMemo(() => ({
    tasks: [
      {
        id: 1,
        title: 'Finish LMS Module Update',
        project: 'LMS',
        priority: 'high',
        dueDate: new Date(2024, 11, 15),
        startDate: new Date(2024, 11, 10),
        status: 'active',
        progress: 75,
        estimatedTime: '4 hours',
        description: 'Complete the user authentication module with OAuth integration',
        assignee: 'You',
        tags: ['Development', 'Urgent', 'Backend'],
        color: 'red',
        completed: false
      },
      {
        id: 2,
        title: 'Design New Template System',
        project: 'Itgram',
        priority: 'medium',
        dueDate: new Date(2024, 11, 18),
        startDate: new Date(2024, 11, 12),
        status: 'active',
        progress: 30,
        estimatedTime: '6 hours',
        description: 'Create responsive design templates for mobile and desktop',
        assignee: 'You',
        tags: ['Design', 'UI/UX', 'Frontend'],
        color: 'purple',
        completed: false
      },
      {
        id: 3,
        title: 'Setup Supabase Backend',
        project: 'Tax System',
        priority: 'high',
        dueDate: new Date(2024, 11, 12),
        startDate: new Date(2024, 11, 8),
        status: 'active',
        progress: 90,
        estimatedTime: '3 hours',
        description: 'Configure database schema and authentication',
        assignee: 'You',
        tags: ['Backend', 'Database', 'API'],
        color: 'blue',
        completed: false
      },
      {
        id: 4,
        title: 'Add AI Features',
        project: 'Negari',
        priority: 'medium',
        dueDate: new Date(2024, 11, 22),
        startDate: new Date(2024, 11, 18),
        status: 'active',
        progress: 20,
        estimatedTime: '8 hours',
        description: 'Implement machine learning recommendations',
        assignee: 'You',
        tags: ['AI', 'ML', 'Innovation'],
        color: 'green',
        completed: false
      },
      {
        id: 5,
        title: 'Client Presentation',
        project: 'LMS',
        priority: 'high',
        dueDate: new Date(2024, 11, 20),
        startDate: new Date(2024, 11, 20),
        status: 'active',
        progress: 0,
        estimatedTime: '2 hours',
        description: 'Prepare and deliver client demo',
        assignee: 'You',
        tags: ['Meeting', 'Presentation'],
        color: 'orange',
        completed: false
      }
    ],
    projects: [
      { id: 1, name: 'LMS', color: 'blue', taskCount: 12 },
      { id: 2, name: 'Itgram', color: 'purple', taskCount: 8 },
      { id: 3, name: 'Negari', color: 'green', taskCount: 6 },
      { id: 4, name: 'Tax System', color: 'orange', taskCount: 4 },
    ],
    milestones: [
      {
        id: 1,
        title: 'MVP Launch',
        project: 'LMS',
        date: new Date(2024, 11, 20),
        type: 'release',
        status: 'upcoming',
        color: 'blue'
      },
      {
        id: 2,
        title: 'Design System Complete',
        project: 'Itgram',
        date: new Date(2024, 11, 25),
        type: 'completion',
        status: 'upcoming',
        color: 'purple'
      },
      {
        id: 3,
        title: 'AI Integration Live',
        project: 'Negari',
        date: new Date(2024, 11, 30),
        type: 'integration',
        status: 'upcoming',
        color: 'green'
      }
    ],
    aiInsights: [
      {
        type: 'alert',
        title: '3 high-priority tasks due this week',
        description: 'Focus on LMS Module and Supabase setup first',
        priority: 'high',
        icon: Zap,
        color: 'red'
      },
      {
        type: 'optimization',
        title: 'Schedule buffer time between tasks',
        description: 'AI recommends 2-hour buffers for better focus',
        priority: 'medium',
        icon: Clock,
        color: 'blue'
      },
      {
        type: 'prediction',
        title: 'You\'re ahead of schedule!',
        description: 'Current pace suggests 3-day early completion',
        priority: 'low',
        icon: Target,
        color: 'green'
      }
    ],
    calendarStats: {
      totalTasks: 24,
      completed: 8,
      overdue: 2,
      dueThisWeek: 5,
      completionRate: 72
    }
  }), []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesProject = filters.projects.length === 0 || filters.projects.includes(task.project);
      const matchesPriority = filters.priorities.length === 0 || filters.priorities.includes(task.priority);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesProject && matchesPriority && matchesStatus && matchesSearch;
    });
  }, [tasks, filters, searchQuery]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getTasksForDate = (date) => {
    return filteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const upcomingTasks = filteredTasks
    .filter(task => task.dueDate >= new Date())
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          
          <div className="flex items-center space-x-3 font-geist">
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-gray-300 hover:border-gray-400">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-geist">
          {/* Left Sidebar - Enhanced */}
          <div className="xl:col-span-1 space-y-6">
            

            {/* Search */}
            <Card className="border  bg-white/80 rounded-md shadow-none border-gray-200">
              <CardContent className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks, projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/50 border-gray-200 focus:border-blue-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Calendar Filters */}
            <CalendarFilters
              filters={filters}
              onFiltersChange={setFilters}
              projects={projects}
            />

            {/* AI Insights */}
            <AICalendarInsights insights={aiInsights} />

            {/* Upcoming Tasks */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm font-semibold text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50/50 cursor-pointer transition-colors"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.dueDate.toLocaleDateString()}</p>
                    </div>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Calendar Controls */}
            <Card className="border border-gray-200 rounded-md shadow-none  bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center space-x-4">
                  <CardTitle className="flex font-mozilla items-center text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                    <Brain className="w-6 h-6 mr-2 text-purple-500" />
                    Smart Calendar
                  </CardTitle>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-50 text-green-700">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={view === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('month')}
                    className="flex items-center space-x-2"
                  >
                    <Grid className="w-4 h-4" />
                    <span>Month</span>
                  </Button>
                  <Button
                    variant={view === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('week')}
                    className="flex items-center space-x-2"
                  >
                    <List className="w-4 h-4" />
                    <span>Week</span>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* <CalendarGrid
                  view={view}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  tasks={filteredTasks}
                  milestones={milestones}
                  onTaskClick={handleTaskClick}
                /> */}
              </CardContent>
            </Card>

            {/* Selected Date Focus */}
            <Card className="border border-gray-200 rounded-md shadow-none bg-gradient-to-br from-white to-purple-50/30">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Flag className="w-5 h-5 mr-2 text-purple-500" />
                  Focus for {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getTasksForDate(selectedDate).map(task => (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg border border-gray-200/60 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-500">{task.project}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{task.assignee}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {getTasksForDate(selectedDate).length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No tasks scheduled for this date</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Task Details Panel */}
        {selectedTask && (
          <TaskDetailsPanel
            task={selectedTask}
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;