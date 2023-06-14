import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex items-center justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex items-center gap-1 rounded-[20px] bg-gray-300 text-black">
          <img
            src={session?.user?.image}
            alt=""
            referrerpolicy="no-referrer"
            className="ml-1.5 h-8 w-8 rounded-[50%]"
          />
          <span className="p-2 pl-0">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
