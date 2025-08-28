import React from 'react';
import { Calendar } from 'lucide-react';
import { Results } from '../../types';

interface TimelineProps {
  timeline: Results['timeline'];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
        <Calendar className="mr-2" />
        Cronograma de Progreso
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(timeline).map(([month, objective], index) => (
          <div key={month} className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <h5 className="font-medium text-purple-800 capitalize">{month.replace('month', 'Mes ')}</h5>
            <p className="text-sm text-purple-700 mt-2">{objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;