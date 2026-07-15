"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeveloperCard } from "@/components/shared/developer-card";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
  "Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Flutter",
  "React Native", "Vue.js", "Angular", "Java", "C#", "Rust",
];

const EXPERIENCE_LEVELS = ["junior", "mid", "senior", "lead"];
const AVAILABILITY = ["full_time", "part_time", "freelance"];

const MOCK_DEVELOPERS = [
  {
    name: "Maria Garcia",
    role: "Full-Stack Developer",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    experience: "senior",
    hourlyRate: "$45-65/hr",
    availability: "freelance",
    location: "Buenos Aires, AR",
  },
  {
    name: "Carlos Mendez",
    role: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    experience: "senior",
    hourlyRate: "$55-80/hr",
    availability: "full_time",
    location: "Remote",
  },
  {
    name: "Ana Rodriguez",
    role: "Frontend Developer",
    skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Figma"],
    experience: "mid",
    hourlyRate: "$30-45/hr",
    availability: "freelance",
    location: "Caracas, VE",
  },
  {
    name: "Luis Torres",
    role: "Backend Developer",
    skills: ["Python", "Go", "PostgreSQL", "GraphQL", "Docker"],
    experience: "senior",
    hourlyRate: "$50-70/hr",
    availability: "part_time",
    location: "Remote",
  },
  {
    name: "Sofia Martinez",
    role: "Mobile Developer",
    skills: ["React Native", "Flutter", "TypeScript", "iOS (Swift)"],
    experience: "mid",
    hourlyRate: "$35-50/hr",
    availability: "freelance",
    location: "Medellín, CO",
  },
  {
    name: "Diego Lopez",
    role: "Full-Stack Developer",
    skills: ["Next.js", "Node.js", "MongoDB", "React", "AWS"],
    experience: "junior",
    hourlyRate: "$20-35/hr",
    availability: "full_time",
    location: "Lima, PE",
  },
];

export default function DevelopersPage() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");

  const filtered = MOCK_DEVELOPERS.filter((dev) => {
    if (search && !dev.name.toLowerCase().includes(search.toLowerCase()) && !dev.role.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some((s) => dev.skills.includes(s))) return false;
    if (selectedExperience && dev.experience !== selectedExperience) return false;
    if (selectedAvailability && dev.availability !== selectedAvailability) return false;
    return true;
  });

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find developers</h1>
        <p className="text-muted-foreground">
          Browse specialized developers for your project
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
              >
                <Badge
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-muted transition-colors"
                >
                  {skill}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Experience</p>
            <div className="flex gap-2">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedExperience(selectedExperience === level ? "" : level)}
                >
                  <Badge
                    variant={selectedExperience === level ? "default" : "outline"}
                    className="cursor-pointer capitalize hover:bg-muted transition-colors"
                  >
                    {level}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Availability</p>
            <div className="flex gap-2">
              {AVAILABILITY.map((a) => (
                <button
                  key={a}
                  onClick={() => setSelectedAvailability(selectedAvailability === a ? "" : a)}
                >
                  <Badge
                    variant={selectedAvailability === a ? "default" : "outline"}
                    className="cursor-pointer capitalize hover:bg-muted transition-colors"
                  >
                    {a.replace("_", " ")}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {(selectedSkills.length > 0 || selectedExperience || selectedAvailability) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSkills([]);
                setSelectedExperience("");
                setSelectedAvailability("");
              }}
              className="mt-auto"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dev) => (
          <DeveloperCard key={dev.name} {...dev} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No developers match your filters. Try adjusting your search.
        </div>
      )}
    </div>
  );
}
