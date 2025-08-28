import React, { useState } from 'react';
import { User, Target, Clock, Utensils, Activity, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const FitnessAgent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    // Datos básicos
    gender: '',
    age: '',
    currentWeight: '',
    targetWeight: '',
    height: '',
    timeFrame: '',
    
    // Rutina diaria
    dailyRoutine: '',
    availableTime: '',
    activityLevel: '',
    
    // Alimentación
    foodsYes: '',
    foodsRecommended: '',
    foodsNo: '',
    
    // Preferencias de ejercicio
    exercisePreference: '',
    fitnessLevel: ''
  });
  
  const [results, setResults] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'masculino') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    const multipliers = {
      'sedentario': 1.2,
      'ligero': 1.375,
      'moderado': 1.55,
      'intenso': 1.725,
      'muy-intenso': 1.9
    };
    return bmr * (multipliers[activityLevel] || 1.2);
  };

  const validateGoal = (currentWeight, targetWeight, timeFrame, gender) => {
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

  const generatePersonalizedPlan = async () => {
    setIsGenerating(true);
    
    try {
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
        parseInt(userData.timeFrame),
        userData.gender
      );

      // Crear el prompt para Claude
      const prompt = `Como experto en fitness y nutrición, crea un plan personalizado basado en esta información:

DATOS PERSONALES:
- Género: ${userData.gender}
- Edad: ${userData.age} años
- Peso actual: ${userData.currentWeight} kg
- Peso objetivo: ${userData.targetWeight} kg
- Altura: ${userData.height} cm
- Tiempo disponible: ${userData.timeFrame} meses
- BMR calculado: ${Math.round(bmr)} calorías
- TDEE estimado: ${Math.round(tdee)} calorías

ESTILO DE VIDA:
- Rutina diaria: ${userData.dailyRoutine}
- Tiempo disponible para ejercicio: ${userData.availableTime}
- Nivel de actividad: ${userData.activityLevel}
- Nivel de fitness: ${userData.fitnessLevel}
- Preferencia de ejercicio: ${userData.exercisePreference}

ALIMENTACIÓN:
- Alimentos que SÍ consume: ${userData.foodsYes}
- Alimentos que debería consumir: ${userData.foodsRecommended}
- Alimentos que NO debe consumir: ${userData.foodsNo}

VALIDACIÓN DE META:
- Meta semanal actual: ${goalValidation.weeklyGoal.toFixed(2)} kg/semana
- ¿Es realista?: ${goalValidation.isRealistic ? 'Sí' : 'No'}
- Peso recomendado: ${goalValidation.recommendedWeight} kg

Por favor, responde SOLO con un JSON válido en este formato exacto:
{
  "goalAnalysis": {
    "isRealistic": boolean,
    "currentGoal": "texto explicativo",
    "recommendation": "texto explicativo si no es realista"
  },
  "nutritionPlan": {
    "dailyCalories": number,
    "macros": {
      "protein": "X gramos",
      "carbs": "X gramos", 
      "fats": "X gramos"
    },
    "mealPlan": [
      {
        "meal": "Desayuno",
        "foods": ["alimento1", "alimento2"],
        "calories": number
      },
      {
        "meal": "Almuerzo", 
        "foods": ["alimento1", "alimento2"],
        "calories": number
      },
      {
        "meal": "Cena",
        "foods": ["alimento1", "alimento2"], 
        "calories": number
      },
      {
        "meal": "Snacks",
        "foods": ["alimento1", "alimento2"],
        "calories": number
      }
    ],
    "tips": ["tip1", "tip2", "tip3"]
  },
  "exercisePlan": {
    "weeklySchedule": [
      {
        "day": "Lunes",
        "type": "Cardio/Fuerza/Descanso",
        "duration": "X minutos",
        "exercises": ["ejercicio1", "ejercicio2", "ejercicio3"]
      }
    ],
    "tips": ["tip1", "tip2", "tip3"]
  },
  "timeline": {
    "month1": "objetivo mes 1",
    "month2": "objetivo mes 2", 
    "month3": "objetivo mes 3",
    "month4": "objetivo mes 4"
  }
}

IMPORTANTE: Responde ÚNICAMENTE con el JSON válido, sin texto adicional.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Limpiar respuesta de posibles markdown
      responseText = responseText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      
      const planData = JSON.parse(responseText);
      setResults(planData);
      
    } catch (error) {
      console.error("Error generando el plan:", error);
      setResults({
        error: "Hubo un error generando tu plan personalizado. Por favor, intenta nuevamente."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="mx-auto w-16 h-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
        <p className="text-gray-600">Cuéntanos sobre ti para personalizar tu plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
          <select 
            value={userData.gender} 
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona tu género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
          <input
            type="number"
            value={userData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Tu edad en años"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso actual (kg)</label>
          <input
            type="number"
            value={userData.currentWeight}
            onChange={(e) => handleInputChange('currentWeight', e.target.value)}
            placeholder="Tu peso actual"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
          <input
            type="number"
            value={userData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="Tu altura en centímetros"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso objetivo (kg)</label>
          <input
            type="number"
            value={userData.targetWeight}
            onChange={(e) => handleInputChange('targetWeight', e.target.value)}
            placeholder="Tu peso deseado"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo disponible (meses)</label>
          <input
            type="number"
            value={userData.timeFrame}
            onChange={(e) => handleInputChange('timeFrame', e.target.value)}
            placeholder="Ej: 4 meses"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Clock className="mx-auto w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Tu Rutina Diaria</h2>
        <p className="text-gray-600">Ayúdanos a entender tu estilo de vida actual</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe tu día típico</label>
          <textarea
            value={userData.dailyRoutine}
            onChange={(e) => handleInputChange('dailyRoutine', e.target.value)}
            placeholder="Ej: Me levanto a las 7am, trabajo de oficina de 9-6pm, llego a casa a las 7pm..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Cuánto tiempo tienes disponible para ejercitarte?</label>
          <select
            value={userData.availableTime}
            onChange={(e) => handleInputChange('availableTime', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecciona el tiempo disponible</option>
            <option value="15-30 minutos">15-30 minutos al día</option>
            <option value="30-45 minutos">30-45 minutos al día</option>
            <option value="45-60 minutos">45-60 minutos al día</option>
            <option value="más de 60 minutos">Más de 60 minutos al día</option>
            <option value="variable">Variable según el día</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de actividad actual</label>
          <select
            value={userData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecciona tu nivel de actividad</option>
            <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
            <option value="ligero">Actividad ligera (ejercicio 1-3 días/semana)</option>
            <option value="moderado">Actividad moderada (ejercicio 3-5 días/semana)</option>
            <option value="intenso">Actividad intensa (ejercicio 6-7 días/semana)</option>
            <option value="muy-intenso">Muy intenso (ejercicio 2 veces al día o trabajo físico)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de condición física actual</label>
          <select
            value={userData.fitnessLevel}
            onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecciona tu nivel</option>
            <option value="principiante">Principiante (no hago ejercicio regularmente)</option>
            <option value="intermedio">Intermedio (hago ejercicio ocasionalmente)</option>
            <option value="avanzado">Avanzado (hago ejercicio regularmente)</option>
            <option value="experto">Experto (atlético/competitivo)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferencias de ejercicio</label>
          <select
            value={userData.exercisePreference}
            onChange={(e) => handleInputChange('exercisePreference', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">¿Qué tipo de ejercicio prefieres?</option>
            <option value="cardio">Cardio (correr, bicicleta, natación)</option>
            <option value="fuerza">Entrenamiento de fuerza (pesas, calistenia)</option>
            <option value="mixto">Combinación de cardio y fuerza</option>
            <option value="funcional">Entrenamiento funcional (crossfit, HIIT)</option>
            <option value="flexible">Sin preferencia específica</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Utensils className="mx-auto w-16 h-16 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Tu Alimentación</h2>
        <p className="text-gray-600">Información sobre tus hábitos alimentarios actuales</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CheckCircle className="inline w-5 h-5 text-green-500 mr-2" />
            Alimentos que SÍ consumes regularmente
          </label>
          <textarea
            value={userData.foodsYes}
            onChange={(e) => handleInputChange('foodsYes', e.target.value)}
            placeholder="Ej: pollo, arroz, verduras, frutas, pescado, huevos, avena..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target className="inline w-5 h-5 text-blue-500 mr-2" />
            Alimentos que deberías consumir más (según tus objetivos)
          </label>
          <textarea
            value={userData.foodsRecommended}
            onChange={(e) => handleInputChange('foodsRecommended', e.target.value)}
            placeholder="Ej: más proteínas, vegetales verdes, frutos secos, quinoa, salmón..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertCircle className="inline w-5 h-5 text-red-500 mr-2" />
            Alimentos que NO debes consumir (alergias, intolerancias, restricciones)
          </label>
          <textarea
            value={userData.foodsNo}
            onChange={(e) => handleInputChange('foodsNo', e.target.value)}
            placeholder="Ej: lácteos, gluten, fritos, azúcar refinada, alcohol..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const canGenerate = userData.gender && userData.age && userData.currentWeight && 
                       userData.targetWeight && userData.height && userData.timeFrame &&
                       userData.activityLevel && userData.availableTime;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <Activity className="mx-auto w-16 h-16 text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Generar Tu Plan Personalizado</h2>
          <p className="text-gray-600">Revisa tu información y genera tu plan de entrenamiento y nutrición</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Resumen de tu información:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Género:</strong> {userData.gender}</div>
            <div><strong>Edad:</strong> {userData.age} años</div>
            <div><strong>Peso actual:</strong> {userData.currentWeight} kg</div>
            <div><strong>Peso objetivo:</strong> {userData.targetWeight} kg</div>
            <div><strong>Altura:</strong> {userData.height} cm</div>
            <div><strong>Tiempo:</strong> {userData.timeFrame} meses</div>
            <div><strong>Nivel de actividad:</strong> {userData.activityLevel}</div>
            <div><strong>Tiempo disponible:</strong> {userData.availableTime}</div>
          </div>
        </div>

        {!canGenerate && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">
              <AlertCircle className="inline w-4 h-4 mr-2" />
              Por favor completa todos los campos obligatorios para generar tu plan.
            </p>
          </div>
        )}

        <button
          onClick={generatePersonalizedPlan}
          disabled={!canGenerate || isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Generando tu plan personalizado...
            </>
          ) : (
            <>
              <Activity className="mr-2 w-5 h-5" />
              Generar Plan Personalizado
            </>
          )}
        </button>
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;
    
    if (results.error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{results.error}</p>
          <button
            onClick={() => setResults(null)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Tu Plan Personalizado</h2>
          <p className="text-gray-600">Aquí está tu plan de entrenamiento y nutrición personalizado</p>
        </div>

        {/* Análisis de objetivos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <Target className="mr-2" />
            Análisis de tu Objetivo
          </h3>
          <div className="space-y-3">
            <p className="text-blue-700">{results.goalAnalysis.currentGoal}</p>
            {!results.goalAnalysis.isRealistic && results.goalAnalysis.recommendation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">Recomendación:</p>
                <p className="text-yellow-700">{results.goalAnalysis.recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Plan nutricional */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
            <Utensils className="mr-2" />
            Plan Nutricional
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{results.nutritionPlan.dailyCalories}</p>
              <p className="text-sm text-gray-600">Calorías diarias</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-lg font-semibold text-red-600">{results.nutritionPlan.macros.protein}</p>
              <p className="text-sm text-gray-600">Proteínas</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-lg font-semibold text-yellow-600">{results.nutritionPlan.macros.carbs}</p>
              <p className="text-sm text-gray-600">Carbohidratos</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-lg font-semibold text-green-600">{results.nutritionPlan.macros.fats}</p>
              <p className="text-sm text-gray-600">Grasas</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-orange-800">Plan de comidas:</h4>
            {results.nutritionPlan.mealPlan.map((meal, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium text-gray-800">{meal.meal}</h5>
                  <span className="text-sm text-gray-600">{meal.calories} cal</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {meal.foods.map((food, i) => (
                    <span key={i} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-green-800 mb-2">Consejos de entrenamiento:</h4>
            <ul className="space-y-1">
              {results.exercisePlan.tips.map((tip, index) => (
                <li key={index} className="text-green-700 text-sm flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cronograma de progreso */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <Calendar className="mr-2" />
            Cronograma de Progreso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(results.timeline).map(([month, objective], index) => (
              <div key={month} className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-medium text-purple-800 capitalize">{month.replace('month', 'Mes ')}</h5>
                <p className="text-sm text-purple-700 mt-2">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setResults(null)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Modificar Información
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Imprimir Plan
          </button>
        </div>
      </div>
    );
  };

  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {renderResults()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏋️ Agente de Fitness y Nutrición
          </h1>
          <p className="text-xl text-gray-600">
            Tu entrenador personal y nutricionista con IA
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Paso {currentStep} de 4: {
                currentStep === 1 ? 'Información Personal' :
                currentStep === 2 ? 'Rutina Diaria' :
                currentStep === 3 ? 'Alimentación' :
                'Generar Plan'
              }
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              ← Anterior
            </button>
            
            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessAgent;
            <h4 className="font-semibold text-orange-800 mb-2">Consejos nutricionales:</h4>
            <ul className="space-y-1">
              {results.nutritionPlan.tips.map((tip, index) => (
                <li key={index} className="text-orange-700 text-sm flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plan de ejercicios */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <Activity className="mr-2" />
            Plan de Ejercicios
          </h3>
          
          <div className="space-y-4">
            {results.exercisePlan.weeklySchedule.map((day, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium text-gray-800">{day.day}</h5>
                  <div className="text-right">
                    <span className="text-sm text-green-600 font-medium">{day.type}</span>
                    <p className="text-xs text-gray-600">{day.duration}</p>
                  </div>
                </div>
                {day.exercises && day.exercises.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {day.exercises.map((exercise, i) => (
                      <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {exercise}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">