import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function getSignalsData() {
  const res = await fetch("http://localhost:3000/api/signals");
  if (!res.ok) {
    throw new Error("Failed to fetch signals data");
  }
  return res.json();
}

export default async function Signals() {
  const data = await getSignalsData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Signals</h1>
          <p className="text-muted-foreground">
            All detected signals across sprints
          </p>
        </div>

        <div className="mb-6 flex space-x-4">
          <Input placeholder="Filter by type..." className="max-w-sm" />
          <select className="px-3 py-2 border border-input rounded-md bg-background">
            <option>All Severities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="px-3 py-2 border border-input rounded-md bg-background">
            <option>All Sprints</option>
            <option>Sprint 2025-12</option>
            <option>Sprint 2025-11</option>
          </select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Signal History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Rule</th>
                    <th className="text-left py-2">Severity</th>
                    <th className="text-left py-2">Affected Items</th>
                    <th className="text-left py-2">Sprint</th>
                    <th className="text-left py-2">Timestamp</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.signals.map((signal: any) => (
                    <tr key={signal.id} className="border-b hover:bg-muted/50">
                      <td className="py-3">{signal.type}</td>
                      <td className="py-3">{signal.rule}</td>
                      <td className="py-3">
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
                      </td>
                      <td className="py-3">
                        {signal.affectedItems.join(", ")}
                      </td>
                      <td className="py-3">{signal.sprint}</td>
                      <td className="py-3">
                        {new Date(signal.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
