
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { 
  Folder, 
  Calendar, 
  ArrowUpRight, 
  Users,
  Clock,
  MoreHorizontal,
  Edit,
  Archive,
  Trash2,
  Share,
  Settings,
  Eye
} from 'lucide-react';

const RecentProjects = ({ projects, isLoading = false, viewAllLink = "#" }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      case 'planning': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
      case 'on-hold': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
      case 'completed': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  const getPriorityColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Handle menu actions
  const handleMenuAction = (action, projectId) => {
    console.log(`Action: ${action} for project: ${projectId}`);
    
    switch (action) {
      case 'edit':
        // Handle edit project
        break;
      case 'view':
        // Handle view project
        break;
      case 'share':
        // Handle share project
        break;
      case 'settings':
        // Handle project settings
        break;
      case 'archive':
        // Handle archive project
        break;
      case 'delete':
        // Handle delete project
        if (confirm('Are you sure you want to delete this project?')) {
          // Delete logic here
        }
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <Skeleton className="h-6 w-40 bg-gray-200 rounded" />
          <Skeleton className="h-8 w-20 bg-gray-200 rounded-md" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border border-gray-200/60 rounded-xl p-4 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-32 bg-gray-200 rounded" />
                  <Skeleton className="h-5 w-16 bg-gray-200 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full bg-gray-200 rounded mb-3" />
                <Skeleton className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                    <Skeleton className="h-3 w-8 bg-gray-200 rounded" />
                  </div>
                  <Skeleton className="h-2 w-full bg-gray-200 rounded" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                    <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-gray-100 to-gray-100 hover:shadow-md transition-all duration-300 p-1 rounded-md">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pt-2">
        <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-geist">
          
          Recent Projects
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg transition-colors"
          onClick={() => window.location.href = viewAllLink}
        >
          <span className='font-geist cursor-pointer'>View All</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const status = getStatusVariant(project.status);
            const priorityColor = getPriorityColor(project.progress);
            
            return (
              <div 
                key={project.id}
                className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/60 p-5 hover:shadow-md rounded-md hover:border-gray-300/60 transition-all duration-300  cursor-pointer"
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Project header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${priorityColor} shadow-sm`} />
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-950 transition-colors font-geist">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={`${status.bg} ${status.text} ${status.border} border font-medium px-2 py-1 text-xs font-jakarta capitalize`}
                      >
                        {project.status}
                      </Badge>
                      
                      {/* Three-dot dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="primary" 
                            size="icon" 
                            className={`w-8 h-8 hover:bg-gray-300 hover:text-white transition-all duration-200 ${
                              // Always show on mobile, only show on hover for desktop
                              'opacity-100 md:opacity-0 md:group-hover:opacity-100'
                            } hover:bg-gray-100/80`}
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 backdrop-blur-sm bg-white/95 border border-gray-200/60">
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm "
                            onClick={() => handleMenuAction('view', project.id)}
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span className="font-jakarta">View Project</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm hover:bg-gray-300 hover:text-gray-900"
                            onClick={() => handleMenuAction('edit', project.id)}
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                            <span className="font-jakarta">Edit Project</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm"
                            onClick={() => handleMenuAction('share', project.id)}
                          >
                            <Share className="w-4 h-4 text-green-600" />
                            <span className="font-jakarta">Share Project</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm"
                            onClick={() => handleMenuAction('settings', project.id)}
                          >
                            <Settings className="w-4 h-4 text-purple-600" />
                            <span className="font-jakarta">Project Settings</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm"
                            onClick={() => handleMenuAction('archive', project.id)}
                          >
                            <Archive className="w-4 h-4 text-yellow-600" />
                            <span className="font-jakarta">Archive Project</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center space-x-2 cursor-pointer text-sm text-red-600 focus:text-red-600"
                            onClick={() => handleMenuAction('delete', project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="font-jakarta">Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="text-gray-600 font-geist text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {project.description}
                  </p>

                  {/* Progress section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium font-mozilla">Project Progress</span>
                      <span className="font-bold text-gray-700 font-jakarta">{project.progress}%</span>
                    </div>
                    
                    <div className="relative">
                      <Progress 
                        value={project.progress} 
                        className="h-2 bg-gray-200/60 rounded-full overflow-hidden"
                      >
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${priorityColor} relative overflow-hidden`}
                          style={{ width: `${project.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                        </div>
                      </Progress>
                    </div>

                    {/* Project meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span className='font-geist text-sm'>Next: {project.nextTask}</span>
                        </div>
                        
                      </div>
                      <div className="flex items-center space-x-1 font-semibold text-blue-600">
                        <Calendar className="w-3 h-3" />
                        <span className='font-jakarta'>{project.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No projects yet</h3>
            <p className="text-gray-400 text-sm">Get started by creating your first project</p>
            <Button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Create Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProjects;