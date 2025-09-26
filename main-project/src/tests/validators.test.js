import { describe, it, expect } from "vitest";
import { validateExercise } from "../utilities/validators.js";

describe("validateExercise", () => {
  it("returns no errors for valid input", () => {
    const exercise = {
      övning: "Stångrodd",
      set: 3,
      reps: 12,
      vikt: 80,
      kommentar: "Kändes mycket bra",
    };
    expect(validateExercise(exercise)).toEqual([]);
  });

  it("requires övning to be at least 2 characters", () => {
    const exercise = { övning: "A", set: 3, reps: 10, vikt: 50 };
    expect(validateExercise(exercise)).toContain(
      "Övning måste anges och vara minst 2 tecken."
    );
  });

  it("requires set to be a positive number", () => {
    const exercise = { övning: "Marklyft", set: 0, reps: 10, vikt: 100 };
    expect(validateExercise(exercise)).toContain(
      "Set måste vara ett positivt tal."
    );
  });

  it("requires reps to be a positive number", () => {
    const exercise = { övning: "Knäböj", set: 3, reps: -5, vikt: 80 };
    expect(validateExercise(exercise)).toContain(
      "Reps måste vara ett positivt tal."
    );
  });

  it("requires vikt to be >= 0", () => {
    const exercise = { övning: "Dips", set: 3, reps: 8, vikt: -10 };
    expect(validateExercise(exercise)).toContain(
      "Vikt måste vara 0 eller större."
    );
  });

  it("limits comment to 200 characters", () => {
    const longComment = "a".repeat(201);
    const exercise = {
      övning: "Pullups",
      set: 3,
      reps: 10,
      vikt: 0,
      kommentar: longComment,
    };
    expect(validateExercise(exercise)).toContain(
      "Kommentaren får max vara 200 tecken."
    );
  });
});