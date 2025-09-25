
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import { 
  Folder, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

const OverviewStats = ({ overview, isLoading = false }) => {
  const stats = [
    {
      key: 'totalProjects',
      label: 'Total Projects',
      value: overview?.totalProjects || 0,
      icon: Folder,
      gradient: 'from-blue-500/10 to-blue-600/20',
      border: 'border-blue-200/50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-500/5',
      trend: '+2 this week'
    },
    {
      key: 'activeTasks',
      label: 'Active Tasks',
      value: overview?.activeTasks || 0,
      icon: CheckCircle,
      gradient: 'from-green-500/10 to-green-600/20',
      border: 'border-green-200/50',
      iconColor: 'text-green-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-500/5',
      trend: '12 completed'
    },
    {
      key: 'nextMilestone',
      label: 'Next Milestone',
      value: overview?.nextMilestone || 'No milestone',
      icon: Target,
      gradient: 'from-orange-500/10 to-orange-600/20',
      border: 'border-orange-200/50',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-500/5',
      trend: '3 days left'
    },
    {
      key: 'completionRate',
      label: 'Completion Rate',
      value: overview?.completionRate || 0,
      icon: TrendingUp,
      gradient: 'from-purple-500/10 to-purple-600/20',
      border: 'border-purple-200/50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-500/5',
      trend: '+8% this month',
      showProgress: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-8 w-12 bg-gray-300" />
                  <Skeleton className="h-3 w-16 bg-gray-200" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-7"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.key}
          variants={itemVariants}
          
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`
            relative overflow-hidden border-0 shadow-sm hover:shadow-md 
            transition-all duration-300 backdrop-blur-sm
            bg-gradient-to-br ${stat.gradient} ${stat.border}
            group cursor-pointer max-h-64 rounded-sm
          `}>
            {/* Animated background effect */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 ${stat.bgColor}
            `}></div>
            
            {/* Glow effect */}
            <div className={`
              absolute -inset-1 bg-gradient-to-r ${stat.gradient} 
              rounded-xl blur-lg opacity-0 group-hover:opacity-30 
              transition-opacity duration-500
            `}></div>

            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className={`text-xl font-mozilla font-bold ${stat.textColor} tracking-wide`}>
                    {stat.label}
                  </p>
                  <motion.p 
                    className={`text-3xl font-semibold ${stat.textColor} font-geist`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.value}
                    {stat.key === 'completionRate' && '%'}
                  </motion.p>
                  <p className="text-xs text-gray-600 font-medium font-jakarta">
                    {stat.trend}
                  </p>
                </div>
                
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`
                    relative p-3 rounded-xl bg-white/50 backdrop-blur-sm 
                    border border-white/20 group-hover:bg-white/70
                    transition-all duration-300
                  `}
                >
                  <stat.icon className={`h-9 w-9 ${stat.iconColor}`} />
                  
                  {/* Icon decoration */}
                  <div className={`
                    absolute -inset-1 rounded-xl bg-gradient-to-r ${stat.gradient} 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-300
                  `}></div>
                </motion.div>
              </div>

             
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OverviewStats;