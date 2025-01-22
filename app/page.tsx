import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>123</Button>
      <Link href="/prefetch">prefetch</Link>
      <Link href="/error-handling">error-handling</Link>
    </div>
  );
}
