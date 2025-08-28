import React from 'react';
import { Utensils, CheckCircle, Target, AlertCircle } from 'lucide-react';
import { UserData } from '../../types';

interface NutritionStepProps {
  userData: UserData;
  onInputChange: (field: keyof UserData, value: string) => void;
}

const NutritionStep: React.FC<NutritionStepProps> = ({ userData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('foodsYes', e.target.value)}
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
            onChange={(e) => onInputChange('foodsRecommended', e.target.value)}
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
            onChange={(e) => onInputChange('foodsNo', e.target.value)}
            placeholder="Ej: lácteos, gluten, fritos, azúcar refinada, alcohol..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionStep;