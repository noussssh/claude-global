import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { serviceProvidersTable } from '@/lib/db/schema';

export async function GET() {
  try {
    // Get environment variables
    const databaseUrl = process.env.TURSO_DATABASE_URL || "fallback URL";
    const hasAuthToken = !!process.env.TURSO_AUTH_TOKEN;

    // Get count of service providers
    const serviceProviders = await db.select().from(serviceProvidersTable);
    const count = serviceProviders.length;

    // Get latest record info
    const latestRecord = serviceProviders.length > 0 ? {
      id: serviceProviders[serviceProviders.length - 1].id,
      name: serviceProviders[serviceProviders.length - 1].name,
      email: serviceProviders[serviceProviders.length - 1].email,
    } : null;

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      databaseUrl: databaseUrl,
      hasAuthToken: hasAuthToken,
      recordCount: count,
      latestRecord: latestRecord,
      allRecords: serviceProviders.map(sp => ({
        id: sp.id,
        name: sp.name,
        email: sp.email
      })),
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