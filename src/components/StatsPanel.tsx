
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Award } from "lucide-react";

export const StatsPanel = () => {
  const stats = [
    {
      title: "Bench Press",
      current: 225,
      target: 250,
      unit: "lbs",
      progress: 90,
      trend: "+15 lbs",
      icon: TrendingUp,
      color: "bg-orange-500"
    },
    {
      title: "Squat",
      current: 315,
      target: 350,
      unit: "lbs", 
      progress: 90,
      trend: "+25 lbs",
      icon: Target,
      color: "bg-orange-600"
    },
    {
      title: "Sprint",
      current: 12.5,
      target: 11.0,
      unit: "sec",
      progress: 75,
      trend: "-0.8 sec",
      icon: Zap,
      color: "bg-orange-400"
    },
    {
      title: "Deadlift",
      current: 405,
      target: 450,
      unit: "lbs",
      progress: 90,
      trend: "+35 lbs",
      icon: Award,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-orange-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-orange-500/40">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-orange-200">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon size={16} className="text-slate-900" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-orange-100">
                    {stat.current}
                  </span>
                  <span className="text-sm text-orange-200/60">
                    / {stat.target} {stat.unit}
                  </span>
                </div>
                <Progress 
                  value={stat.progress} 
                  className="h-2 bg-slate-700"
                />
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-slate-700 text-orange-200 border-orange-500/20">
                    {stat.progress}% to goal
                  </Badge>
                  <span className="text-sm text-orange-400 font-medium">
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-orange-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-orange-100">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { exercise: "Bench Press", sets: "4x8", weight: "225 lbs", time: "2 hours ago" },
              { exercise: "Squats", sets: "5x5", weight: "315 lbs", time: "Yesterday" },
              { exercise: "100m Sprint", sets: "3 reps", weight: "12.5 sec", time: "2 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-orange-500/10">
                <div>
                  <p className="font-medium text-orange-100">{activity.exercise}</p>
                  <p className="text-sm text-orange-200/60">{activity.sets} • {activity.weight}</p>
                </div>
                <span className="text-xs text-orange-300/50">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors border border-orange-500/30 hover:border-orange-500/60">
          <p className="font-medium text-slate-900">Log Workout</p>
        </button>
        <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-orange-500/30 hover:border-orange-500/60">
          <p className="font-medium text-orange-100">View Progress</p>
        </button>
      </div>
    </div>
  );
};
