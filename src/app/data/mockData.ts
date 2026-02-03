import type { Document } from "@/app/types";

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "UserController",
    summary: "Handles user authentication and profile APIs",
    fileName: "UserController.php",
    category: "Controllers",
    repository: "backend",
    content: "This controller manages login, logout, and user profile APIs.",
  },
  {
    id: "2",
    title: "OrderService",
    summary: "Business logic for order processing",
    fileName: "OrderService.php",
    category: "Services",
    repository: "backend",
    content: "Service layer responsible for validating and processing orders.",
  },
];
