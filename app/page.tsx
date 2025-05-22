import Layout from "@/components/Cards/Layout";
import Nav from "@/components/nav/nav";

export default function Home() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto h-screen px-4 py-6 gap-6">
      <Nav />
      <Layout />
    </div>
  );
}
