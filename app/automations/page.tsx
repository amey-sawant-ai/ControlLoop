import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getAutomationsData() {
  const res = await fetch("http://localhost:3000/api/automations");
  if (!res.ok) {
    throw new Error("Failed to fetch automations data");
  }
  return res.json();
}

export default async function Automations() {
  const data = await getAutomationsData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Automations</h1>
          <p className="text-muted-foreground">
            Manage automated workflows and actions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enabled Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.automations.map((automation: any) => (
                <div key={automation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">
                        Trigger: {automation.trigger}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Action: {automation.action}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>
                          Status:{" "}
                          <Badge
                            variant={
                              automation.approvalStatus === "Approved"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {automation.approvalStatus}
                          </Badge>
                        </span>
                        <span>
                          Last run:{" "}
                          {new Date(automation.lastRun).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        {automation.enabled ? "Disable" : "Enable"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  {automation.action.includes("modify") && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ This automation modifies external tools. Ensure
                        proper permissions and review actions carefully.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
