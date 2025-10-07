 export function validateExercise(exercise: { övning: string | any[]; set: number; reps: number; vikt: number; kommentar: string | any[]; }) {
    const errors = [];
  
    if (!exercise.övning || exercise.övning.length < 2) {
      errors.push("Övning måste anges och vara minst 2 tecken.");
    }
  
    if (!exercise.set || exercise.set <= 0) {
      errors.push("Set måste vara ett positivt tal.");
    }
  
    if (!exercise.reps || exercise.reps <= 0) {
      errors.push("Reps måste vara ett positivt tal.");
    }
  
    if (exercise.vikt < 0) {
      errors.push("Vikt måste vara 0 eller större.");
    }
  
    if (exercise.kommentar && exercise.kommentar.length > 200) {
      errors.push("Kommentaren får max vara 200 tecken.");
    }
  
    return errors;
  }

  