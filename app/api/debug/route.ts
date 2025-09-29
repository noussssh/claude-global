import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { serviceProvidersTable } from '@/lib/db/schema';
import { getAllServiceProviders } from '@/lib/db/queries';

export async function GET() {
  try {
    // Get environment variables
    const databaseUrl = process.env.TURSO_DATABASE_URL || "fallback URL";
    const hasAuthToken = !!process.env.TURSO_AUTH_TOKEN;

    // Get count of service providers using raw query
    const rawServiceProviders = await db.select().from(serviceProvidersTable);
    const rawCount = rawServiceProviders.length;

    // Get service providers using the same function as the UI
    const uiServiceProviders = await getAllServiceProviders();
    const uiCount = uiServiceProviders.length;

    // Get latest record info from raw query
    const latestRecord = rawServiceProviders.length > 0 ? {
      id: rawServiceProviders[rawServiceProviders.length - 1].id,
      name: rawServiceProviders[rawServiceProviders.length - 1].name,
      email: rawServiceProviders[rawServiceProviders.length - 1].email,
    } : null;

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      databaseUrl: databaseUrl,
      hasAuthToken: hasAuthToken,
      rawQuery: {
        recordCount: rawCount,
        records: rawServiceProviders.map(sp => ({
          id: sp.id,
          name: sp.name,
          email: sp.email
        }))
      },
      uiQuery: {
        recordCount: uiCount,
        records: uiServiceProviders.map(sp => ({
          id: sp.id,
          name: sp.name,
          email: sp.email
        }))
      },
      latestRecord: latestRecord,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Failed to fetch debug info',
      message: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.TURSO_DATABASE_URL || "fallback URL",
      hasAuthToken: !!process.env.TURSO_AUTH_TOKEN,
    }, { status: 500 });
  }
}