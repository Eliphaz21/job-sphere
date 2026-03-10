import { Job } from './types';

export const DUMMY_JOBS: Job[] = [
  {
    id: '0',
    title: 'Software Engineer',
    company: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    location: 'San Francisco, USA',
    type: 'Full-time',
    salary: 95000,
    currency: 'USD',
    description: 'Develop and maintain web applications.',
    isBookMarked: true,
    experienceLevel: 'Mid Level',
    postedAt: 'Last 24 Hours',
    rating: 4.9,
    applicants: 120,
    responsibilities: [
      'Develop and maintain high-quality web applications using modern frameworks.',
      'Collaborate with cross-functional teams to define, design, and ship new features.',
      'Write clean, maintainable, and efficient code.',
      'Participate in code reviews and provide constructive feedback.',
      'Troubleshoot and debug production issues.'
    ]
  },
];
