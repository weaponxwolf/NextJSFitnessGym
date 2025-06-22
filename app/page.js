// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// //       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// //           <li className="mb-2 tracking-[-.01em]">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
// //               app/page.js
// //             </code>
// //             .
// //           </li>
// //           <li className="tracking-[-.01em]">
// //             Save and see your changes instantly.
// //           </li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }

// // pages/index.js

// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to My Next.js App</h1>
//       <p>This is the home page.</p>
//     </div>
//   );
// }
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