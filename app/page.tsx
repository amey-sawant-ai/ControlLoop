import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard");
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
}

export default async function Dashboard() {
  const data = await getDashboardData();

  const getHealthColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-500";
      case "At Risk":
        return "bg-yellow-500";
      case "Critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Sprint progress and key metrics overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Sprint Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.sprintProgress.completed}%
              </div>
              <p className="text-xs text-muted-foreground">
                {data.sprintProgress.remaining} tasks remaining
              </p>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${data.sprintProgress.completed}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Sprint Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${getHealthColor(
                    data.healthStatus
                  )}`}
                />
                <span className="text-2xl font-bold">{data.healthStatus}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Velocity Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.metrics.velocityTrend.slice(-1)[0]}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 5 sprints: {data.metrics.velocityTrend.join(", ")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                PR Review Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.metrics.prReviewTime}
              </div>
              <p className="text-xs text-muted-foreground">Average time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentSignals.map((signal: any) => (
                  <div key={signal.id} className="flex items-start space-x-3">
                    <Badge
                      variant={
                        signal.severity === "High"
                          ? "destructive"
                          : signal.severity === "Medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {signal.severity}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium">{signal.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {signal.explanation}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(signal.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Sprint Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{data.aiSummary}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>Signals used: Velocity trend, blocker count</p>
                <p>Metrics referenced: Sprint progress, scope changes</p>
                <p>Confidence: High (85%)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
