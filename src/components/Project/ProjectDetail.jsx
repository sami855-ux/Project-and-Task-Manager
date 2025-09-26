import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Edit, 
  Trash2, 
  Star, 
  CheckCircle, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  List, 
  LayoutGrid,
  CalendarDays,
  MoreVertical,
  Clock,
  Flag,
  Archive,
  Eye,
  Download,
  Bell,
  Activity
} from 'lucide-react';

// Mock data for the project
const mockProject = {
  id: 1,
  title: "Website Redesign",
  description: "Complete overhaul of company website with modern design and improved UX",
  progress: 65,
  deadline: "2024-02-15",
  status: "active",
  pinned: true,
  tags: ["Design", "Development", "UX"],
  color: "blue",
  createdAt: "2024-01-01",
  stats: {
    total: 12,
    completed: 8,
    pending: 4
  }
};

// Mock tasks data
const initialTasks = [
  {
    id: 1,
    title: "Create wireframes",
    description: "Design initial wireframes for all main pages",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-20",
    createdAt: "2024-01-01",
    todos: [
      { id: 1, text: "Homepage wireframe", completed: true },
      { id: 2, text: "Product page wireframe", completed: true },
      { id: 3, text: "Contact page wireframe", completed: true }
    ]
  },
  {
    id: 2,
    title: "Design mockups",
    description: "Create high-fidelity mockups based on approved wireframes",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-30",
    createdAt: "2024-01-05",
    todos: [
      { id: 1, text: "Design system setup", completed: true },
      { id: 2, text: "Homepage mockup", completed: false },
      { id: 3, text: "Mobile responsive designs", completed: false }
    ]
  },
  {
    id: 3,
    title: "Frontend development",
    description: "Implement designs using React and Tailwind CSS",
    status: "todo",
    priority: "medium",
    dueDate: "2024-02-10",
    createdAt: "2024-01-10",
    todos: [
      { id: 1, text: "Setup project structure", completed: false },
      { id: 2, text: "Implement components", completed: false }
    ]
  },
  {
    id: 4,
    title: "Content migration",
    description: "Migrate existing content to new website structure",
    status: "todo",
    priority: "low",
    dueDate: "2024-02-12",
    createdAt: "2024-01-12",
    todos: []
  }
];

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

