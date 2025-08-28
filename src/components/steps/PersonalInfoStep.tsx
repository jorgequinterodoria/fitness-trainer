import React from 'react';
import { User } from 'lucide-react';
import { UserData } from '../../types';

interface PersonalInfoStepProps {
  userData: UserData;
  onInputChange: (field: keyof UserData, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ userData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="mx-auto w-16 h-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
        <p className="text-gray-600">Hola Yelita, Cuéntame un poco sobre ti para personalizar tu plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
          <select 
            value={userData.gender} 
            onChange={(e) => onInputChange('gender', e.target.value)}
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
            onChange={(e) => onInputChange('age', e.target.value)}
            placeholder="Tu edad en años"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso actual (kg)</label>
          <input
            type="number"
            value={userData.currentWeight}
            onChange={(e) => onInputChange('currentWeight', e.target.value)}
            placeholder="Tu peso actual"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
          <input
            type="number"
            value={userData.height}
            onChange={(e) => onInputChange('height', e.target.value)}
            placeholder="Tu altura en centímetros"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso objetivo (kg)</label>
          <input
            type="number"
            value={userData.targetWeight}
            onChange={(e) => onInputChange('targetWeight', e.target.value)}
            placeholder="Tu peso deseado"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo disponible (meses)</label>
          <input
            type="number"
            value={userData.timeFrame}
            onChange={(e) => onInputChange('timeFrame', e.target.value)}
            placeholder="Ej: 4 meses"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;