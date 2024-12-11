import { ListFiles } from "../components/AdminFile/ListFiles";

const page = async () => {
  const resFiles = await fetch(`${process.env.BACKEND_URL}/files`);
  const files = await resFiles.json();
  return <ListFiles files={files} />;
};

export default page;
