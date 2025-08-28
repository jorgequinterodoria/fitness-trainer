import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const getStepName = (step: number) => {
    switch (step) {
      case 1: return 'Información Personal';
      case 2: return 'Rutina Diaria';
      case 3: return 'Alimentación';
      case 4: return 'Generar Plan';
      default: return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
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
            {step < totalSteps && (
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
          Paso {currentStep} de {totalSteps}: {getStepName(currentStep)}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;