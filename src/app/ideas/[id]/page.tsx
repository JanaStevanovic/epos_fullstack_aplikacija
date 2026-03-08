"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Card from "@/components/Card";

type IdeaType = {
  id: string;
  title: string;
  conceptDescription: string;
  problem: string;
  solution: string;
  targetMarket: string;
  startupStage: string;
};

export default function IdeaDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [idea, setIdea] = useState<IdeaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdea() {
      try {
        const res = await fetch(`/api/ideas/${id}`);
        const data = await res.json();

        if (res.ok) {
          setIdea(data.idea);
        }
      } catch (error) {
        console.error("IDEA DETAILS ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchIdea();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Učitavanje ideje...</p>;
  }

  if (!idea) {
    return <p className="text-center text-red-500">Ideja nije pronađena.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card title={idea.title}>
        <p className="text-gray-600">
          Faza startapa: {idea.startupStage}
        </p>
      </Card>

      <Card title="Opis koncepta">
        <p className="text-gray-700">{idea.conceptDescription}</p>
      </Card>

      <Card title="Problem">
        <p className="text-gray-700">{idea.problem}</p>
      </Card>

      <Card title="Rešenje">
        <p className="text-gray-700">{idea.solution}</p>
      </Card>

      <Card title="Ciljno tržište">
        <p className="text-gray-700">{idea.targetMarket}</p>
      </Card>

      <Card title="Mock validacioni rezultat">
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Sažetak:</strong> Ideja rešava konkretan problem i ima potencijal za validaciju na ciljnom tržištu.
          </p>
          <p>
            <strong>Ključni rizici:</strong> Potrebno je dodatno potvrditi interes korisnika i testirati tržišnu potražnju.
          </p>
          <p>
            <strong>Tržišni potencijal:</strong> Srednji do visok, u zavisnosti od segmenta korisnika i strategije izlaska na tržište.
          </p>
          <p>
            <strong>Naredni koraci:</strong> Intervjui sa korisnicima, testiranje landing stranice i validacija vrednosne ponude.
          </p>
        </div>
      </Card>
    </div>
  );
}