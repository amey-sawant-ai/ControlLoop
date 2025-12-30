import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    automations: [
      {
        id: '1',
        trigger: 'Velocity drops below 80% of average',
        action: 'Send notification to team lead',
        approvalStatus: 'Approved',
        lastRun: '2025-12-13T10:00:00Z',
        enabled: true,
      },
      {
        id: '2',
        trigger: 'Blocker count exceeds 3',
        action: 'Create Jira ticket for blocker review',
        approvalStatus: 'Pending',
        lastRun: '2025-12-12T14:30:00Z',
        enabled: false,
      },
      {
        id: '3',
        trigger: 'Scope change detected',
        action: 'Pause sprint and notify stakeholders',
        approvalStatus: 'Approved',
        lastRun: '2025-12-11T09:15:00Z',
        enabled: true,
      },
    ],
  };

  return NextResponse.json(data);
}