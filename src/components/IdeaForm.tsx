"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

type IdeaFormProps = {
  onSubmit: (formData: {
    title: string;
    conceptDescription: string;
    problem: string;
    solution: string;
    targetMarket: string;
    startupStage: string;
  }) => Promise<void>;
};

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    conceptDescription: "",
    problem: "",
    solution: "",
    targetMarket: "",
    startupStage: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch {
      setError("Došlo je do greške prilikom čuvanja ideje.");
    } finally {
      setLoading(false);
    }
  }

  return (
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
        {loading ? "Čuvanje..." : "Sačuvaj ideju"}
      </Button>
    </form>
  );
}