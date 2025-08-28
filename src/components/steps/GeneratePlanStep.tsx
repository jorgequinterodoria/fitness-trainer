import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import { UserData } from '../../types';

interface GeneratePlanStepProps {
  userData: UserData;
  isGenerating: boolean;
  onGeneratePlan: () => void;
}

const GeneratePlanStep: React.FC<GeneratePlanStepProps> = ({ 
  userData, 
  isGenerating, 
  onGeneratePlan 
}) => {
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
        onClick={onGeneratePlan}
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

export default GeneratePlanStep;