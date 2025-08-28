export interface UserData {
  // Datos básicos
  gender: string;
  age: string;
  currentWeight: string;
  targetWeight: string;
  height: string;
  timeFrame: string;
  
  // Rutina diaria
  dailyRoutine: string;
  availableTime: string;
  activityLevel: string;
  
  // Alimentación
  foodsYes: string;
  foodsRecommended: string;
  foodsNo: string;
  
  // Preferencias de ejercicio
  exercisePreference: string;
  fitnessLevel: string;
}

export interface Results {
  goalAnalysis: {
    isRealistic: boolean;
    currentGoal: string;
    recommendation?: string;
  };
  nutritionPlan: {
    dailyCalories: number;
    macros: {
      protein: string;
      carbs: string;
      fats: string;
    };
    mealPlan: Array<{
      meal: string;
      foods: string[];
      calories: number;
    }>;
    tips: string[];
  };
  exercisePlan: {
    weeklySchedule: Array<{
      day: string;
      type: string;
      duration: string;
      exercises: string[];
    }>;
    tips: string[];
  };
  timeline: {
    month1: string;
    month2: string;
    month3: string;
    month4: string;
  };
  error?: string;
}