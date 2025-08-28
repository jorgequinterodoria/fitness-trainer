import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext
}) => {
  if (currentStep >= totalSteps) return null;

  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        ← Anterior
      </button>
      
      <button
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        Siguiente →
      </button>
    </div>
  );
};

export default NavigationButtons;