
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarWithPlaceholderProps {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
}

export function AvatarWithPlaceholder({
  src,
  alt,
  fallback,
  className,
}: AvatarWithPlaceholderProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
