"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Prijava nije uspela.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Došlo je do greške prilikom prijave.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card title="Prijava">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Unesite email"
          />

          <InputField
            label="Lozinka"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Unesite lozinku"
          />

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            {loading ? "Prijava..." : "Prijavi se"}
          </Button>
        </form>
      </Card>
    </div>
  );
}