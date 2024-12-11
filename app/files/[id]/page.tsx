import { ShowFile } from "@/app/components/AdminFile/ShowFile";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const parameters = await params;
  const resFile = await fetch(
    `${process.env.BACKEND_URL}/files/${parameters?.id}`,
  );
  const file = await resFile.json();
  return <ShowFile file={file} />;
};
export default page;
