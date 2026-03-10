import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Job, Page } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { JobDetailsPage } from './pages/JobDetails';
import { LoginPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { Footer } from './components/Footer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [user, setUser] = React.useState<any>(null);
  const [appliedJobs, setAppliedJobs] = React.useState<Job[]>([]);
  const [showContactSuccess, setShowContactSuccess] = React.useState(false);

  const contactFormik = useFormik({
    initialValues: { fullName: '', email: '', message: '' },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Please enter a valid email').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', values);
        setShowContactSuccess(true);
        resetForm();
        setTimeout(() => setShowContactSuccess(false), 3000);
      } catch (error) {
        console.error('Contact submit error', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedJob(null);
    window.scrollTo(0, 0);
  };

  const handleApply = (job: Job) => {
    if (!appliedJobs.find(j => j.id === job.id)) {
      setAppliedJobs([...appliedJobs, job]);
    }
    setCurrentPage('applications');
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  // Auth pages are rendered without the main layout
  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage onNavigate={handleNavigate} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onNavigate={handleNavigate}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedJob?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentPage === 'home' && (
              <HomePage onJobClick={handleJobClick} />
            )}

            {currentPage === 'details' && selectedJob && (
              <JobDetailsPage
                job={selectedJob}
                onBack={() => handleNavigate('home')}
                onApply={() => handleApply(selectedJob)}
              />
            )}

            {currentPage === 'applications' && (
              <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">My Applications</h1>
                {appliedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appliedJobs.map(job => (
                      <div key={job.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-contain" referrerPolicy="no-referrer" />
                          <div>
                            <h3 className="font-bold text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-500">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Applied</span>
                          <span className="text-xs text-gray-400">Just now</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">You haven't applied to any jobs yet.</p>
                    <button
                      onClick={() => handleNavigate('home')}
                      className="mt-4 text-blue-600 font-bold hover:underline"
                    >
                      Browse jobs
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentPage === 'companies' && (
              <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Top Companies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'SpaceX'].map(company => (
                    <div key={company} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-400">
                        {company[0]}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{company}</h3>
                      <p className="text-sm text-gray-500 mb-4">Technology • 10k+ Employees</p>
                      <button className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                        View Jobs
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage === 'contact' && (
              <div className="max-w-3xl mx-auto px-4 py-12 relative">
                <AnimatePresence>
                  {showContactSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-3 rounded-full shadow-lg font-bold z-50"
                    >
                      Message successfully sent!
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                  <p className="text-gray-500 mb-8 text-lg">Have questions? We're here to help you find your dream job.</p>
                  <form className="space-y-6" onSubmit={contactFormik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input name="fullName" value={contactFormik.values.fullName} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur} type="text" className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-colors ${contactFormik.touched.fullName && contactFormik.errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`} placeholder="John Doe" />
                        {contactFormik.touched.fullName && contactFormik.errors.fullName && <p className="text-red-500 text-xs font-semibold mt-1">{contactFormik.errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input name="email" value={contactFormik.values.email} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur} type="email" className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-colors ${contactFormik.touched.email && contactFormik.errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`} placeholder="john@example.com" />
                        {contactFormik.touched.email && contactFormik.errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{contactFormik.errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                      <textarea name="message" value={contactFormik.values.message} onChange={contactFormik.handleChange} onBlur={contactFormik.handleBlur} rows={4} className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-colors ${contactFormik.touched.message && contactFormik.errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`} placeholder="How can we help you?"></textarea>
                      {contactFormik.touched.message && contactFormik.errors.message && <p className="text-red-500 text-xs font-semibold mt-1">{contactFormik.errors.message}</p>}
                    </div>
                    <button type="submit" disabled={contactFormik.isSubmitting} className={`w-full py-4 bg-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 ${contactFormik.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {contactFormik.isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