const statusColors = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200"
};

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(mockProject);
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('list');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCompact, setIsCompact] = useState(false);

  // Task management functions
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: "New Task",
      description: "Task description",
      status: "todo",
      priority: "medium",
      dueDate: "2024-02-28",
      createdAt: new Date().toISOString().split('T')[0],
      todos: []
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Todo management functions
  const addTodo = (taskId, text) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            todos: [...task.todos, { id: Date.now(), text, completed: false }]
          }
        : task
    ));
  };

  const updateTodo = (taskId, todoId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            todos: task.todos.map(todo =>
              todo.id === todoId ? { ...todo, ...updates } : todo
            )
          }
        : task
    ));
  };

  const deleteTodo = (taskId, todoId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            todos: task.todos.filter(todo => todo.id !== todoId)
          }
        : task
    ));
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const isOverdue = (date) => new Date(date) < new Date();

  // Task components
  const TaskItem = ({ task }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newTodoText, setNewTodoText] = useState('');

    const todoProgress = task.todos.length > 0 
      ? Math.round((task.todos.filter(t => t.completed).length / task.todos.length) * 100)
      : 0;

    return (
      <motion.div
        layout
       
        className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Checkbox
                checked={task.status === 'completed'}
                onCheckedChange={(checked) => 
                  updateTask(task.id, { status: checked ? 'completed' : 'todo' })
                }
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <Badge className={priorityColors[task.priority]}>
                    {task.priority}
                  </Badge>
                  <Badge className={statusColors[task.status]}>
                    {task.status}
                  </Badge>
                  {isOverdue(task.dueDate) && task.status !== 'completed' && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  {task.todos.length > 0 && (
                    <span>Todos: {todoProgress}% complete</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 ml-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show todos</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateTask(task.id, { 
                      title: prompt('Edit title:', task.title) || task.title 
                    })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete task</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Todos Section */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pl-8"
            >
              {task.todos.length > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Todos progress</span>
                    <span>{todoProgress}%</span>
                  </div>
                  <Progress value={todoProgress} className="h-1" />
                </div>
              )}
              
              <Reorder.Group values={task.todos} onReorder={(newTodos) => {
                updateTask(task.id, { todos: newTodos });
              }} className="space-y-2 mb-3">
                {task.todos.map((todo) => (
                  <Reorder.Item key={todo.id} value={todo} as="div">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                    >
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={(checked) => 
                          updateTodo(task.id, todo.id, { completed: checked })
                        }
                      />
                      <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(task.id, todo.id)}
                        className="h-6 w-6 p-0 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a todo..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newTodoText.trim()) {
                      addTodo(task.id, newTodoText.trim());
                      setNewTodoText('');
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (newTodoText.trim()) {
                      addTodo(task.id, newTodoText.trim());
                      setNewTodoText('');
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const KanbanView = () => {
    const columns = {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
      completed: filteredTasks.filter(task => task.status === 'completed')
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(columns).map(([status, columnTasks]) => (
          <div key={status} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold capitalize">{status}</h3>
              <Badge>{columnTasks.length}</Badge>
            </div>
            
            <Reorder.Group values={columnTasks} onReorder={(newTasks) => {
              // Update tasks with new order
              const updatedTasks = tasks.map(task => {
                const newTask = newTasks.find(t => t.id === task.id);
                return newTask ? { ...task, ...newTask } : task;
              });
              setTasks(updatedTasks);
            }} className="space-y-3">
              {columnTasks.map(task => (
                <Reorder.Item key={task.id} value={task}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-3 rounded border shadow-sm"
                  >
                    <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ))}
      </div>
    );
  };

  const CalendarView = () => {
    // Simple calendar view implementation
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-sm py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 31 }, (_, i) => {
            const date = new Date(2024, 0, i + 1);
            const dayTasks = filteredTasks.filter(task => 
              new Date(task.dueDate).toDateString() === date.toDateString()
            );
            
            return (
              <div key={i} className="min-h-20 border rounded p-1">
                <div className="text-xs font-medium">{i + 1}</div>
                {dayTasks.map(task => (
                  <div key={task.id} className="text-xs p-1 bg-blue-100 rounded mb-1 truncate">
                    {task.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-geist">
      <TooltipProvider>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Project Header */}
          <Card className="mb-6 border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {isEditingTitle ? (
                      <Input
                        value={project.title}
                        onChange={(e) => setProject({...project, title: e.target.value})}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyPress={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                        className="text-2xl font-bold"
                        autoFocus
                      />
                    ) : (
                      <h1 
                        className="text-2xl font-bold cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                        onClick={() => setIsEditingTitle(true)}
                      >
                        {project.title}
                      </h1>
                    )}
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setProject({...project, pinned: !project.pinned})}
                        >
                          {project.pinned ? (
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <Star className="h-5 w-5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {project.pinned ? 'Unpin project' : 'Pin project'}
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {isEditingDescription ? (
                    <Textarea
                      value={project.description}
                      onChange={(e) => setProject({...project, description: e.target.value})}
                      onBlur={() => setIsEditingDescription(false)}
                      className="mb-3"
                      autoFocus
                    />
                  ) : (
                    <p 
                      className="text-gray-600 mb-3 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 font-jakarta"
                      onClick={() => setIsEditingDescription(true)}
                    >
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className={"rounded-sm border-gray-200"}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"font-geist"}>Edit project details</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setProject({...project, status: 'completed'})}
                        className={"border border-gray-200"}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"font-geist"}>Mark project as completed</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 rounded-sm border border-red-200">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"font-geist"}>Delete project</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Progress and Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={"font-mozilla"}>Project Progress</span>
                    <span className={"font-mozilla"}>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span className={"font-geist"}>Started: {new Date(project.createdAt).toLocaleDateString()}</span>
                    <span className={isOverdue(project.deadline) ? 'text-red-600 font-medium font-jakarta' : 'text-green-600 font-jakarta'}>
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{project.stats.total}</div>
                    <div className="text-sm text-gray-600">Total Tasks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{project.stats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{project.stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <CardTitle>Tasks</CardTitle>
                
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search tasks..."
                      className="pl-10 w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <Flag className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-r-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('kanban')}
                      className="rounded-none"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('calendar')}
                      className="rounded-l-none"
                    >
                      <CalendarDays className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button onClick={addTask}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {viewMode === 'list' && (
                <Reorder.Group values={filteredTasks} onReorder={setTasks} className="space-y-3">
                  <AnimatePresence>
                    {filteredTasks.map(task => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              )}
              
              {viewMode === 'kanban' && <KanbanView />}
              {viewMode === 'calendar' && <CalendarView />}
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks found. Create your first task to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Optional Advanced Features Section */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "created", target: "task", name: "Frontend development", time: "2 hours ago" },
                    { action: "completed", target: "todo", name: "Design system setup", time: "4 hours ago" },
                    { action: "updated", target: "task", name: "Design mockups", time: "1 day ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">You</span> {activity.action} {activity.target} "{activity.name}"
                      </span>
                      <span className="text-gray-400 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex-col h-auto py-3">
                    <Download className="h-5 w-5 mb-1" />
                    <span className="text-xs">Export JSON</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-3">
                    <Bell className="h-5 w-5 mb-1" />
                    <span className="text-xs">Set Reminder</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-3">
                    <Archive className="h-5 w-5 mb-1" />
                    <span className="text-xs">Archive Completed</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-3">
                    <Plus className="h-5 w-5 mb-1" />
                    <span className="text-xs">Template</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ProjectDetailsPage;