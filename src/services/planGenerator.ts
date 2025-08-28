import { UserData, Results } from '../types';
import { calculateBMR, calculateTDEE, validateGoal } from '../utils/calculations';

export const generatePersonalizedPlan = async (userData: UserData): Promise<Results> => {
  const bmr = calculateBMR(
    parseFloat(userData.currentWeight),
    parseFloat(userData.height),
    parseInt(userData.age),
    userData.gender
  );
  
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  
  const goalValidation = validateGoal(
    parseFloat(userData.currentWeight),
    parseFloat(userData.targetWeight),
    parseInt(userData.timeFrame)
    // Eliminar el cuarto parámetro: userData.gender
  );

  // Simular respuesta de API (ya que no tenemos acceso real a Claude)
  const mockResponse: Results = {
    goalAnalysis: {
      isRealistic: goalValidation.isRealistic,
      currentGoal: `Tu objetivo es ${userData.currentWeight > userData.targetWeight ? 'perder' : 'ganar'} ${Math.abs(parseFloat(userData.currentWeight) - parseFloat(userData.targetWeight))} kg en ${userData.timeFrame} meses. Esto representa aproximadamente ${goalValidation.weeklyGoal.toFixed(2)} kg por semana.`,
      recommendation: !goalValidation.isRealistic ? `Te recomendamos ajustar tu meta a ${goalValidation.recommendedWeight} kg para un progreso más saludable y sostenible.` : undefined
    },
    nutritionPlan: {
      dailyCalories: Math.round(tdee + (userData.currentWeight > userData.targetWeight ? -500 : 300)),
      macros: {
        protein: `${Math.round(parseFloat(userData.currentWeight) * 2.2)} gramos`,
        carbs: `${Math.round(tdee * 0.45 / 4)} gramos`,
        fats: `${Math.round(tdee * 0.25 / 9)} gramos`
      },
      mealPlan: [
        {
          meal: "Desayuno",
          foods: ["Avena con frutas", "Huevos revueltos", "Café negro"],
          calories: Math.round(tdee * 0.25)
        },
        {
          meal: "Almuerzo",
          foods: ["Pollo a la plancha", "Arroz integral", "Ensalada verde"],
          calories: Math.round(tdee * 0.35)
        },
        {
          meal: "Cena",
          foods: ["Pescado al horno", "Verduras al vapor",],
          calories: Math.round(tdee * 0.30)
        },
        {
          meal: "Snacks",
          foods: ["Frutos secos",  "Frutas"],
          calories: Math.round(tdee * 0.10)
        }
      ],
      tips: [
        "Bebe al menos 2-3 litros de agua al día",
        "Come cada 3-4 horas para mantener el metabolismo activo",
        "Incluye proteína en cada comida",
        "Evita alimentos procesados y azúcares refinados"
      ]
    },
    exercisePlan: {
      weeklySchedule: [
        {
          day: "Lunes",
          type: "Fuerza",
          duration: userData.availableTime.split('-')[0] + " minutos",
          exercises: ["Sentadillas", "Press de banca", "Remo con barra"]
        },
        {
          day: "Martes",
          type: "Cardio",
          duration: userData.availableTime.split('-')[0] + " minutos",
          exercises: ["Caminata rápida", "Bicicleta estática", "Elíptica"]
        },
        {
          day: "Miércoles",
          type: "Fuerza",
          duration: userData.availableTime.split('-')[0] + " minutos",
          exercises: ["Peso muerto", "Press militar", "Dominadas"]
        },
        {
          day: "Jueves",
          type: "Cardio",
          duration: userData.availableTime.split('-')[0] + " minutos",
          exercises: ["Natación", "Correr", "HIIT"]
        },
        {
          day: "Viernes",
          type: "Fuerza",
          duration: userData.availableTime.split('-')[0] + " minutos",
          exercises: ["Sentadilla búlgara", "Flexiones", "Plancha"]
        },
        {
          day: "Sábado",
          type: "Cardio ligero",
          duration: "30 minutos",
          exercises: ["Caminata", "Yoga", "Estiramientos"]
        },
        {
          day: "Domingo",
          type: "Descanso",
          duration: "0 minutos",
          exercises: ["Descanso activo", "Estiramientos suaves"]
        }
      ],
      tips: [
        "Calienta siempre antes de entrenar",
        "Mantén una técnica correcta en todos los ejercicios",
        "Descansa 48-72 horas entre entrenamientos del mismo grupo muscular",
        "Incrementa gradualmente la intensidad y el peso"
      ]
    },
    timeline: {
      month1: "Adaptación y establecimiento de rutinas básicas",
      month2: "Incremento de intensidad y refinamiento de técnica",
      month3: "Optimización del plan y ajustes personalizados",
      month4: "Consolidación de resultados y planificación futura"
    }
  };

  return mockResponse;
};