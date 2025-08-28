import React from 'react';
import { Clock } from 'lucide-react';
import { UserData } from '../../types';

interface DailyRoutineStepProps {
  userData: UserData;
  onInputChange: (field: keyof UserData, value: string) => void;
}

const DailyRoutineStep: React.FC<DailyRoutineStepProps> = ({ userData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('dailyRoutine', e.target.value)}
            placeholder="Ej: Me levanto a las 7am, trabajo de oficina de 9-6pm, llego a casa a las 7pm..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Cuánto tiempo tienes disponible para ejercitarte?</label>
          <select
            value={userData.availableTime}
            onChange={(e) => onInputChange('availableTime', e.target.value)}
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
            onChange={(e) => onInputChange('activityLevel', e.target.value)}
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
            onChange={(e) => onInputChange('fitnessLevel', e.target.value)}
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
            onChange={(e) => onInputChange('exercisePreference', e.target.value)}
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
};

export default DailyRoutineStep;