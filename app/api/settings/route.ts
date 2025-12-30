import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    integrations: {
      github: { status: 'Connected', permissions: 'Read/Write' },
      jira: { status: 'Connected', permissions: 'Read/Write' },
      slack: { status: 'Not Connected', permissions: 'None' },
    },
    rules: {
      velocityThreshold: 80,
      blockerThreshold: 3,
      scopeChangeThreshold: 2,
    },
    aiUsage: {
      totalQueries: 1250,
      confidenceAverage: 87,
      lastAnalysis: '2025-12-13T10:00:00Z',
    },
  };

  return NextResponse.json(data);
}