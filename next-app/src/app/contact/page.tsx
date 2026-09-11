import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AutoVault team — feedback, corrections or partnerships.",
};

export default function ContactPage() {
  return <ContactForm />;
}