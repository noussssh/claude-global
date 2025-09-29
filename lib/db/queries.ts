import { eq } from 'drizzle-orm';
import { db } from './index';
import { serviceProvidersTable, type NewServiceProvider, type ServiceProvider } from './schema';

export async function createServiceProvider(data: Omit<NewServiceProvider, 'id' | 'createdAt' | 'updatedAt'>) {
  const result = await db.insert(serviceProvidersTable).values({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function getAllServiceProviders(): Promise<ServiceProvider[]> {
  return await db.select().from(serviceProvidersTable).orderBy(serviceProvidersTable.name);
}

export async function getServiceProviderById(id: number): Promise<ServiceProvider | undefined> {
  const result = await db.select().from(serviceProvidersTable).where(eq(serviceProvidersTable.id, id));
  return result[0];
}

export async function updateServiceProvider(
  id: number,
  data: Partial<Omit<NewServiceProvider, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ServiceProvider | undefined> {
  const result = await db.update(serviceProvidersTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(serviceProvidersTable.id, id))
    .returning();

  return result[0];
}

export async function deleteServiceProvider(id: number): Promise<void> {
  await db.delete(serviceProvidersTable).where(eq(serviceProvidersTable.id, id));
}