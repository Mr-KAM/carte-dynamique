import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export default function TeamMember({
  name,
  role,
  avatarSrc,
  avatarAlt,
  avatarFallback,
}: {
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
  avatarFallback: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarSrc} alt={avatarAlt} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
