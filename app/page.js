'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ExerciseCard from './components/ExerciseCard';
import SearchFilters from './components/SearchFilters';

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  // RapidAPI configuration
  const rapidApiKey = 'd75a09ed90mshdd53e2ad02a1891p1f4660jsn079cb7616fbd';
  const rapidApiHost = 'exercisedb.p.rapidapi.com';

  const fetchExercises = async (endpoint = 'exercises', limit = 12) => {
    setLoading(true);
    try {
      const response = await fetch(`https://${rapidApiHost}/${endpoint}?limit=10&offset=0`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiHost,
        },
      });

      console.log(response);
      
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const searchExercises = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://${rapidApiHost}/exercises/name/${searchTerm.toLowerCase()}?limit=10`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '988f8b011fmshe916d9527c05b3fp176d33jsn15d3078aa8a4',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      });
      
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error searching exercises:', error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByBodyPart = async (bodyPart) => {
    if (!bodyPart) return fetchExercises();
    
    setSelectedBodyPart(bodyPart);
    await fetchExercises(`exercises/bodyPart/${bodyPart}`);
  };

  const filterByTarget = async (target) => {
    if (!target) return fetchExercises();
    
    setSelectedTarget(target);
    await fetchExercises(`exercises/target/${target}`);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <>
      <Head>
        <title>FitGym - Your Ultimate Fitness Companion</title>
        <meta name="description" content="Discover thousands of exercises to build your perfect workout routine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <HeroBanner 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={searchExercises}
        />
        
        <main className="container mx-auto px-4 py-8">
          <SearchFilters 
            onBodyPartFilter={filterByBodyPart}
            onTargetFilter={filterByTarget}
            selectedBodyPart={selectedBodyPart}
            selectedTarget={selectedTarget}
            onReset={() => {
              setSelectedBodyPart('');
              setSelectedTarget('');
              fetchExercises();
            }}
          />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {searchTerm ? `Results for "${searchTerm}"` : 'Popular Exercises'}
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : exercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No exercises found</div>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}