import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Folder, 
  CheckCircle, 
  AlertTriangle,
  Calendar as CalendarIcon,
  Lightbulb,
  Activity
} from 'lucide-react';
import { mockData } from '../data/mockData';
import Header from './Header';
import OverviewStats from './OverviewStats';
import RecentProjects from './RecentProjects';
import AISpotlight from './AISpotlight';
import MyTasks from './MyTasks';

const Dashboard = () => {
  const { overview, recentProjects, tasks, activityFeed, aiInsights } = mockData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      

        <div className="mx-4">


      {/* Overview Widgets */}
      <OverviewStats overview={overview}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Projects & Tasks */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Projects */}
         <RecentProjects projects={recentProjects}/>

          {/* My Tasks */}
         <MyTasks tasks={tasks} />

          {/* Activity Feed */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2 text-purple-500" />
                  Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityFeed.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-2 h-2 mt-2 rounded-full ${
                        activity.type === 'completed' ? 'bg-green-500' :
                        activity.type === 'created' ? 'bg-blue-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - AI Panel & Calendar */}
        <div className="space-y-6">
          {/* AI Spotlight Panel */}
          <AISpotlight insights={aiInsights}  />

          {/* Calendar Widget */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CalendarIcon className="w-5 h-5 mr-2 text-red-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {overview.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;