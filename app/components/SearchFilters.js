export default function SearchFilters({ 
  onBodyPartFilter, 
  onTargetFilter, 
  selectedBodyPart, 
  selectedTarget, 
  onReset 
}) {
  const bodyParts = [
    'back', 'cardio', 'chest', 'lower arms', 'lower legs', 
    'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
  ];

  const targetMuscles = [
    'abductors', 'abs', 'adductors', 'biceps', 'calves', 
    'cardiovascular system', 'delts', 'forearms', 'glutes', 
    'hamstrings', 'lats', 'pectorals', 'quads', 'serratus anterior', 
    'spine', 'traps', 'triceps', 'upper back'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Exercises</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Body Part Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body Part
          </label>
          <select
            value={selectedBodyPart}
            onChange={(e) => onBodyPartFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Body Parts</option>
            {bodyParts.map((part) => (
              <option key={part} value={part} className="capitalize">
                {part}
              </option>
            ))}
          </select>
        </div>

        {/* Target Muscle Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Muscle
          </label>
          <select
            value={selectedTarget}
            onChange={(e) => onTargetFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Muscles</option>
            {targetMuscles.map((muscle) => (
              <option key={muscle} value={muscle} className="capitalize">
                {muscle}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}