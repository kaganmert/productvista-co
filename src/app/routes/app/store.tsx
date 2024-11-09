import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';

export const StoreRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Store">
      Welcome <b>{`${user.data?.username}`}</b>
    </ContentLayout>
  );
};
