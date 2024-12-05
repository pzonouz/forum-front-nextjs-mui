import { auth } from "@/auth";

async function POST(request: Request) {
  const formData = new FormData();
  const session = await auth();
  formData.append("file", await request.blob());
  const res = await fetch(`${process.env.BACKEND_URL}/uploads`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.access}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return new Response(JSON.stringify(data));
  }
  const err = await res.json();
  return new Response(JSON.stringify(err), { status: 500 });
}
export { POST };
