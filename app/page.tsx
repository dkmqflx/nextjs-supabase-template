import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>Shadcn Button</Button>
      <Link href="/prefetch">prefetch</Link>
    </div>
  );
}
