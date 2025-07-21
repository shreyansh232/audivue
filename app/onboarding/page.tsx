"use client";
import OnboardingModal from "@/components/OnboardingModal";
import { useState } from "react";

const page = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <OnboardingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default page;
