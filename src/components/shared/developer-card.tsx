import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DeveloperCardProps {
  name: string;
  role: string;
  skills: string[];
  experience: string;
  hourlyRate?: string;
  availability: string;
  location?: string;
}

export function DeveloperCard({
  name,
  role,
  skills,
  experience,
  hourlyRate,
  availability,
  location,
}: DeveloperCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {experience}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.slice(0, 5).map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {skills.length > 5 && (
          <Badge variant="outline" className="text-xs">
            +{skills.length - 5}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>{availability}</span>
        {hourlyRate && <span className="font-medium text-foreground">{hourlyRate}</span>}
        {location && <span>{location}</span>}
      </div>

      <Button className="w-full" size="sm">
        View profile
      </Button>
    </div>
  );
}
