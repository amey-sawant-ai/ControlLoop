import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    metadata: {
      name: 'Sprint 2025-12',
      startDate: '2025-12-09',
      endDate: '2025-12-22',
      goals: 'Implement user authentication and dashboard UI',
    },
    progress: {
      completed: 75,
      total: 100,
      burndown: [
        { day: 'Day 1', remaining: 100 },
        { day: 'Day 2', remaining: 95 },
        { day: 'Day 3', remaining: 90 },
        { day: 'Day 4', remaining: 85 },
        { day: 'Day 5', remaining: 80 },
        { day: 'Day 6', remaining: 75 },
      ],
    },
    signals: [
      {
        id: '1',
        severity: 'Medium',
        rule: 'Velocity Drop',
        explanation: 'Sprint velocity has dropped 20% from previous sprint',
        why: 'This happened because of unexpected blockers and scope changes.',
        affectedItems: ['Task 1', 'Task 2'],
      },
      {
        id: '2',
        severity: 'Low',
        rule: 'Scope Change',
        explanation: '3 scope changes added to current sprint',
        why: 'Client requested additional features mid-sprint.',
        affectedItems: ['Task 3'],
      },
    ],
  };

  return NextResponse.json(data);
}