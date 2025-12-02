import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. Brand identity projects typically take 2-3 weeks, while web design projects can take 3-4 weeks.'
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes! All projects include revisions. The number depends on the package you choose, ranging from 2-5 revisions to unlimited revisions for enterprise projects.'
  },
  {
    question: 'What is included in a brand identity package?',
    answer: 'A complete brand identity package typically includes logo design, brand guidelines, color palette, typography selection, and usage examples. Additional elements like business cards, letterheads, or social media templates can be added based on your needs.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! While we\'re based in Nigeria, we work with clients worldwide. We\'re experienced in remote collaboration and can accommodate different time zones to ensure smooth communication throughout the project.'
  },
  {
    question: 'What is your design process?',
    answer: 'Our process typically involves discovery and research, strategy development, concept creation, refinement based on feedback, and final delivery. We keep you involved at every stage to ensure the final design aligns perfectly with your vision.'
  },
  {
    question: 'Can you help with existing brands that need a refresh?',
    answer: 'Absolutely! We specialize in brand refreshes and can help modernize your existing brand while maintaining its core identity. We\'ll work with you to understand what\'s working and what needs updating.'
  },
  {
    question: 'What file formats will I receive?',
    answer: 'You\'ll receive all necessary file formats including vector files (AI, EPS, SVG), high-resolution raster files (PNG, JPG), and web-optimized formats. We also provide brand guidelines and usage instructions.'
  },
  {
    question: 'How do I get started?',
    answer: 'Simply fill out the contact form above or reach out via email or phone. We\'ll schedule a free consultation to discuss your project, understand your needs, and provide a detailed proposal with timeline and pricing.'
  }
];

const FAQModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const button = document.getElementById('read-more-faq');
    if (button) {
      button.addEventListener('click', () => setIsOpen(true));
    }
    return () => {
      if (button) {
        button.removeEventListener('click', () => setIsOpen(true));
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-800 shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
                </h2>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-purple-500/50 transition-colors"
                    >
                      <h3 className="text-lg font-bold mb-2 text-white">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FAQModal;

