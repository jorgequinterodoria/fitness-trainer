import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Results } from '../../types';
import GoalAnalysis from './GoalAnalysis';
import NutritionPlan from './NutritionPlan';
import ExercisePlan from './ExercisePlan';
import Timeline from './Timeline';

interface ResultsViewProps {
  results: Results;
  onModifyInfo: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onModifyInfo }) => {
  if (results.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
        <p className="text-red-600">{results.error}</p>
        <button
          onClick={onModifyInfo}
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

      <GoalAnalysis goalAnalysis={results.goalAnalysis} />
      <NutritionPlan nutritionPlan={results.nutritionPlan} />
      <ExercisePlan exercisePlan={results.exercisePlan} />
      <Timeline timeline={results.timeline} />

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onModifyInfo}
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

export default ResultsView;