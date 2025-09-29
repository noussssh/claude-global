"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServiceProvider } from "@/lib/db/schema";
import { deleteServiceProvider } from "@/lib/db/queries";
import { useRouter } from "next/navigation";

interface ServiceProviderListProps {
  serviceProviders: ServiceProvider[];
}

export function ServiceProviderList({ serviceProviders }: ServiceProviderListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service provider?")) {
      setDeletingId(id);
      try {
        await deleteServiceProvider(id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting service provider:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (serviceProviders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No Service Providers Found</h3>
        <p className="text-muted-foreground mb-4">
          You haven&apos;t added any service providers yet. Get started by creating your first one.
        </p>
        <Button asChild>
          <Link href="/service-providers/new">Add Service Provider</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Service Providers</h2>
        <Button asChild>
          <Link href="/service-providers/new">Add New Provider</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceProviders.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.name}</TableCell>
                <TableCell>{provider.country}</TableCell>
                <TableCell>{provider.email}</TableCell>
                <TableCell>{provider.phone}</TableCell>
                <TableCell>
                  {provider.latitude && provider.longitude ? (
                    <Badge variant="secondary">
                      {provider.latitude.toFixed(4)}, {provider.longitude.toFixed(4)}
                    </Badge>
                  ) : (
                    <Badge variant="outline">No coordinates</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/service-providers/${provider.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/service-providers/${provider.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(provider.id)}
                    disabled={deletingId === provider.id}
                  >
                    {deletingId === provider.id ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}