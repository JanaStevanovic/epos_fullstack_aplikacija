"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

type UserType = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok || !data.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Ukupno validacija">
          <p className="text-3xl font-bold text-blue-600">0</p>
        </Card>

        <Card title="Poslednja aktivnost">
          <p className="text-gray-600">Još uvek nema kreiranih validacija.</p>
        </Card>

        <Card title="Status sistema">
          <p className="font-medium text-green-600">Sistem je aktivan</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Moje validacije">
          <p className="text-gray-600">
            Trenutno nema sačuvanih validacija startap ideja.
          </p>
        </Card>
      </div>
    </div>
  );
}