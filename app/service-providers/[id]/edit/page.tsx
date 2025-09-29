import { notFound } from "next/navigation";
import { ServiceProviderForm } from "@/components/service-provider-form";
import { getServiceProviderById } from "@/lib/db/queries";

interface EditServiceProviderPageProps {
  params: { id: string };
}

export default async function EditServiceProviderPage({ params }: EditServiceProviderPageProps) {
  const serviceProvider = await getServiceProviderById(parseInt(params.id));

  if (!serviceProvider) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Service Provider</h1>
        <p className="text-muted-foreground mt-2">
          Update the details for {serviceProvider.name}.
        </p>
      </div>
      <ServiceProviderForm serviceProvider={serviceProvider} />
    </div>
  );
}