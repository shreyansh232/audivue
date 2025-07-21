"use client";
import OnboardingModal from "@/components/OnboardingModal";
import { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <OnboardingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Page;
