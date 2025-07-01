import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    console.log("FOOTER Rendered" + (+1));
  });
  
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail className="h-5 w-5" />, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Tasks', href: '/tasks' },
        { label: 'Services', href: '/services' },
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/info' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Development', href: '/services#web' },
        { label: 'Mobile Apps', href: '/services#mobile' },
        { label: 'UI/UX Design', href: '/services#design' },
        { label: 'Consulting', href: '/services#consulting' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Portfolio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A personal portfolio showcasing my work as a software developer, along with task management
              and blogging capabilities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    > 
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
            Built with React, Firebase, and Vite
          </p>
        </div>
      </div>
    </footer>
  );
};