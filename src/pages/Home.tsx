import React from 'react';
import { Briefcase } from 'lucide-react';
import { Job } from '../types';
import { DUMMY_JOBS } from '../data';
import { Hero } from '../components/Hero';
import { SidebarFilters } from '../components/SidebarFilters';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import { SavedJobItem } from '../components/SavedJobItem';

interface HomePageProps {
  onJobClick: (job: Job) => void;
}

export const HomePage = ({ onJobClick }: HomePageProps) => {
  const [filters, setFilters] = React.useState({
    datePosted: 'Last 24 Hours',
    jobTypes: [] as string[],
    location: '',
    experienceLevel: 'Mid Level',
    salaryRange: [0, 150000] as [number, number],
    currency: 'Dollar',
    searchQuery: '',
    searchLocation: ''
  });

  const resetFilters = () => {
    setFilters({
      datePosted: 'Last 24 Hours',
      jobTypes: [],
      location: '',
      experienceLevel: 'Mid Level',
      salaryRange: [0, 150000],
      currency: 'Dollar',
      searchQuery: '',
      searchLocation: ''
    });
  };

  const filteredJobs = React.useMemo(() => {
    return DUMMY_JOBS.filter(job => {
      // Search Query (Title or Company)
      if (filters.searchQuery && 
          !job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
          !job.company.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      // Search Location (Top bar)
      if (filters.searchLocation && !job.location.toLowerCase().includes(filters.searchLocation.toLowerCase())) {
        return false;
      }
      // Filter Location (Sidebar)
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      // Job Type & Work Mode
      if (filters.jobTypes.length > 0) {
        const matchesType = filters.jobTypes.includes(job.type);
        const matchesWorkMode = filters.jobTypes.some(t => 
          ['Remote', 'Hybrid', 'On-Site'].includes(t) && job.location.toLowerCase().includes(t.toLowerCase())
        );
        
        if (!matchesType && !matchesWorkMode) {
          return false;
        }
      }
      // Experience Level
      if (job.experienceLevel !== filters.experienceLevel) {
        return false;
      }
      // Date Posted
      if (job.postedAt !== filters.datePosted) {
        return false;
      }
      // Salary Range
      const [filterMin, filterMax] = filters.salaryRange;
      if (job.salary < filterMin || job.salary > filterMax) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen pb-20 bg-[#F8F9FB]">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <SidebarFilters 
            filters={filters} 
            setFilters={setFilters} 
            resetFilters={resetFilters} 
          />

          {/* Main Content */}
          <main className="lg:col-span-6">
            <SearchBar 
              searchQuery={filters.searchQuery} 
              searchLocation={filters.searchLocation} 
              setFilters={setFilters} 
              filters={filters} 
            />

            {/* Job Listings */}
            <div className="space-y-2">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
                ))
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center">
                  <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </main>

          {/* Saved Jobs */}
          <aside className="lg:col-span-3">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Saved Jobs</h2>
              <div className="space-y-1">
                {DUMMY_JOBS.slice(0, 4).map(job => (
                  <SavedJobItem key={job.id} job={job} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
