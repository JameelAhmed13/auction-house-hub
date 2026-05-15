import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/landing")({ component: () => <Navigate to="/" /> });
