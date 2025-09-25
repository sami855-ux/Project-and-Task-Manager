
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import { Switch } from '../components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { 
  CheckCircle, 
  Clock, 
  Flag, 
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  User,
  Zap,
  Target,
  Filter,
  Plus,
  ArrowUpDown,
  CheckSquare,
  Square
} from 'lucide-react';

const MyTasks = ({ tasks, isLoading = false, onTaskUpdate }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [completedTasks, setCompletedTasks] = useState([]);

  const filters = [
    { id: 'all', label: 'All Tasks', count: tasks.length },
    { id: 'high', label: 'High Priority', count: tasks.filter(t => t.priority === 'high').length },
    { id: 'today', label: 'Due Today', count: tasks.filter(t => t.dueDate === 'Today').length },
    { id: 'active', label: 'Active', count: tasks.filter(t => !completedTasks.includes(t.id)).length }
  ];

  const sortOptions = [
    { id: 'priority', label: 'Priority' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'project', label: 'Project' },
    { id: 'title', label: 'Title' }
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Zap className="w-3 h-3 text-red-500" />;
      case 'medium': return <Target className="w-3 h-3 text-yellow-500" />;
      case 'low': return <Flag className="w-3 h-3 text-green-500" />;
      default: return <Flag className="w-3 h-3 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDueDateColor = (dueDate) => {
    if (dueDate === 'Today') return 'text-red-600 font-semibold';
    if (dueDate === 'Tomorrow') return 'text-orange-600';
    return 'text-gray-600';
  };

  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filter === 'all') return true;
      if (filter === 'high') return task.priority === 'high';
      if (filter === 'today') return task.dueDate === 'Today';
      if (filter === 'active') return !completedTasks.includes(task.id);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'project') {
        return a.project.localeCompare(b.project);
      }
      return a.title.localeCompare(b.title);
    });

  const completionRate = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 mt-4">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-gray-200 rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 bg-gray-200 rounded" />
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-16 bg-gray-200 rounded-full" />
                  <Skeleton className="h-4 w-12 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-gray-100 to-gray-100 rounded-md  transition-all duration-300 mt-9">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center font-geist text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            My Tasks
            <Badge variant="secondary" className="ml-3 bg-green-100 text-green-700 font-jakarta">
              {completedTasks.length}/{tasks.length}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                  <Filter className="w-4 h-4" />
                  <span className='font-jakarta'>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-gray-200">
                {filters.map((filterOption) => (
                  <DropdownMenuItem 
                    key={filterOption.id}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setFilter(filterOption.id)}
                  >
                    <span className='font-jakarta'>{filterOption.label}</span>
                    <Badge variant="secondary" className="ml-2 font-mozilla">
                      {filterOption.count}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                  <ArrowUpDown className="w-4 h-4" />
                  <span className='font-jakarta'>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={"border-gray-200"}>
                {sortOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.id}
                    className="cursor-pointer font-jakarta"
                    onClick={() => setSortBy(option.id)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            
          </div>
        </div>

      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {filteredAndSortedTasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            
            return (
              <div 
                key={task.id}
                className={`
                  group relative p-4 rounded-md border transition-all duration-300 cursor-pointer
                  ${isCompleted 
                    ? 'bg-green-50/50 border-green-200/50 opacity-60' 
                    : 'bg-white border-gray-200/60 hover:border-gray-300/60 '
                  }
                
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                   
                    
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(task.priority)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`
                        font-semibold text-gray-900 truncate font-jakarta pb-2
                        ${isCompleted ? 'line-through text-gray-500' : ''}
                      `}>
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-mozilla">
                          {task.project}
                        </span>
                        
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-4 font-jakarta">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    
                    <span className={`
                      text-sm font-medium whitespace-nowrap
                      ${getDueDateColor(task.dueDate)}
                    `}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {task.dueDate}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={"border-gray-300 font-jakarta"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Calendar className="w-4 h-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this task?')) {
                              // Handle delete
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Task metadata */}
                {task.estimatedTime && (
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                    <span>⏱️ {task.estimatedTime}</span>
                    {task.tags && task.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredAndSortedTasks.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              {filter === 'active' ? 'All tasks completed! 🎉' : 'No tasks found'}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {filter === 'active' 
                ? 'You\'ve completed all your tasks. Time to celebrate!'
                : 'Try changing your filters or create a new task.'
              }
            </p>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyTasks;