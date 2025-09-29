import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServiceProviderById } from "@/lib/db/queries";

interface ServiceProviderDetailPageProps {
  params: { id: string };
}

export default async function ServiceProviderDetailPage({ params }: ServiceProviderDetailPageProps) {
  const serviceProvider = await getServiceProviderById(parseInt(params.id));

  if (!serviceProvider) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{serviceProvider.name}</h1>
          <p className="text-muted-foreground mt-2">Service Provider Details</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/service-providers/${serviceProvider.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/service-providers">Back to List</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="font-medium">{serviceProvider.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p>{serviceProvider.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p>{serviceProvider.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Country</label>
              <p>{serviceProvider.country}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location & Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p>{serviceProvider.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
              {serviceProvider.latitude && serviceProvider.longitude ? (
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    Lat: {serviceProvider.latitude.toFixed(6)}
                  </Badge>
                  <Badge variant="secondary">
                    Lng: {serviceProvider.longitude.toFixed(6)}
                  </Badge>
                </div>
              ) : (
                <Badge variant="outline">No coordinates available</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {serviceProvider.paymentTerms && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{serviceProvider.paymentTerms}</p>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Record Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created</label>
              <p>{new Date(serviceProvider.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <p>{new Date(serviceProvider.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}