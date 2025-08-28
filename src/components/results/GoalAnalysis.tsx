import React from 'react';
import { Target } from 'lucide-react';
import { Results } from '../../types';

interface GoalAnalysisProps {
  goalAnalysis: Results['goalAnalysis'];
}

const GoalAnalysis: React.FC<GoalAnalysisProps> = ({ goalAnalysis }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
        <Target className="mr-2" />
        Análisis de tu Objetivo
      </h3>
      <div className="space-y-3">
        <p className="text-blue-700">{goalAnalysis.currentGoal}</p>
        {!goalAnalysis.isRealistic && goalAnalysis.recommendation && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-medium">Recomendación:</p>
            <p className="text-yellow-700">{goalAnalysis.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalAnalysis;