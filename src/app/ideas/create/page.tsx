"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import IdeaForm from "@/components/IdeaForm";

export default function CreateIdeaPage() {
  const router = useRouter();

  async function handleCreateIdea(formData: {
    title: string;
    conceptDescription: string;
    problem: string;
    solution: string;
    targetMarket: string;
    startupStage: string;
  }) {
    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Greška pri kreiranju ideje.");
    }

    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card title="Nova validacija startap ideje">
        <IdeaForm onSubmit={handleCreateIdea} />
      </Card>
    </div>
  );
}