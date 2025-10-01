// src/components/calendar/CalendarGrid.jsx
import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Menu,
  Zap,
  Flag,
  Calendar as CalendarIcon,
} from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Mock data
const mockTasks = [
  {
    id: 1,
    title: "Team Meeting",
    dueDate: new Date(2024, 0, 15, 10, 0),
    priority: "high",
    category: "work",
    description: "Weekly team sync",
  },
  {
    id: 2,
    title: "Project Deadline",
    dueDate: new Date(2024, 0, 20, 17, 0),
    priority: "high",
    category: "work",
    description: "Submit final deliverables",
  },
  {
    id: 3,
    title: "Dentist Appointment",
    dueDate: new Date(2024, 0, 12, 14, 30),
    priority: "medium",
    category: "personal",
    description: "Regular checkup",
  },
  {
    id: 4,
    title: "Birthday Party",
    dueDate: new Date(2024, 0, 18, 19, 0),
    priority: "low",
    category: "personal",
    description: "John's birthday celebration",
  },
  {
    id: 5,
    title: "Client Presentation",
    dueDate: new Date(2024, 0, 22, 9, 0),
    priority: "high",
    category: "work",
    description: "Quarterly review with client",
  },
];

const mockMilestones = [
  {
    id: 1,
    title: "Project Kickoff",
    date: new Date(2024, 0, 10),
    category: "work",
  },
  {
    id: 2,
    title: "Vacation Start",
    date: new Date(2024, 0, 25),
    category: "personal",
  },
  {
    id: 3,
    title: "Product Launch",
    date: new Date(2024, 0, 28),
    category: "work",
  },
];

