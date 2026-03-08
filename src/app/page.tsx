import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-12 rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Platforma za validaciju startap ideja
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Unesite svoju startap ideju, strukturisano opišite problem i rešenje,
          i dobijte početni izveštaj validacije.
        </p>

        <Link href="/register">
          <Button>Započni validaciju</Button>
        </Link>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card title="1. Unos ideje">
          <p className="text-gray-600">
            Korisnik unosi osnovne informacije o startap ideji, problemu, rešenju i ciljnom tržištu.
          </p>
        </Card>

        <Card title="2. Validacija">
          <p className="text-gray-600">
            Sistem obrađuje unesene podatke i priprema strukturisan rezultat validacije.
          </p>
        </Card>

        <Card title="3. Rezultat">
          <p className="text-gray-600">
            Prikazuje se sažetak procene, ključni rizici i predlog narednih koraka.
          </p>
        </Card>
      </section>
    </div>
  );
}