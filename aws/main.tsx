import { createRoot } from "react-dom/client";
import AuraPrototype from "../app/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Aura app root was not found.");
}

createRoot(root).render(<AuraPrototype />);
