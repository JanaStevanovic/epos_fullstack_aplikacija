import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Pregled validacija startap ideja i osnovnih funkcionalnosti platforme.
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
          <p className="text-green-600 font-medium">Sistem je aktivan</p>
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