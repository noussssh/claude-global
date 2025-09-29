import { ServiceProviderForm } from "@/components/service-provider-form";

export default function NewServiceProviderPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Service Provider</h1>
        <p className="text-muted-foreground mt-2">
          Create a new service provider entry with all the necessary details.
        </p>
      </div>
      <ServiceProviderForm />
    </div>
  );
}