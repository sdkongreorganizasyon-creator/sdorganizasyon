import { describe, expect, it } from "vitest";

import {
  corporatePages,
  digitalServices,
  homeValues,
  legalDocuments,
  physicalServices,
  processSteps,
} from "@/content/site-content";

describe("source content", () => {
  it("contains all approved content groups", () => {
    expect(Object.keys(corporatePages)).toHaveLength(5);
    expect(physicalServices).toHaveLength(8);
    expect(digitalServices).toHaveLength(7);
    expect(processSteps).toHaveLength(6);
    expect(Object.keys(legalDocuments)).toHaveLength(5);
    expect(homeValues).toHaveLength(5);
  });

  it("keeps the exact organization process order", () => {
    expect(processSteps.map((step) => step.title)).toEqual([
      "BRIEF",
      "PLANLAMA",
      "TEKLİF",
      "ONAY",
      "OPERASYON",
      "RAPORLAMA",
    ]);
  });

  it("does not contain fabricated project or reference records", async () => {
    const seed = await import("../../supabase/seed-data.json");
    expect(seed.default).not.toHaveProperty("projects");
    expect(seed.default).not.toHaveProperty("references");
  });
});
