import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    signals: [
      {
        id: '1',
        type: 'Velocity Drop',
        rule: 'Velocity below threshold',
        severity: 'Medium',
        affectedItems: ['Sprint 2025-12'],
        timestamp: '2025-12-13T10:00:00Z',
        sprint: 'Sprint 2025-12',
      },
      {
        id: '2',
        type: 'Scope Change',
        rule: 'Multiple scope changes detected',
        severity: 'Low',
        affectedItems: ['Task 3'],
        timestamp: '2025-12-12T14:30:00Z',
        sprint: 'Sprint 2025-12',
      },
      {
        id: '3',
        type: 'Blocker Detected',
        rule: 'High blocker count',
        severity: 'High',
        affectedItems: ['Task 1', 'Task 2'],
        timestamp: '2025-12-11T09:15:00Z',
        sprint: 'Sprint 2025-11',
      },
    ],
  };

  return NextResponse.json(data);
}