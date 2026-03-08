"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

type Idea = {
  id: string;
  title: string;
  startupStage: string;
};

type UserType = {
  userId: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (!userRes.ok || !userData.user) {
          router.push("/login");
          return;
        }

        setUser(userData.user);

        const ideasRes = await fetch("/api/ideas");
        const ideasData = await ideasRes.json();

        if (ideasRes.ok) {
          setIdeas(ideasData.ideas);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  if (loading) {
    return <p className="text-center text-gray-600">Učitavanje dashboard-a...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Dobrodošli, {user?.email}
          </p>
        </div>

        <Link href="/ideas/create">
          <Button>Nova validacija</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card title="Ukupno validacija">
          <p className="text-3xl font-bold text-blue-600">
            {ideas.length}
          </p>
        </Card>

        <Card title="Status sistema">
          <p className="font-medium text-green-600">
            Sistem je aktivan
          </p>
        </Card>

        <Card title="Platforma">
          <p className="text-gray-600">
            MVP za validaciju startap ideja
          </p>
        </Card>
      </div>

      <Card title="Moje startap ideje">
        {ideas.length === 0 ? (
          <p className="text-gray-600">
            Još uvek nema kreiranih ideja.
          </p>
        ) : (
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Faza: {idea.startupStage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

    </div>
  );
}