import React from 'react';
import { Utensils } from 'lucide-react';
import { Results } from '../../types';

interface NutritionPlanProps {
  nutritionPlan: Results['nutritionPlan'];
}

const NutritionPlan: React.FC<NutritionPlanProps> = ({ nutritionPlan }) => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
        <Utensils className="mr-2" />
        Plan Nutricional
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{nutritionPlan.dailyCalories}</p>
          <p className="text-sm text-gray-600">Calorías diarias</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-red-600">{nutritionPlan.macros.protein}</p>
          <p className="text-sm text-gray-600">Proteínas</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-yellow-600">{nutritionPlan.macros.carbs}</p>
          <p className="text-sm text-gray-600">Carbohidratos</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-green-600">{nutritionPlan.macros.fats}</p>
          <p className="text-sm text-gray-600">Grasas</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-orange-800">Plan de comidas:</h4>
        {nutritionPlan.mealPlan.map((meal, index) => (
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
        <h4 className="font-semibold text-orange-800 mb-2">Consejos nutricionales:</h4>
        <ul className="space-y-1">
          {nutritionPlan.tips.map((tip, index) => (
            <li key={index} className="text-orange-700 text-sm flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionPlan;