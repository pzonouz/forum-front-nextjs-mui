import { UpdateAdminFile } from "@/app/components/AdminFile/UpdateAdminFile";
import { FileType } from "@/app/types/FileType";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const resFile = await fetch(`${process.env.BACKEND_URL}/files/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
      ContentType: "application/json",
    },
  });
  const file: FileType = (await resFile.json())?.[0];
  return <UpdateAdminFile file={file} />;
};

export default page;
