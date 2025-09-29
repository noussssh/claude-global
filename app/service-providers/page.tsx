import { ServiceProviderList } from "@/components/service-provider-list";
import { getAllServiceProviders } from "@/lib/db/queries";

export default async function ServiceProvidersPage() {
  const serviceProviders = await getAllServiceProviders();

  return (
    <div className="container mx-auto px-4 py-8">
      <ServiceProviderList serviceProviders={serviceProviders} />
    </div>
  );
}