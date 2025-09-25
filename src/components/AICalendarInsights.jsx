import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Sparkles,
  Zap,
  Clock,
  Target,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Brain,
  ArrowRight
} from 'lucide-react';

export const AICalendarInsights = ({ insights }) => {
  const getInsightConfig = (type) => {
    switch (type) {
      case 'alert':
        return { icon: AlertTriangle, color: 'red', bg: 'bg-red-50', border: 'border-red-200' };
      case 'optimization':
        return { icon: Target, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'prediction':
        return { icon: TrendingUp, color: 'green', bg: 'bg-green-50', border: 'border-green-200' };
      default:
        return { icon: Lightbulb, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50/50 to-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm font-semibold text-gray-700">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Brain className="w-4 h-4 text-white" />
          </div>
          AI Insights
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const config = getInsightConfig(insight.type);
          const Icon = config.icon;
          const PriorityIcon = insight.priority === 'high' ? Zap : 
                             insight.priority === 'medium' ? Target : Clock;

          return (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${config.border} ${config.bg} hover:shadow-md transition-shadow cursor-pointer group`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-${config.color}-100`}>
                  <Icon className={`w-4 h-4 text-${config.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                      <PriorityIcon className="w-3 h-3 mr-1" />
                      {insight.priority}
                    </Badge>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {insight.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-gray-950">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Apply Suggestion
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          );
        })}

        {/* AI Performance */}
        <div className="pt-3 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>AI Accuracy</span>
            <span className="font-semibold text-green-600">92%</span>
          </div>
          <Progress value={92} className="h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
          </Progress>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Next analysis in 2 hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
};