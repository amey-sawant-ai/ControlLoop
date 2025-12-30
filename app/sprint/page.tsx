"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SprintData = {
  metadata: {
    name: string;
    startDate: string;
    endDate: string;
    goals: string;
  };
  progress: {
    completed: number;
    total: number;
    burndown: { day: string; remaining: number }[];
  };
  signals: {
    id: string;
    severity: "Low" | "Medium" | "High";
    rule: string;
    explanation: string;
    why: string;
    affectedItems: string[];
  }[];
};

export default function SprintDetail() {
  const [data, setData] = useState<SprintData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const res = await fetch("/api/sprints/current", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const result: SprintData = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch sprint data", err);
        setError("Unable to load sprint data");
      } finally {
        setLoading(false);
      }
    };

    fetchSprint();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading sprint data…</p>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">{error ?? "No data available"}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{data.metadata.name}</h1>
          <p className="text-muted-foreground">
            {data.metadata.startDate} → {data.metadata.endDate}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Goals: {data.metadata.goals}
          </p>
        </div>

        {/* Progress */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {data.progress.completed}%
              </div>
              <p className="text-muted-foreground">
                {data.progress.completed} of {data.progress.total} tasks
                completed
              </p>
              <div className="mt-4 h-4 bg-muted rounded-full">
                <div
                  className="h-4 bg-primary rounded-full"
                  style={{ width: `${data.progress.completed}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Burndown Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.progress.burndown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="remaining"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Signals */}
        <Card>
          <CardHeader>
            <CardTitle>Detected Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.signals.map((signal) => (
                <div key={signal.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
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
                    <span className="font-medium">{signal.rule}</span>
                  </div>

                  <p className="text-sm mb-3">{signal.explanation}</p>

                  <details>
                    <summary className="cursor-pointer text-sm font-medium text-primary">
                      Why this happened
                    </summary>
                    <p className="text-sm text-muted-foreground mt-2">
                      {signal.why}
                    </p>
                  </details>

                  <div className="text-xs text-muted-foreground mt-2">
                    Affected items: {signal.affectedItems.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
