import React, {useEffect} from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Calendar, Github as GitHub, Mail, MapPin, Briefcase, Award, BookOpen, Code } from 'lucide-react';
import {RootState} from "src/store";
import {useAppSelector} from "@hooks/appHooks.ts";



export const Info: React.FC = () => {
  const userProfile = useAppSelector((state: RootState) => state.auth);

  const skills = [
    { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Firebase', 'MongoDB', 'PostgreSQL', 'REST APIs'] },
    { category: 'DevOps', items: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Netlify'] },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'UI/UX Design', 'Responsive Design'] },
  ];
  
  // Experience items
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      period: 'Jan 2021 - Present',
      description: 'Lead frontend development for enterprise applications. Implemented modern React architecture with TypeScript. Improved performance by 40% through code optimization.',
    },
    {
      company: 'WebCreative Agency',
      position: 'Full Stack Developer',
      period: 'Mar 2018 - Dec 2020',
      description: 'Developed custom web applications for clients across various industries. Worked with React, Node.js, and MongoDB. Led a team of 3 junior developers.',
    },
    {
      company: 'StartupLaunch',
      position: 'Frontend Developer',
      period: 'Jul 2016 - Feb 2018',
      description: 'Built responsive interfaces for early-stage startups. Implemented UI designs using HTML, CSS, and JavaScript. Worked in an agile environment with weekly sprints.',
    },
  ];
  
  // Education items
  const education = [
    {
      institution: 'University of Technology',
      degree: 'Master of Computer Science',
      period: '2014 - 2016',
      description: 'Specialized in Software Engineering with focus on web technologies.',
    },
    {
      institution: 'State University',
      degree: 'Bachelor of Science in Computer Science',
      period: '2010 - 2014',
      description: 'Graduated with honors. Participated in programming competitions.',
    },
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    console.log(userProfile, "User Profile");
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header Section */}
            <section className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                I'm a passionate software developer with over 7 years of experience creating beautiful, 
                functional web applications that solve real problems.
              </p>
            </section>
            
            {/* Profile Section */}
            <motion.section 
              className="mb-16"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-primary-600 text-white">
                      <div className="p-6 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4">
                          <img 
                            src="https://media.licdn.com/dms/image/v2/D4D03AQHKBaJz7PP1sQ/profile-displayphoto-shrink_200_200/B4DZQ7eICdGgAY-/0/1736164542841?e=1753920000&v=beta&t=UaeC0_1sZuJ0paP-w6V5EUvso2tJBvmKJ0_N0KRD-ow"
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-1">Lamin Jammeh</h2>
                        <p className="text-primary-100 mb-4">Senior Software Developer</p>
                        
                        <div className="w-full space-y-2 mt-4">
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            <a href="mailto:muhammadlaminjammeh@live.com" className="text-primary-100 hover:text-white">
                              muhammadlaminjammeh@live.com
                            </a>
                          </div>
                          <div className="flex items-center">
                            <GitHub className="w-5 h-5 mr-2" />
                            <a 
                              href="https://github.com/Lamin-Jr/"
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary-100 hover:text-white"
                            >
                              github.com/lamin-jr
                            </a>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span className="text-primary-100">Milano, IT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Bio
                      </h3>
                      <div className="text-gray-600 dark:text-gray-400 space-y-4">
                        <p>
                          I build scalable applications using Angular, React, and Java Spring Boot, with expertise in
                          deploying solutions through Kubernetes.
                        </p>
                        <p>
                          My background in accounting enhances my problem-solving skills, and I continuously upskill through certifications.
                        </p>
                        <p>
                          In my free time, I enjoy basketball and personal development projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.section>
            
            {/* Skills Section */}
            <motion.section 
              className="mb-16"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={item}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
              >
                <Code className="w-6 h-6 mr-2 text-primary-600" />
                Skills & Technologies
              </motion.h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={container}
              >
                {skills.map((skillSet, index) => (
                  <motion.div key={index} variants={item}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {skillSet.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skillSet.items.map((skill, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
            
            {/* Experience Section */}
            <motion.section 
              className="mb-16"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={item}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
              >
                <Briefcase className="w-6 h-6 mr-2 text-primary-600" />
                Work Experience
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={container}
              >
                {experiences.map((experience, index) => (
                  <motion.div key={index} variants={item}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {experience.position}
                            </h3>
                            <p className="text-primary-600 dark:text-primary-400">
                              {experience.company}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                            <Calendar className="w-4 h-4 mr-1" />
                            {experience.period}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {experience.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
            
            {/* Education Section */}
            <motion.section 
              className="mb-16"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={item}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2 text-primary-600" />
                Education
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={container}
              >
                {education.map((edu, index) => (
                  <motion.div key={index} variants={item}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {edu.degree}
                            </h3>
                            <p className="text-primary-600 dark:text-primary-400">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.period}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {edu.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
            
            {/* Certifications Section */}
            <motion.section 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={item}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
              >
                <Award className="w-6 h-6 mr-2 text-primary-600" />
                Certifications & Achievements
              </motion.h2>
              
              <motion.div variants={item}>
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-1 rounded mr-3 mt-0.5">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            AWS Certified Solutions Architect
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Amazon Web Services, 2022
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-1 rounded mr-3 mt-0.5">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Google Professional Cloud Developer
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Google Cloud, 2021
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-1 rounded mr-3 mt-0.5">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            1st Place, Regional Hackathon
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Innovative solution for healthcare accessibility, 2020
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
};