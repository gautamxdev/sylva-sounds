import Link from "next/link";
import { NeonButton } from "@/components/ui/NeonButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="label-mono mb-4">404</p>
      <h1 className="heading-display text-4xl font-bold text-white-pure md:text-6xl">
        Signal Lost
      </h1>
      <p className="mt-4 text-grey-text">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="mt-8">
        <NeonButton href="/" variant="primary">
          Back to Home
        </NeonButton>
      </div>
    </div>
  );
}
