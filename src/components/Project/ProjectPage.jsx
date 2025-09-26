import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  Search, 
  Grid, 
  List, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  StarOff, 
  FolderOpen, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Filter,
  SortAsc,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock project data
const initialProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    progress: 75,
    tasksDone: 9,
    tasksTotal: 12,
    deadline: "2024-02-15",
    status: "active",
    pinned: true,
    createdAt: "2024-01-01",
    color: "blue",
    tags: ["Work", "Design"]
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Build cross-platform mobile application for iOS and Android",
    progress: 30,
    tasksDone: 3,
    tasksTotal: 10,
    deadline: "2024-03-20",
    status: "active",
    pinned: false,
    createdAt: "2024-01-15",
    color: "green",
    tags: ["Work", "Development"]
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description: "Q1 marketing campaign planning and execution",
    progress: 100,
    tasksDone: 15,
    tasksTotal: 15,
    deadline: "2024-01-10",
    status: "completed",
    pinned: false,
    createdAt: "2023-12-01",
    color: "purple",
    tags: ["Marketing"]
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "Create personal website to showcase projects and skills",
    progress: 45,
    tasksDone: 5,
    tasksTotal: 11,
    deadline: "2024-01-25",
    status: "overdue",
    pinned: true,
    createdAt: "2023-12-20",
    color: "orange",
    tags: ["Personal", "Development"]
  },
  {
    id: 5,
    title: "Research Paper",
    description: "Academic research on AI applications in healthcare",
    progress: 20,
    tasksDone: 2,
    tasksTotal: 10,
    deadline: "2024-04-05",
    status: "active",
    pinned: false,
    createdAt: "2024-01-10",
    color: "red",
    tags: ["Academic", "Research"]
  }
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  red: "bg-red-100 text-red-800 border-red-200"
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("deadline");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    deadline: "",
    color: "blue",
    tags: []
  });

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      
      if (statusFilter === "pinned") {
        return matchesSearch && project.pinned;
      }
      
      return matchesSearch && matchesStatus;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        case "progress":
          return b.progress - a.progress;
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "pinned":
          return (b.pinned === a.pinned) ? 0 : b.pinned ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, sortBy, statusFilter]);

  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      progress: 0,
      tasksDone: 0,
      tasksTotal: 0,
      status: "active",
      pinned: false,
      createdAt: new Date().toISOString().split('T')[0],
      tags: newProject.tags
    };
    
    setProjects([...projects, project]);
    setNewProject({ title: "", description: "", deadline: "", color: "blue", tags: [] });
    setIsAddDialogOpen(false);
  };

  const handleEditProject = () => {
    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const togglePin = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, pinned: !p.pinned } : p));
  };

  const markAsCompleted = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: "completed", progress: 100 } : p));
  };

  const getStatusIcon = (project) => {
    if (project.status === "completed") return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (project.status === "overdue") return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Calendar className="h-4 w-4 text-blue-500" />;
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
  };

 const ProjectCard = ({ project }) => {
  const randomImage = `https://picsum.photos/800/400?seed=${project.id}`;

  return (
    <Card className={`hover:shadow-lg transition-shadow border-gray-200 duration-200 pt-0 ${project.pinned ? "border-2 border-blue-200" : ""}`}>
      
      {/* Image with hover overlay */}
      <div className="relative group">
        <img
          src={randomImage}
          alt={project.title}
          className="w-full h-44 object-cover rounded-t-md"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-white text-center text-sm">
          <div>
            <p className="font-semibold font-geist">{project.title}</p>
            <p className="mt-1 font-geist">{project.description}</p>
            <p className="mt-1">
              Due:{" "}
              <span className={isOverdue(project.deadline) ? "text-red-400 font-bold font-geist" : "text-green-300 font-geist"}>
                {new Date(project.deadline).toLocaleDateString()}
              </span>
            </p>
            <p className="mt-1 font-geist">Tag: {project.tags[0]}</p>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 font-geist">
              {project.title}
              {project.pinned && (
                <Tooltip>
                  <TooltipTrigger>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </TooltipTrigger>
                  <TooltipContent>Project is pinned</TooltipContent>
                </Tooltip>
              )}
            </CardTitle>
            <CardDescription className="mt-1 font-jakarta">{project.description}</CardDescription>
          </div>
          <Badge className={`${colorClasses[project.color]} font-jakarta`} >{project.tags[0]}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className='font-mozilla'>Progress</span>
              <span className='font-mozilla'>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 font-geist" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1 font-mozilla">
              {getStatusIcon(project)}
              <span className={isOverdue(project.deadline) ? "text-red-600 font-medium" : ""}>
                Due: {new Date(project.deadline).toLocaleDateString()}
              </span>
            </span>
            <span className='font-mozilla'>
              {project.tasksTotal} Tasks ({project.tasksDone} Done, {project.tasksTotal - project.tasksDone} Pending)
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-3 border-t border-gray-300">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm" onClick={() => setEditingProject(project)} className={"border-gray-200 font-geist"}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </TooltipTrigger>
          <TooltipContent className={"font-geist"}>Edit project details</TooltipContent>
        </Tooltip>

        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" onClick={() => togglePin(project.id)}>
                {project.pinned ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent className={"font-geist"}>{project.pinned ? "Unpin project" : "Pin project"}</TooltipContent>
          </Tooltip>

        <Link to="/project/deatil/1">

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <FolderOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={"font-geist"}>View project folder/details</TooltipContent>
          </Tooltip>
        </Link>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" onClick={() => markAsCompleted(project.id)} disabled={project.status === "completed"}>
                <CheckCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={"font-geist"}>Mark project as completed</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={"font-geist"}>Delete project</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
};


  const ProjectListItem = ({ project }) => (
  <Card className="mb-4 hover:shadow-md transition-shadow duration-200 border-l-4 border-gray-200 rounded-none" 
        style={{ borderLeftColor: `var(--color-${project.color}-300)` }}>
    <CardContent className="p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Section - Project Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => togglePin(project.id)}
            className="flex-shrink-0 mt-1"
          >
            {project.pinned ? (
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ) : (
              <Star className="h-5 w-5 text-gray-400" />
            )}
          </Button>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-semibold text-lg truncate text-gray-900 font-geist">
                  {project.title}
                </h3>
                {project.pinned && (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${colorClasses[project.color]} text-xs font-jakarta`}>
                  {project.tags[0]}
                </Badge>
                {project.status === "overdue" && (
                  <Badge variant="destructive" className="text-xs font-jakarta">
                    Overdue
                  </Badge>
                )}
                {project.status === "completed" && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 font-jakarta">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-jakarta">
              {project.description}
            </p>
            
            {/* Mobile Progress and Info */}
            <div className="lg:hidden mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium font-mozilla">Progress</span>
                <span className="text-gray-700 font-mozilla">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
              
              <div className="flex justify-between text-sm text-gray-600 font-jakarta">
                <span className={isOverdue(project.deadline) ? 'text-red-600 font-medium' : ''}>
                  Due: {new Date(project.deadline).toLocaleDateString()}
                </span>
                <span className='font-mozilla'>{project.tasksTotal} Tasks ({project.tasksDone} Done)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Progress and Details (Desktop only) */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <div className="w-32">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-mozilla">Progress</span>
              <span className="font-medium text-gray-900 font-mozilla">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="w-48 space-y-1">
            <div className={`text-sm font-medium font-jakarta ${isOverdue(project.deadline) ? 'text-red-600' : 'text-gray-900'}`}>
              Due: {new Date(project.deadline).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600 font-mozilla">
              {project.tasksTotal} Tasks • {project.tasksDone} Done • {project.tasksTotal - project.tasksDone} Pending
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center justify-between lg:justify-end gap-2 flex-shrink-0">
          {/* Mobile Status Indicator */}
          <div className="lg:hidden flex items-center gap-2">
            {getStatusIcon(project)}
            {isOverdue(project.deadline) && (
              <span className="text-xs text-red-600 font-medium font-geist">Overdue</span>
            )}
          </div>
          
         <div className="flex items-center gap-1 font-geist">
        <Tooltip>
    <TooltipTrigger>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setEditingProject(project)}
        className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="font-geist">Edit project</TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button 
        variant="ghost" 
        size="sm"
        className="h-9 w-9 p-0 hover:bg-green-50 hover:text-green-600"
      >
        <FolderOpen className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="font-geist">View details</TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => markAsCompleted(project.id)}
        disabled={project.status === "completed"}
        className="h-9 w-9 p-0 hover:bg-green-50 hover:text-green-600 disabled:opacity-50"
      >
        <CheckCircle className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="font-geist">Mark as completed</TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => handleDeleteProject(project.id)}
        className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="font-geist">Delete project</TooltipContent>
  </Tooltip>
</div>
        </div>
      </div>

      {/* Progress bar for tablet view */}
      <div className="hidden md:flex lg:hidden mt-3">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: {project.progress}%</span>
            <span className={isOverdue(project.deadline) ? 'text-red-600 font-medium' : ''}>
              Due: {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      </div>
    </CardContent>
  </Card>
);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-geist">My Projects</h1>
          <p className="text-gray-600 mt-1 font-jakarta">Manage and track your projects</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className={"font-mozilla"}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"font-geist"}>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 font-geist">
              <div>
                <Label htmlFor="title" className={"pb-2"}>Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Enter project title"
                  className={"font-jakarta rounded-md"}
                />
              </div>
              <div>
                <Label htmlFor="description" className={"pb-2"}>Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Enter project description"
                  className={"font-jakarta"}
                />
              </div>
              <div>
                <Label htmlFor="deadline" className={"pb-2"}>Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="color" className={"pb-2"}>Color Label</Label>
                <Select value={newProject.color} onValueChange={(value) => setNewProject({...newProject, color: value})} className={"w-80 border-gary-200"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={"font-jakarta border-gray-200"}>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className={"font-mozilla border-gray-300"}>Cancel</Button>
              <Button onClick={handleAddProject} className={"font-mozilla"}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search projects by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-jakarta pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap font-jakarta">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className={"border-gray-200"}>
              <SelectItem value="deadline" className={"font-jakarta"}>Deadline</SelectItem>
              <SelectItem value="progress" className={"font-jakarta"}>Progress</SelectItem>
              <SelectItem value="created" className={"font-jakarta"}>Creation Date</SelectItem>
              <SelectItem value="alphabetical" className={"font-jakarta"}>Alphabetical</SelectItem>
              <SelectItem value="pinned" className={"font-jakarta"}>Pinned First</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className={"border-gray-200"}>
              <SelectItem value="all" className={"font-jakarta"}>All Projects</SelectItem>
              <SelectItem value="active" className={"font-jakarta"}>Active</SelectItem>
              <SelectItem value="completed" className={"font-jakarta"}>Completed</SelectItem>
              <SelectItem value="overdue" className={"font-jakarta"}>Overdue</SelectItem>
              <SelectItem value="pinned" className={"font-jakarta"}>Pinned</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md border-gray-200">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none py-0"
            >
              <Grid className="h-5 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div>
          {filteredProjects.map(project => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Edit Project Dialog */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Project Title</Label>
                <Input
                  id="edit-title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-deadline">Deadline</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={editingProject.deadline}
                  onChange={(e) => setEditingProject({...editingProject, deadline: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-color">Color Label</Label>
                <Select value={editingProject.color} onValueChange={(value) => setEditingProject({...editingProject, color: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
            <Button onClick={handleEditProject}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;