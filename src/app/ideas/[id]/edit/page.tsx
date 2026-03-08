"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function EditIdeaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    conceptDescription: "",
    problem: "",
    solution: "",
    targetMarket: "",
    startupStage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchIdea() {
      try {
        const res = await fetch(`/api/ideas/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Učitavanje ideje nije uspelo.");
          return;
        }

        setFormData({
          title: data.idea.title || "",
          conceptDescription: data.idea.conceptDescription || "",
          problem: data.idea.problem || "",
          solution: data.idea.solution || "",
          targetMarket: data.idea.targetMarket || "",
          startupStage: data.idea.startupStage || "",
        });
      } catch {
        setError("Došlo je do greške prilikom učitavanja ideje.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchIdea();
    }
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.conceptDescription ||
      !formData.problem ||
      !formData.solution ||
      !formData.targetMarket ||
      !formData.startupStage
    ) {
      setError("Sva polja su obavezna.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Izmena ideje nije uspela.");
        setSaving(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Došlo je do greške prilikom izmene ideje.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-center text-gray-600">Učitavanje ideje...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card title="Izmena startap ideje">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Naziv ideje"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Unesite naziv ideje"
          />

          <InputField
            label="Opis koncepta"
            name="conceptDescription"
            value={formData.conceptDescription}
            onChange={handleChange}
            placeholder="Kratko opišite ideju"
            textarea
          />

          <InputField
            label="Problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="Koji problem rešavate?"
            textarea
          />

          <InputField
            label="Rešenje"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            placeholder="Kako rešavate problem?"
            textarea
          />

          <InputField
            label="Ciljno tržište"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            placeholder="Ko su ciljni korisnici?"
            textarea
          />

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Faza startapa
            </label>
            <select
              name="startupStage"
              value={formData.startupStage}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Izaberite fazu</option>
              <option value="idea">Idea stage</option>
              <option value="validation">Validation stage</option>
              <option value="pre-seed">Pre-seed</option>
              <option value="seed">Seed</option>
              <option value="early-traction">Early traction</option>
            </select>
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            {saving ? "Čuvanje izmena..." : "Sačuvaj izmene"}
          </Button>
        </form>
      </Card>
    </div>
  );
}