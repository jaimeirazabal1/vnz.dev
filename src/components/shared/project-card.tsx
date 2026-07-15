import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string[];
  budget?: string;
  timeline?: string;
  status: string;
  proposals?: number;
}

export function ProjectCard({
  title,
  description,
  skills,
  budget,
  timeline,
  status,
  proposals,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Badge
          variant={status === "open" ? "default" : "secondary"}
          className="text-xs"
        >
          {status}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {skills.length > 4 && (
          <Badge variant="outline" className="text-xs">
            +{skills.length - 4}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        {budget && <span className="font-medium text-foreground">{budget}</span>}
        {timeline && <span>{timeline}</span>}
        {proposals !== undefined && <span>{proposals} proposals</span>}
      </div>

      <Button className="w-full" size="sm" variant="outline">
        View project
      </Button>
    </div>
  );
}