export const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15));
  const [calendarView, setCalendarView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);

  // Convert tasks and milestones to events
  const events = useMemo(() => {
    const taskEvents = mockTasks.map((task) => ({
      id: `task-${task.id}`,
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000), // 1 hour duration
      allDay: false,
      resource: task,
      type: "task",
      priority: task.priority,
      category: task.category,
    }));

    const milestoneEvents = mockMilestones.map((milestone) => ({
      id: `milestone-${milestone.id}`,
      title: milestone.title,
      start: new Date(milestone.date),
      end: new Date(milestone.date),
      allDay: true,
      resource: milestone,
      type: "milestone",
      category: milestone.category,
    }));

    return [...taskEvents, ...milestoneEvents];
  }, []);

  // Google Calendar-like event component
  const EventComponent = ({ event }) => {
    const isTask = event.type === "task";
    const isMilestone = event.type === "milestone";
    const isHighPriority = event.priority === "high";
    const isWork = event.category === "work";
    const isPersonal = event.category === "personal";

    const getEventColor = () => {
      if (isMilestone) return "#8b5cf6"; // Purple for milestones
      if (isHighPriority) return "#dc2626"; // Red for high priority
      if (isWork) return "#3b82f6"; // Blue for work
      if (isPersonal) return "#10b981"; // Green for personal
      return "#6b7280"; // Gray default
    };

    return (
      <div
        className={`
          w-full h-full px-2 py-1 text-xs rounded-sm border-l-2
          ${isMilestone ? "font-semibold" : ""}
        `}
        style={{
          backgroundColor: `${getEventColor()}15`,
          borderLeftColor: getEventColor(),
          color: "#1f2937",
        }}
      >
        <div className="flex items-center space-x-1">
          {!event.allDay && (
            <span className="text-xs opacity-75">
              {moment(event.start).format("HH:mm")}
            </span>
          )}
          <span className="font-medium truncate flex-1">{event.title}</span>
        </div>
        {event.resource.description && (
          <div className="text-xs opacity-75 truncate mt-1">
            {event.resource.description}
          </div>
        )}
      </div>
    );
  };

  // Google-style toolbar
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className="flex items-center justify-between py-4 border-b">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => setShowSidebar(!showSidebar)}
            className="hover:bg-gray-100 rounded-full"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Center section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant={calendarView === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => onView("month")}
              className={`rounded-md ${
                calendarView === "month"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Month
            </Button>
            <Button
              variant={calendarView === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => onView("week")}
              className={`rounded-md ${
                calendarView === "week"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Week
            </Button>
            <Button
              variant={calendarView === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => onView("day")}
              className={`rounded-md ${
                calendarView === "day"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Day
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("PREV")}
              className="hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => onNavigate("TODAY")}
              className="hover:bg-gray-100 rounded-md text-gray-700"
            >
              Today
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("NEXT")}
              className="hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <h2 className="text-base text-gray-900 min-w-32">{label}</h2>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>
    );
  };

  // Handle event selection
  const handleSelectEvent = (event) => {
    console.log("Event selected:", event);
    setSelectedDate(event.start);
  };

  // Handle slot selection (date click)
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  };

  // Sidebar component

  return (
    <div className="flex h-screen bg-white">
      {/* Main Calendar */}
      <div className="flex-1 flex flex-col">
        <Calendar
          localizer={localizer}
          events={events}
          date={currentDate}
          view={calendarView}
          onView={setCalendarView}
          onNavigate={setCurrentDate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
          eventPropGetter={(event) => {
            const isTask = event.type === "task";
            const isMilestone = event.type === "milestone";
            const isHighPriority = event.priority === "high";
            const isWork = event.category === "work";
            const isPersonal = event.category === "personal";

            let className = "";
            if (isMilestone) {
              className = "event-milestone";
            } else if (isHighPriority) {
              className = "event-high-priority";
            } else if (isWork) {
              className = "event-work";
            } else if (isPersonal) {
              className = "event-personal";
            }

            return {
              className,
              style: {
                border: "none",
                borderRadius: "6px",
                padding: "2px 4px",
              },
            };
          }}
          dayPropGetter={(date) => {
            const isToday = moment(date).isSame(moment(), "day");
            const isSelected = moment(selectedDate).isSame(date, "day");

            return {
              className: `rbc-day ${isToday ? "rbc-day-today" : ""} ${
                isSelected ? "rbc-day-selected" : ""
              }`,
            };
          }}
          views={["month", "week", "day"]}
          step={60}
          showMultiDayTimes
          style={{
            height: "100%",
            flex: 1,
          }}
        />
      </div>

      {/* Global Styles */}
      <style jsx>{`
        :global(.rbc-header) {
          padding: 12px 8px;
          font-weight: 500;
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          border-bottom: 1px solid #d1d5db;
          background: white;
        }

        :global(.rbc-month-view) {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        :global(.rbc-day-selected) {
          background-color: #eff6ff !important;
          border: 2px solid #3b82f6 !important;
        }

        :global(.rbc-day-slot .rbc-selected-cell) {
          background-color: #eff6ff;
        }

        :global(.rbc-day-bg) {
          border-right: 1px solid #d1d5db;
          border-bottom: 1px solid #d1d5db;
          transition: background-color 0.2s ease;
        }

        :global(.rbc-day-bg:hover) {
          background-color: #f9fafb;
        }

        :global(.rbc-month-row) {
          border-bottom: 1px solid #d1d5db;
        }

        :global(.rbc-date-cell) {
          text-align: center;
          padding: 8px 4px;
          font-size: 14px;
          font-weight: 500;
        }

        :global(.rbc-date-cell.rbc-now) {
          font-weight: bold;
        }

        :global(.rbc-date-cell.rbc-now .rbc-button-link) {
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        :global(.rbc-day-today) {
          background-color: #eff6ff !important;
        }

        :global(.rbc-off-range-bg) {
          background-color: #f8fafc;
        }

        :global(.rbc-off-range) {
          color: #9ca3af;
        }

        :global(.rbc-event) {
          border: none;
          border-radius: 6px;
          margin: 1px 4px;
          min-height: 24px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
          border-left: 4px solid;
        }

        :global(.rbc-event:hover) {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }

        :global(.rbc-event:focus) {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        :global(.rbc-timeslot-group) {
          border-bottom: 1px solid #d1d5db;
        }

        :global(.rbc-time-view) {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        :global(.rbc-time-header) {
          border-bottom: 1px solid #d1d5db;
        }

        :global(.rbc-time-content) {
          border-top: 1px solid #d1d5db;
        }

        :global(.rbc-time-header-content) {
          border-left: 1px solid #d1d5db;
        }

        :global(.rbc-time-gutter) {
          border-right: 1px solid #d1d5db;
          background: #f9fafb;
        }

        :global(.rbc-time-gutter .rbc-timeslot-group) {
          border-bottom: 1px solid #e5e7eb;
        }

        :global(.rbc-day-slot .rbc-timeslot-group) {
          border-bottom: 1px solid #e5e7eb;
        }

        :global(.rbc-timeslot-group:last-child) {
          border-bottom: none;
        }

        :global(.rbc-allday-cell) {
          border-bottom: 1px solid #d1d5db;
          background: #f9fafb;
        }

        :global(.rbc-row-bg) {
          border-bottom: 1px solid #e5e7eb;
        }

        :global(.rbc-row-bg .rbc-day-bg) {
          border-bottom: none;
        }

        /* Custom scrollbar for calendar */
        :global(.rbc-time-content) {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        :global(.rbc-time-content::-webkit-scrollbar) {
          width: 6px;
        }

        :global(.rbc-time-content::-webkit-scrollbar-track) {
          background: #f1f5f9;
        }

        :global(.rbc-time-content::-webkit-scrollbar-thumb) {
          background: #d1d5db;
          border-radius: 3px;
        }

        :global(.rbc-time-content::-webkit-scrollbar-thumb:hover) {
          background: #9ca3af;
        }

        /* Event color variants */
        :global(.event-work) {
          border-left-color: #3b82f6;
          background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
          color: #1e40af;
        }

        :global(.event-personal) {
          border-left-color: #10b981;
          background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
          color: #065f46;
        }

        :global(.rbc-toolbar) {
          border-top: 3px solid #3b82f6 !important; /* Blue top border */
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-bottom: none;
          background: white;
          padding: 16px 20px;
          margin: 0;
        }

        :global(.rbc-toolbar .rbc-toolbar-label) {
          font-size: 1.5rem !important; /* Larger month/year text */
          font-weight: 600;
          color: #1f2937;
        }

        /* Or if you want to target your CustomToolbar specifically */
        :global(.custom-toolbar) {
          border-top: 3px solid #3b82f6;
          border-radius: 8px 8px 0 0;
        }

        :global(.event-high-priority) {
          border-left-color: #dc2626;
          background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%);
          color: #991b1b;
        }

        :global(.event-milestone) {
          border-left-color: #8b5cf6;
          background: linear-gradient(135deg, #ede9fe 0%, #faf5ff 100%);
          color: #5b21b6;
          font-weight: 600;
        }

        /* Month view event adjustments */
        :global(.rbc-month-view .rbc-event) {
          padding: 2px 6px;
          font-size: 12px;
          margin: 1px 2px;
        }

        /* Week and Day view event adjustments */
        :global(.rbc-time-view .rbc-event) {
          padding: 4px 8px;
          font-size: 13px;
          margin: 1px 3px;
        }

        /* Selected date state */
        :global(.rbc-day-slot .rbc-selected-cell) {
          background-color: #eff6ff;
        }

        /* Current time indicator */
        :global(.rbc-current-time-indicator) {
          background-color: #ef4444;
          height: 2px;
        }

        :global(.rbc-current-time-indicator::before) {
          background-color: #ef4444;
          border-radius: 50%;
          content: "";
          height: 8px;
          width: 8px;
          position: absolute;
          top: -3px;
          left: -4px;
        }
      `}</style>
    </div>
  );
};
