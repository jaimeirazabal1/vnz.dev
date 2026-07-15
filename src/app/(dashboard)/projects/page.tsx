"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/shared/project-card";

const SDLC_CATEGORIES = [
  "discovery", "design", "development", "qa", "devops", "maintenance",
];

const MOCK_PROJECTS = [
  {
    title: "E-commerce Platform Redesign",
    description: "Looking for a full-stack developer to rebuild our e-commerce platform with Next.js and a headless CMS. Need modern UI, fast performance, and Stripe integration.",
    skills: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    budget: "$3,000 - $5,000",
    timeline: "6-8 weeks",
    status: "open",
    proposals: 12,
  },
  {
    title: "Mobile App for Fitness Tracking",
    description: "Need a React Native developer to build a cross-platform fitness tracking app with workout logging, progress charts, and social features.",
    skills: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    budget: "$4,000 - $7,000",
    timeline: "10-12 weeks",
    status: "open",
    proposals: 8,
  },
  {
    title: "DevOps Pipeline Setup",
    description: "Looking for a DevOps engineer to set up CI/CD pipelines, Docker containers, and AWS infrastructure for our SaaS application.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    budget: "$2,000 - $3,500",
    timeline: "3-4 weeks",
    status: "open",
    proposals: 5,
  },
  {
    title: "AI Chatbot Integration",
    description: "Need to integrate an AI-powered customer support chatbot into our existing web application. Must handle multi-language support.",
    skills: ["Python", "Machine Learning", "NLP", "REST APIs"],
    budget: "$2,500 - $4,000",
    timeline: "4-6 weeks",
    status: "open",
    proposals: 15,
  },
  {
    title: "Landing Page for SaaS Product",
    description: "Design and build a high-converting landing page for our B2B SaaS product. Need responsive design, animations, and SEO optimization.",
    skills: ["React", "Next.js", "Tailwind CSS", "Figma"],
    budget: "$800 - $1,500",
    timeline: "2-3 weeks",
    status: "open",
    proposals: 20,
  },
  {
    title: "API Migration to GraphQL",
    description: "Migrate our REST API to GraphQL. Need schema design, resolver implementation, and client-side integration.",
    skills: ["GraphQL", "Node.js", "TypeScript", "PostgreSQL"],
    budget: "$3,000 - $5,000",
    timeline: "6-8 weeks",
    status: "open",
    proposals: 7,
  },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filtered = MOCK_PROJECTS.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse projects</h1>
        <p className="text-muted-foreground">
          Find projects that match your skills
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">SDLC Category</p>
        <div className="flex flex-wrap gap-2">
          {SDLC_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
            >
              <Badge
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer capitalize hover:bg-muted transition-colors"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No projects match your search. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
