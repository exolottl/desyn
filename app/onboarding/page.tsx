"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { geistMono, geistSans } from "@/utils/fonts";
import { completeOnboarding } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function FocusSelection() {
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const router = useRouter();
  const focusOptions: string[] = [
    "Design Systems",
    "Prototyping",
    "Case Studies",
    "Creative Thinking",
    "Try New Trends",
    "Micro-Interactions",
  ];

  const toggleFocus = (focus: string) => {
    if (selectedFocus.includes(focus)) {
      setSelectedFocus(selectedFocus.filter((item) => item !== focus));
    } else {
      setSelectedFocus([...selectedFocus, focus]);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await completeOnboarding(selectedFocus);
      if (res.success) {
        toast.success("Onboarding completed successfully!");
        router.push("/");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Unexpected error occurred.");
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="pt-8 flex flex-col items-stretch min-h-screen justify-between">
      {/* Content */}
      <div className="m-6">
        <h1 className={`text-4xl ${geistSans.className}`}>
          What are you{" "}
          <span className="heading-highlight font-[400]">focusing</span> on?
        </h1>

        <p className={`mt-4 text-gray-600 ${geistSans.className}`}>
          We&#39;ll tailor nudges, insights, and challenges around your goals.
        </p>
      </div>

      {/* Focus options */}
      <div className="m-6 mt-auto flex flex-wrap gap-2">
        {focusOptions.map((option) => (
          <button
            key={option}
            onClick={() => toggleFocus(option)}
            className={`px-4 py-2 border border-dashed border-gray-400 rounded-sm ${selectedFocus.includes(option)
                ? "bg-black text-white"
                : "bg-white text-black"
              }`}
          >
            <span
              className={`${selectedFocus.includes(option) ? "" : "+"} ${geistSans.className}`}
            >
              {!selectedFocus.includes(option) && "+ "}
              {option}
            </span>
          </button>
        ))}
      </div>

      <div className="border-[1px] border-black/10"></div>
      <div className="m-6">
        <button
          className={`flex items-center cursor-pointer justify-center gap-4 py-4 w-full btn-secondary text-white ${geistMono.className}`}
          type="button"
          onClick={handleSubmit}
        >
          Next
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
