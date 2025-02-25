import { ResetPasswordCallback } from "@/app/components/Shared/ResetPasswordCallback";

const page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const parameters = await params;
  return <ResetPasswordCallback token={parameters.token} />;
};

export default page;
