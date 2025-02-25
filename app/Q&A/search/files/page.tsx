import { FileSearchComponent } from "@/app/components/Search/FileSearchComponent";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  return <FileSearchComponent query={(await searchParams).q} />;
};
export default page;
