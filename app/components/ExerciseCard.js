import Image from 'next/image';
import { useState } from 'react';

export default function ExerciseCard({ exercise }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        {!imageError ? (
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🏋️</div>
              <div>Image not available</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 capitalize">
          {exercise.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-600 w-20">Target:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize">
              {exercise.target}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-600 w-20">Body Part:</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs capitalize">
              {exercise.bodyPart}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-600 w-20">Equipment:</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs capitalize">
              {exercise.equipment}
            </span>
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}