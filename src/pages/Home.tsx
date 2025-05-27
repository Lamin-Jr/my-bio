import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, PenTool, Smartphone, ExternalLink } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BlogCard } from '../components/blog/BlogCard';
import { getRecentPosts } from '../services/blogService';
import { BlogPost } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const Home: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = await getRecentPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Services offered
  const services = [
    {
      title: 'Web Development',
      icon: <Code className="h-8 w-8 text-primary-600 mb-4" />,
      description: 'Creating responsive, performant websites and web applications using modern frameworks and tools.'
    },
    {
      title: 'Mobile Development',
      icon: <Smartphone className="h-8 w-8 text-primary-600 mb-4" />,
      description: 'Building cross-platform mobile applications that deliver exceptional user experiences.'
    },
    {
      title: 'UI/UX Design',
      icon: <PenTool className="h-8 w-8 text-primary-600 mb-4" />,
      description: 'Crafting intuitive, beautiful interfaces that engage users and solve real problems.'
    },
    {
      title: 'Consulting',
      icon: <Lightbulb className="h-8 w-8 text-primary-600 mb-4" />,
      description: 'Providing expert advice on technology choices, architecture, and development practices.'
    }
  ];

  return (
    <Layout
      title="Portfolio - Home"
      description="Welcome to my personal portfolio, showcasing my skills, services, and latest blog posts."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-600 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Software Developer & Designer
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Creating beautiful, functional digital experiences that solve real problems
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    My Services
                  </Button>
                </Link>
                <Link to="/info">
                  <Button variant="outline" size="lg">
                    About Me
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Developer working" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Services I Offer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Specialized expertise to help you build and grow your digital presence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full flex flex-col items-center text-center p-6">
                  {service.icon}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/services">
              <Button variant="default" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Blog Posts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Thoughts, insights, and updates from my journey as a developer
            </p>
          </motion.div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Loading latest posts...</p>
            </div>
          ) : (
            <>
              {recentPosts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {recentPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-6">No blog posts yet. Check back soon!</p>
                  {currentUser?.isAdmin && (
                    <Link to="/admin/blog/new">
                      <Button variant="outline">
                        Create Your First Post
                      </Button>
                    </Link>
                  )}
                </div>
              )}
              
              {recentPosts.length > 0 && (
                <motion.div 
                  className="text-center mt-12"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link to="/blog">
                    <Button variant="default" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      View All Blog Posts
                    </Button>
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your next project?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              I'm available for freelance projects and full-time opportunities. 
              Let's discuss how I can help bring your ideas to life.
            </p>
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center"
            >
              <Button size="lg" rightIcon={<ExternalLink className="h-4 w-4" />}>
                Get in Touch
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};