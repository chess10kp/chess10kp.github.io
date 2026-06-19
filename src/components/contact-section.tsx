"use client";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold font-mono text-foreground mb-3">Reach Out</h2>
      </div>
      <div className="py-2">
        <ContactForm />
      </div>
    </motion.div>
  );
}
