import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy data for dashboard
  const data = {
    sprintProgress: {
      completed: 75,
      total: 100,
      remaining: 25,
    },
    healthStatus: 'At Risk', // Healthy / At Risk / Critical
    metrics: {
      velocityTrend: [10, 12, 15, 14, 16], // last 5 sprints
      scopeChangeCount: 3,
      blockerCount: 2,
      prReviewTime: '2.5 hours',
    },
    recentSignals: [
      {
        id: '1',
        type: 'Velocity Drop',
        severity: 'Medium',
        rule: 'Velocity below threshold',
        explanation: 'Sprint velocity has dropped 20% from previous sprint',
        timestamp: '2025-12-13T10:00:00Z',
      },
      {
        id: '2',
        type: 'Scope Change',
        severity: 'Low',
        rule: 'Multiple scope changes detected',
        explanation: '3 scope changes added to current sprint',
        timestamp: '2025-12-12T14:30:00Z',
      },
    ],
    aiSummary: 'Current sprint is progressing well with 75% completion. However, velocity has slightly decreased, and there are 2 active blockers that need attention. AI recommends focusing on blocker resolution to maintain momentum.',
  };

  return NextResponse.json(data);
}