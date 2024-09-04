import { CreateTopic } from "@/components/create-topic";
import { Navigation } from "./_components/navigation";

export default function Home() {
  return (
    <div className="container">
      <Navigation />
      <CreateTopic />
    </div>
  );
}
