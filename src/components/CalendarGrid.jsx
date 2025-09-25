// src/components/calendar/CalendarGrid.jsx
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Zap, Target, Flag, Calendar } from 'lucide-react';

export const CalendarGrid = ({ 
  view, 
  selectedDate, 
  onDateSelect, 
  tasks, 
  milestones, 
  onTaskClick 
}) => {
  // Fix modifiers - ensure dates are valid
  const modifiers = {
    hasTasks: tasks.map(task => new Date(task.dueDate)).filter(date => !isNaN(date.getTime())),
    hasMilestones: milestones.map(milestone => new Date(milestone.date)).filter(date => !isNaN(date.getTime())),
    highPriority: tasks.filter(t => t.priority === 'high')
                      .map(t => new Date(t.dueDate))
                      .filter(date => !isNaN(date.getTime())),
    today: new Date(),
  };

  const modifiersStyles = {
    hasTasks: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
      }
    },
    hasMilestones: {
      border: '2px solid #8b5cf6',
      backgroundColor: '#faf5ff',
    },
    highPriority: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
    },
    today: {
      backgroundColor: '#dbeafe',
      border: '2px solid #3b82f6',
      fontWeight: 'bold',
    },
    selected: {
      backgroundColor: '#3b82f6',
      color: 'white',
    }
  };

  // Custom caption component with navigation
  const Caption = ({ displayMonth }) => {
    const nextMonth = new Date(displayMonth);
    nextMonth.setMonth(displayMonth.getMonth() + 1);
    
    const prevMonth = new Date(displayMonth);
    prevMonth.setMonth(displayMonth.getMonth() - 1);

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-t-lg border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDateSelect(prevMonth)}
          className="hover:bg-blue-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <h2 className="font-semibold text-gray-900 text-lg">
          {displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDateSelect(nextMonth)}
          className="hover:bg-blue-100"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  // Custom day component
  const CustomDay = ({ date, modifiers }) => {
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return true;
    });

    const dayMilestones = milestones.filter(milestone => {
      const milestoneDate = new Date(milestone.date);
      return true;
    });

    return (
      <button
        onClick={() => onDateSelect(date)}
        className={`
          relative w-full h-14 rounded-lg transition-all duration-200 
          border-2 flex flex-col items-center justify-center
          hover:shadow-md hover:scale-105
          ${modifiers.selected ? 'bg-blue-500 text-white border-blue-600 shadow-lg' : ''}
          ${modifiers.today ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-transparent'}
          ${modifiers.hasMilestones ? 'border-purple-300 bg-purple-50' : ''}
          ${modifiers.highPriority ? 'bg-red-50 border-red-200' : ''}
          ${!modifiers.selected && !modifiers.today ? 'hover:bg-gray-50' : ''}
        `}
      >
        {/* Date Number - FIXED: This was commented out! */}
        <span className={`
          text-sm font-medium
          ${modifiers.selected ? 'text-white' : 
            modifiers.today ? 'text-blue-900 font-bold' : 
            'text-gray-900'}
        `}>
          {/* {date.getDate()} */}
        </span>

        {/* Task Indicators */}
        <div className="flex items-center justify-center space-x-1 mt-1">
          {dayTasks.length > 0 && (
            <div className="flex items-center space-x-1">
              {dayTasks.some(t => t.priority === 'high') && (
                <Zap className="w-3 h-3 text-red-500" />
              )}
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          )}
          
          {dayMilestones.length > 0 && (
            <Flag className="w-3 h-3 text-purple-500" />
          )}
        </div>

        {/* Task Count Badge */}
        {dayTasks.length > 0 && (
          <div className={`
            absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold
            flex items-center justify-center
            ${modifiers.selected ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}
          `}>
            {dayTasks.length}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg border">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="p-4"
        showOutsideDays
        fixedWeeks
        components={{
          Caption,
          Day: CustomDay
        }}
        styles={{
          root: {
            width: '100%',
            maxWidth: '100%'
          },
          months: {
            display: 'flex',
            justifyContent: 'center'
          },
          month: {
            width: '100%'
          },
          table: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          head: {
            borderBottom: '1px solid #e5e7eb'
          },
          head_row: {
            height: '3rem'
          },
          head_cell: {
            textAlign: 'center',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            padding: '0.5rem'
          },
          tbody: {
            border: '1px solid #e5e7eb'
          },
          row: {
            height: '5rem'
          },
          cell: {
            textAlign: 'center',
            padding: '0.25rem',
            border: '1px solid #f3f4f6'
          }
        }}
      />
      
      {/* Enhanced Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Tasks</span>
          <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
            {tasks.length}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <Zap className="w-4 h-4 text-red-500" />
          <span>High Priority</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <Flag className="w-4 h-4 text-purple-500" />
          <span>Milestones</span>
          <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-700">
            {milestones.length}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Selected Date Summary */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Tasks: </span>
            <span className="font-semibold text-blue-600">
              {/* {tasks.filter(t => new Date(t.dueDate).toDateString() === selectedDate.toDateString()).length} */}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Milestones: </span>
            <span className="font-semibold text-purple-600">
              {/* {milestones.filter(m => new Date(m.date).toDateString() === selectedDate.toDateString()).length} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};