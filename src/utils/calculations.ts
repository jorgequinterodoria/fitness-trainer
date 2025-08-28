export const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
  if (gender === 'masculino') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

export const calculateTDEE = (bmr: number, activityLevel: string) => {
  const multipliers: Record<string, number> = {
    'sedentario': 1.2,
    'ligero': 1.375,
    'moderado': 1.55,
    'intenso': 1.725,
    'muy-intenso': 1.9
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};

export const validateGoal = (currentWeight: number, targetWeight: number, timeFrame: number, gender: string) => {
  const weightDifference = currentWeight - targetWeight;
  const weeks = timeFrame * 4; // Convertir meses a semanas
  const weeklyGoal = Math.abs(weightDifference) / weeks;
  
  // Límites saludables: 0.5-1 kg por semana para pérdida, 0.25-0.5 kg para ganancia
  const isWeightLoss = weightDifference > 0;
  const maxWeekly = isWeightLoss ? 1 : 0.5;
  const minWeekly = isWeightLoss ? 0.5 : 0.25;
  
  const isRealistic = weeklyGoal >= minWeekly && weeklyGoal <= maxWeekly;
  const recommendedWeightChange = isWeightLoss ? weeks * 0.75 : weeks * 0.375;
  const recommendedWeight = isWeightLoss ? 
    currentWeight - recommendedWeightChange : 
    currentWeight + recommendedWeightChange;
  
  return {
    isRealistic,
    weeklyGoal,
    recommendedWeight: Math.round(recommendedWeight * 10) / 10,
    recommendedWeightChange: Math.round(recommendedWeightChange * 10) / 10
  };
};