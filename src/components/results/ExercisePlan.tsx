import React from 'react';
import { Activity } from 'lucide-react';
import { Results } from '../../types';

interface ExercisePlanProps {
  exercisePlan: Results['exercisePlan'];
}

const ExercisePlan: React.FC<ExercisePlanProps> = ({ exercisePlan }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <Activity className="mr-2" />
        Plan de Ejercicios
      </h3>
      
      <div className="space-y-4">
        {exercisePlan.weeklySchedule.map((day, index) => (
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
        <h4 className="font-semibold text-green-800 mb-2">Consejos de entrenamiento:</h4>
        <ul className="space-y-1">
          {exercisePlan.tips.map((tip, index) => (
            <li key={index} className="text-green-700 text-sm flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExercisePlan;