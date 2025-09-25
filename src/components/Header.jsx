import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  ChevronDown, 
  LogOut,
  Mail,
  HelpCircle,
  Moon,
  Sun,
  FolderKanban
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(3);

  const user = {
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: '/avatars/sam.jpg',
    role: 'Developer'
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 fixed z-40 w-full ">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-7 lg:space-x-9">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FolderKanban className='w-8 h-8 text-blue-500'/>
              <span className="font-bold font-mozilla text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WorkNest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[ 'Projects', 'Calendar', 'AI', 'Reports'].map((item) => (
                <Link to={`/${item}`.toLowerCase()}>
                <Button
                  key={item}
                  variant="primary"
                  className="text-base cursor-pointer font-medium text-muted-foreground  px-2 mx-2 font-jakarta"
                  >
                  {item}
                </Button>
                  </Link>
              ))}
            </nav>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative border-gray-200">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects, tasks,..."
                className="pl-10 pr-4 w-full bg-muted/50 border-0 focus-visible:ring-1 font-jakarta"
              />
            </div>
          </div>

          {/* Right Section - Actions & User Menu */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="primary"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden sm:flex hover:bg-gray-200 cursor-pointer "
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button   variant="primary" size="icon" className="relative hover:bg-gray-200 cursor-pointer">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 font-jakarta -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 border-gray-200 px-4 py-3">
                <DropdownMenuLabel className="font-geist">Notifications ({notifications})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  <DropdownMenuItem className="flex items-start space-x-3 cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium font-jakarta">New project assigned</p>
                      <p className="text-xs text-muted-foreground font-jakarta">You've been added to "Portfolio Manager"</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start space-x-3 cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium font-jakarta">Task completed</p>
                      <p className="text-xs text-muted-foreground font-jakarta">"Setup Supabase" was marked done</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start space-x-3 cursor-pointer">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium font-jakarta">Deadline approaching</p>
                      <p className="text-xs text-muted-foreground font-jakarta">"LMS Update" due in 2 days</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center justify-center text-sm font-jakarta">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" className="flex items-center space-x-2 px-2 hover:bg-transparent cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-mozilla">
                      SW
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium font-geist">{user.name}</p>
                    <p className="text-xs text-muted-foreground font-geist">{user.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-200">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium font-geist">{user.name}</p>
                    <p className="text-xs text-muted-foreground font-geist">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span className='font-geist'>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className='font-geist'>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => console.log('Sign out')}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className='font-geist'>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

       
      </div>
    </header>
  );
};

export default Header;