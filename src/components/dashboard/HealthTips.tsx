
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const HealthTips = () => {
  const tips = [
    {
      emoji: "💨",
      title: "Deep Breathing",
      description: "Practice deep breathing exercises daily to improve lung capacity.",
    },
    {
      emoji: "🚭",
      title: "Avoid Smoking",
      description: "Smoking damages lung tissue and reduces function.",
    },
    {
      emoji: "🏃",
      title: "Regular Exercise",
      description: "Cardio exercises strengthen respiratory muscles.",
    },
  ];

  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-slate-800">Health Tips</CardTitle>
        <CardDescription>For your respiratory health</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {tips.map((tip) => (
          <div key={tip.title} className="flex gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">{tip.emoji}</span>
            </div>
            <div>
              <h4 className="font-medium text-slate-800">{tip.title}</h4>
              <p className="text-sm text-slate-500">{tip.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
