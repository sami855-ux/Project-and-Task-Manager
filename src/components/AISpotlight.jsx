
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { 
  Lightbulb, 
  Sparkles, 
  Brain, 
  Zap, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Target,
  MoreVertical,
  Play,
  Pause,
  RefreshCw,
  Rocket
} from 'lucide-react';
import { useState } from 'react';

const AISpotlight = ({ insights, isLoading = false }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  const getInsightIcon = (type) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'suggestion': return Lightbulb;
      case 'optimization': return TrendingUp;
      case 'completion': return CheckCircle;
      default: return Brain;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'alert': return 'text-red-400';
      case 'suggestion': return 'text-yellow-400';
      case 'optimization': return 'text-green-400';
      case 'completion': return 'text-blue-400';
      default: return 'text-purple-400';
    }
  };

  const getInsightBadge = (type) => {
    switch (type) {
      case 'alert': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'suggestion': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'optimization': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'completion': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    }
  };

  const handleGenerateTasks = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team AI', icon: Users }
  ];

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 border-0 shadow-2xl text-white">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-gray-700 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-3 bg-gray-400/50 rounded-lg">
              <Skeleton className="h-4 w-full bg-gray-500 rounded mb-2" />
              <Skeleton className="h-3 w-3/4 bg-gray-500 rounded" />
            </div>
          ))}
          <Skeleton className="h-10 w-full bg-gray-700 rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 border-0 shadow-2xl text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      
      {/* Floating AI elements */}
      

      <CardHeader className="relative z-10 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl font-bold">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse font-geist"></div>
            </div>
           <span className="font-geist"> AI Spotlight</span>
            <Badge variant="secondary" className="ml-3 bg-green-500/20 text-green-300 border-green-400/30 font-jakarta">
              Live
            </Badge>
          </CardTitle>
          
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-400 border-gray-700 text-gray-800">
              <DropdownMenuItem className="focus:bg-gray-700 font-geist cursor-pointer">
                <RefreshCw className="w-4 h-4 mr-2 text-white" color='white' />
                Refresh Insights
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-700 font-geist cursor-pointer">
                <Play className="w-4 h-4 mr-2" color='white' />
                Start Analysis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* AI Status */}
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300 font-jakarta">AI Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70 font-jakarta">Real-time Analysis</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/5 rounded-lg p-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                size="sm"
                className={`flex-1 text-xs cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-blue-500/20 text-white border-blue-400/30' 
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-3 h-3 mr-1" />
               <span className="font-geist text-sm"> {tab.label}</span>
              </Button>
            );
          })}
        </div>

        {/* AI Insights List */}
        <div className="space-y-3 mb-6">
          {insights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            const color = getInsightColor(insight.type);
            const badgeClass = getInsightBadge(insight.type);

            return (
              <div 
                key={index}
                className="group relative p-4 bg-white/5 rounded-md max-h-20 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-white/10 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={`text-xs ${badgeClass}`}>
                        {insight.type}
                      </Badge>
                      {insight.priority === 'high' && (
                        <Zap className="w-3 h-3 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-white mb-1 font-jakarta">{insight.title}</p>
                    <p className="text-xs text-white/60 leading-relaxed font-geist">{insight.description}</p>
                    
                    {/* Action buttons */}
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Analysis Progress */}
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium font-mozilla">AI Analysis Progress</span>
            <span className="text-xs text-white/60 font-jakarta">85% Complete</span>
          </div>
          <Progress value={85} className="h-2 bg-white/10">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </Progress>
          <div className="flex items-center space-x-2 mt-2 text-xs text-white/60">
            <Clock className="w-3 h-3" />
            <span className='font-jakarta'>Next update in 2 hours</span>
          </div>
        </div>

        {/* Generate Button */}
        <Button 
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group font-mozilla cursor-pointer"
          onClick={handleGenerateTasks}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              AI Analyzing...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Generate Smart Task List
            </>
          )}
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-lg font-bold text-green-400 font-jakarta">12</div>
            <div className="text-xs text-white/60 font-mozilla">Optimizations</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-lg font-bold text-blue-400 font-jakarta">8</div>
            <div className="text-xs text-white/60 font-mozilla">Predictions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-lg font-bold text-purple-400 font-jakarta">95%</div>
            <div className="text-xs text-white/60 font-mozilla">Accuracy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISpotlight;