import { useState, useEffect } from "react";
import { UserData, Results } from "../types";
import { generatePersonalizedPlan } from "../services/planGenerator";
import ProgressIndicator from "./ProgressIndicator";
import NavigationButtons from "./NavigationButtons";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import DailyRoutineStep from "./steps/DailyRoutineStep";
import NutritionStep from "./steps/NutritionStep";
import GeneratePlanStep from "./steps/GeneratePlanStep";
import ResultsView from "./results/ResultsView";

// Clave para almacenar los datos en localStorage
const USER_DATA_KEY = 'fitness_trainer_user_data';

const FitnessAgent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState<UserData>(() => {
        // Intentar cargar datos del usuario desde localStorage al iniciar
        const savedData = localStorage.getItem(USER_DATA_KEY);
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error("Error al cargar datos guardados:", error);
            }
        }
        
        // Valores por defecto si no hay datos guardados
        return {
            // Datos básicos
            gender: "",
            age: "",
            currentWeight: "",
            targetWeight: "",
            height: "",
            timeFrame: "",

            // Rutina diaria
            dailyRoutine: "",
            availableTime: "",
            activityLevel: "",

            // Alimentación
            foodsYes: "",
            foodsRecommended: "",
            foodsNo: "",

            // Preferencias de ejercicio
            exercisePreference: "",
            fitnessLevel: "",
        };
    });

    const [results, setResults] = useState<Results | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Guardar datos del usuario en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }, [userData]);

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleGeneratePlan = async () => {
        setIsGenerating(true);

        try {
            const planResults = await generatePersonalizedPlan(userData);
            setResults(planResults);
        } catch (error) {
            console.error("Error generando el plan:", error);
            setResults({
                error:
                    "Hubo un error generando tu plan personalizado. Por favor, intenta nuevamente.",
            } as Results);
        } finally {
            setIsGenerating(false);
        }
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInfoStep
                        userData={userData}
                        onInputChange={handleInputChange}
                    />
                );
            case 2:
                return (
                    <DailyRoutineStep
                        userData={userData}
                        onInputChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <NutritionStep
                        userData={userData}
                        onInputChange={handleInputChange}
                    />
                );
            case 4:
                return (
                    <GeneratePlanStep
                        userData={userData}
                        isGenerating={isGenerating}
                        onGeneratePlan={handleGeneratePlan}
                    />
                );
            default:
                return null;
        }
    };
    if (results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
                <div className="max-w-4xl mx-auto">
                    <ResultsView
                        results={results}
                        onModifyInfo={() => setResults(null)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🏋️ Agente de Fitness y Nutrición
                    </h1>
                    <p className="text-xl text-gray-600">
                        Tu entrenador personal y nutricionista con IA
                    </p>
                </div>

                <ProgressIndicator currentStep={currentStep} totalSteps={4} />

                {/* Main content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    {renderCurrentStep()}
                </div>

                <NavigationButtons
                    currentStep={currentStep}
                    totalSteps={4}
                    onPrevious={prevStep}
                    onNext={nextStep}
                />
            </div>
        </div>
    );
};

export default FitnessAgent;
