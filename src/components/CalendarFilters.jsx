
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { 
  Filter, 
  X, 
  RefreshCw,
  Eye,
  EyeOff,
  Zap,
  Target,
  Flag
} from 'lucide-react';

export const CalendarFilters = ({ filters, onFiltersChange, projects }) => {
  const toggleProject = (projectName) => {
    const newProjects = filters.projects.includes(projectName)
      ? filters.projects.filter(p => p !== projectName)
      : [...filters.projects, projectName];
    
    onFiltersChange({ ...filters, projects: newProjects });
  };

  const togglePriority = (priority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    
    onFiltersChange({ ...filters, priorities: newPriorities });
  };

  const toggleStatus = (status) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({ ...filters, status: newStatus });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      projects: projects.map(p => p.name),
      priorities: ['high', 'medium', 'low'],
      status: ['active', 'completed'],
      showMilestones: true,
      showTasks: true,
    });
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Zap className="w-3 h-3" />;
      case 'medium': return <Target className="w-3 h-3" />;
      case 'low': return <Flag className="w-3 h-3" />;
      default: return <Flag className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-500 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-500 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-500 border-green-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-sm font-semibold text-gray-700 font-jakarta">
            <Filter className="w-4 h-4 mr-2 text-blue-500" />
            Filters & Views
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="h-7 text-xs text-gray-500 hover:text-gray-700 font-jakarta"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Projects Filter */}
        <div>
          <Label className="text-xs font-medium text-gray-600 mb-2 block">Projects</Label>
          <div className="space-y-2">
            {projects.map(project => (
              <div key={project.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`project-${project.id}`}
                  checked={filters.projects.includes(project.name)}
                  onCheckedChange={() => toggleProject(project.name)}
                  className="data-[state=checked]:bg-blue-500 border border-gray-200"
                />
                <Label 
                  htmlFor={`project-${project.id}`}
                  className="text-sm font-normal cursor-pointer flex items-center space-x-2 flex-1"
                >
                  <div 
                    className={`w-3 h-3 rounded-full bg-${project.color}-500 font-geist`}
                  ></div>
                  <span>{project.name}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {project.taskCount}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <Label className="text-xs font-medium text-gray-600 mb-2 block">Priority</Label>
          <div className="flex space-x-2">
            {['high', 'medium', 'low'].map(priority => (
              <Button
                key={priority}
                variant={filters.priorities.includes(priority) ? "default" : "outline"}
                size="sm"
                className={`text-xs capitalize ${
                  filters.priorities.includes(priority) 
                    ? getPriorityColor(priority).replace('text-', 'bg-').replace('bg-gray-600', 'bg-gray-100')
                    : 'border-gray-200 text-gray-600'
                }`}
                onClick={() => togglePriority(priority)}
              >
                {getPriorityIcon(priority)}
                <span className="ml-1 font-jakarta">{priority}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label className="text-xs font-medium text-gray-600 mb-2 block">Status</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'active', label: 'Active', icon: Eye },
              { id: 'completed', label: 'Completed', icon: EyeOff },
            ].map(status => {
              const Icon = status.icon;
              return (
                <Button
                  key={status.id}
                  variant={filters.status.includes(status.id) ? "default" : "outline"}
                  size="sm"
                  className={`text-xs justify-start h-9 ${
                    filters.status.includes(status.id) 
                      ? 'bg-blue-100 text-blue-700 border-blue-200' 
                      : 'border-gray-200 text-gray-600'
                  }`}
                  onClick={() => toggleStatus(status.id)}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {status.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-tasks" className="text-sm text-gray-700 cursor-pointer">
              Show Tasks
            </Label>
            <Switch
              id="show-tasks"
              checked={filters.showTasks}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, showTasks: checked })
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-milestones" className="text-sm text-gray-700 cursor-pointer">
              Show Milestones
            </Label>
            <Switch
              id="show-milestones"
              checked={filters.showMilestones}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, showMilestones: checked })
              }
            />
          </div>
        </div>

        {/* Active Filters Badge */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Active filters:</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {filters.projects.length + filters.priorities.length + filters.status.length}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};