import { SearchComponent } from "../components/Search/SearchComponent";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  return <SearchComponent query={(await searchParams).q} />;
};
export default page;
