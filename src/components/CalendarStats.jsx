import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';

export const CalendarStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: Target,
      color: 'blue',
      trend: '+12%'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'green',
      trend: '+8%'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'red',
      trend: '-2%'
    },
    {
      label: 'Due This Week',
      value: stats.dueThisWeek,
      icon: Clock,
      color: 'orange',
      trend: '+5%'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
      <CardContent className="p-4">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-10 h-10 ${getIconColor(stat.color)} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
                <Badge 
                  variant="secondary" 
                  className={`mt-1 text-xs ${
                    stat.color === 'red' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Completion Progress */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Overall Progress</span>
            <span className="font-semibold text-blue-600">{stats.completionRate}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </Progress>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{stats.completed} completed</span>
            <span>{stats.totalTasks - stats.completed} remaining</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100 mt-3">
          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
            <Zap className="w-3 h-3 mr-1" />
            {stats.dueThisWeek} due this week
          </Badge>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            <Target className="w-3 h-3 mr-1" />
            On track
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};