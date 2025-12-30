import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function getSettingsData() {
  const res = await fetch("http://localhost:3000/api/settings");
  if (!res.ok) {
    throw new Error("Failed to fetch settings data");
  }
  return res.json();
}

export default async function Settings() {
  const data = await getSettingsData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure integrations, rules, and AI usage
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.integrations).map(
                ([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{key}</p>
                      <p className="text-sm text-muted-foreground">
                        Permissions: {value.permissions}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          value.status === "Connected" ? "default" : "secondary"
                        }
                      >
                        {value.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {value.status === "Connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rule Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="velocity">Velocity Threshold (%)</Label>
                <Input
                  id="velocity"
                  type="number"
                  defaultValue={data.rules.velocityThreshold}
                />
              </div>
              <div>
                <Label htmlFor="blocker">Blocker Threshold</Label>
                <Input
                  id="blocker"
                  type="number"
                  defaultValue={data.rules.blockerThreshold}
                />
              </div>
              <div>
                <Label htmlFor="scope">Scope Change Threshold</Label>
                <Input
                  id="scope"
                  type="number"
                  defaultValue={data.rules.scopeChangeThreshold}
                />
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Usage Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold">
                    {data.aiUsage.totalQueries}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total AI Queries
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {data.aiUsage.confidenceAverage}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Average Confidence
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {new Date(data.aiUsage.lastAnalysis).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Last Analysis</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  AI insights are generated using sprint data, velocity trends,
                  and blocker information. All recommendations include
                  confidence scores and reference the data sources used.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
