import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Users, 
  Target, 
  BarChart3,
  Star,
  Trophy,
  Tag,
  Medal,
  Gem,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface SkillBarProps {
  skill: string;
  percentage: number;
  color: string;
}

function SkillBar({ skill, percentage, color }: SkillBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, percentage]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-700">{skill}</span>
        <span className={`font-semibold ${color}`}>{percentage}%</span>
      </div>
      <Progress 
        value={animatedPercentage} 
        className="h-3"
        data-testid={`progress-${skill.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  );
}

interface CounterProps {
  target: number;
  label: string;
}

function Counter({ target, label }: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const increment = target / 30;
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= target) {
            clearInterval(timer);
            return target;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-3xl font-bold mb-2" data-testid={`counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {Math.floor(count)}
      </h3>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 250]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md z-50 shadow-lg border-b border-gold-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-playfair font-bold text-gradient">
              Amrutha M
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-link text-royal-blue-700 hover:text-gold-500 transition-colors font-medium"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-royal-blue-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md mt-4 rounded-lg shadow-lg">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-royal-blue-700 hover:text-gold-500 transition-colors font-medium"
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          style={{ y: heroY }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-playfair font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                data-testid="hero-name"
              >
                Amrutha M
              </motion.h1>
              
              <motion.h2 
                className="text-2xl lg:text-3xl font-montserrat font-medium mb-6 text-gold-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                data-testid="hero-title"
              >
                Associate Sales Executive
              </motion.h2>
              
              <motion.p 
                className="text-xl lg:text-2xl mb-8 font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                data-testid="hero-description"
              >
                Passionate about sales, customer engagement, and building strong client relationships in the luxury jewellery industry
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none">
                  <Gem className="w-4 h-4 mr-2" />
                  Bhima Jewellers
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none">
                  <MapPin className="w-4 h-4 mr-2" />
                  HBR Layout, Bengaluru
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  B.Com Graduate
                </Badge>
              </motion.div>
              
              <motion.button
                className="inline-flex items-center bg-gold-500 hover:bg-gold-600 text-royal-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                onClick={() => scrollToSection('about')}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="cta-discover-journey"
              >
                Discover My Journey
                <ChevronDown className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-gold-400 to-rose-gold-500 p-2"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img 
                      src="/@assets/image_1755886630861.png" 
                      alt="Amrutha M"
                      className="w-full h-full object-cover rounded-full"
                      data-testid="hero-profile-image"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gold-400 rounded-full"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-rose-gold-400 rounded-full"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-royal-blue-800 mb-6" data-testid="about-title">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-80 bg-gradient-to-br from-royal-blue-100 to-gold-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/@assets/image_1755886630861.png" 
                  alt="Amrutha M - Professional Photo"
                  className="w-full h-full object-cover rounded-xl"
                  data-testid="about-profile-image"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 leading-relaxed" data-testid="about-description-1">
                I am a dedicated commerce graduate with hands-on experience in customer engagement and sales excellence. Currently serving as an Associate Sales Executive at Bhima Jewellers, I specialize in understanding customer preferences, presenting luxury jewellery collections, and delivering personalized buying experiences.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed" data-testid="about-description-2">
                My background in Corporate Social Responsibility through my internship at PACS Bellare, combined with professional development through the Mahindra Pride Employability Skills Programme, has strengthened my communication, persuasion, and client relationship management abilities.
              </p>
              
              <Card className="bg-gradient-to-r from-royal-blue-50 to-gold-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-royal-blue-800 mb-4">Core Strengths</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Users className="text-gold-500 mr-3 w-5 h-5" />
                      <span className="text-gray-700">Customer Engagement</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="text-gold-500 mr-3 w-5 h-5" />
                      <span className="text-gray-700">Relationship Building</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="text-gold-500 mr-3 w-5 h-5" />
                      <span className="text-gray-700">Sales Strategy</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-gold-500 mr-3 w-5 h-5" />
                      <span className="text-gray-700">Team Collaboration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="bg-royal-blue-100 text-royal-blue-800">
                  Age: 21 (DOB: 06/05/2003)
                </Badge>
                <Badge variant="secondary" className="bg-gold-100 text-gold-800">
                  Female
                </Badge>
                <Badge variant="secondary" className="bg-rose-gold-100 text-rose-gold-800">
                  Indian
                </Badge>
              </div>
              
              <Card className="bg-gradient-to-r from-gold-100 to-rose-gold-100">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-royal-blue-800 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-3">
                    {['English', 'Kannada', 'Tamil', 'Malayalam'].map((lang) => (
                      <Badge key={lang} variant="secondary" className="bg-white shadow-sm">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gradient-to-br from-royal-blue-50 to-gold-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-royal-blue-800 mb-6" data-testid="education-title">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My academic journey building the foundation for excellence in commerce and business
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-400 to-royal-blue-400"></div>
            
            <div className="space-y-16">
              {/* B.Com */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-gold-400 to-gold-600 w-6 h-6 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:text-right lg:pr-12">
                    <Card className="shadow-lg border border-gold-200 hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <Badge className="bg-gold-100 text-gold-800 mb-4">2024</Badge>
                        <h3 className="text-2xl font-playfair font-bold text-royal-blue-800 mt-4 mb-2" data-testid="education-bcom-title">
                          Bachelor of Commerce
                        </h3>
                        <p className="text-gray-600 font-medium mb-2" data-testid="education-bcom-institution">
                          Nehru Memorial College Sullia
                        </p>
                        <p className="text-gold-600 font-semibold" data-testid="education-bcom-grade">
                          CGPA: 6.7
                        </p>
                        <p className="text-gray-700 mt-3">
                          Comprehensive study in commerce, accounting, business management, and financial analysis
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="lg:pl-12">
                    <div className="w-full h-64 bg-gradient-to-br from-gold-100 to-royal-blue-100 rounded-xl flex items-center justify-center">
                      <GraduationCap size={80} className="text-royal-blue-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* PU */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-royal-blue-400 to-royal-blue-600 w-6 h-6 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:order-2 lg:pl-12">
                    <Card className="shadow-lg border border-royal-blue-200 hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <Badge className="bg-royal-blue-100 text-royal-blue-800 mb-4">2021</Badge>
                        <h3 className="text-2xl font-playfair font-bold text-royal-blue-800 mt-4 mb-2" data-testid="education-pu-title">
                          Pre-University
                        </h3>
                        <p className="text-gray-600 font-medium mb-2" data-testid="education-pu-institution">
                          Sharada Women's PU College Sullia
                        </p>
                        <p className="text-royal-blue-600 font-semibold" data-testid="education-pu-grade">
                          Percentage: 59.83%
                        </p>
                        <p className="text-gray-700 mt-3">
                          Foundation in commerce stream with focus on business studies and economics
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="lg:order-1 lg:pr-12">
                    <div className="w-full h-64 bg-gradient-to-br from-royal-blue-100 to-gold-100 rounded-xl flex items-center justify-center">
                      <GraduationCap size={80} className="text-gold-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* SSLC */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 w-6 h-6 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:text-right lg:pr-12">
                    <Card className="shadow-lg border border-rose-gold-200 hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <Badge className="bg-rose-gold-100 text-rose-gold-800 mb-4">2019</Badge>
                        <h3 className="text-2xl font-playfair font-bold text-royal-blue-800 mt-4 mb-2" data-testid="education-sslc-title">
                          SSLC
                        </h3>
                        <p className="text-gray-600 font-medium mb-2" data-testid="education-sslc-institution">
                          Sharada Women's High School Sullia
                        </p>
                        <p className="text-rose-gold-600 font-semibold" data-testid="education-sslc-grade">
                          Percentage: 65%
                        </p>
                        <p className="text-gray-700 mt-3">
                          Strong academic foundation with well-rounded education in all core subjects
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="lg:pl-12">
                    <div className="w-full h-64 bg-gradient-to-br from-rose-gold-100 to-royal-blue-100 rounded-xl flex items-center justify-center">
                      <GraduationCap size={80} className="text-rose-gold-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-royal-blue-800 mb-6" data-testid="experience-title">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional journey in sales excellence and client relationship management
            </p>
          </motion.div>
          
          {/* Current Role */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gold-50 to-royal-blue-50 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-royal-blue-800 mb-2" data-testid="current-role-title">
                      Associate Sales Executive
                    </h3>
                    <p className="text-xl text-gold-600 font-semibold" data-testid="current-role-company">
                      Bhima Jewellers Private Limited
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      HBR Layout, Bengaluru
                    </p>
                  </div>
                  <Badge className="bg-white shadow-md text-royal-blue-800 text-lg px-6 py-3">
                    Jan 2025 - Aug 2025
                  </Badge>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-6" data-testid="current-role-description">
                      As an Associate Sales Executive, I engage with customers to understand their preferences, present jewellery collections, and deliver personalized buying experiences. I support the sales team in achieving daily and monthly targets through client acquisition, relationship building, and accurate sales record management.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-royal-blue-800 mb-4">Key Responsibilities</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Gem className="text-gold-500 mt-1 mr-3 w-5 h-5" />
                        <span className="text-gray-700">Present luxury jewellery collections to discerning customers</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="text-gold-500 mt-1 mr-3 w-5 h-5" />
                        <span className="text-gray-700">Build and maintain strong client relationships</span>
                      </div>
                      <div className="flex items-start">
                        <Target className="text-gold-500 mt-1 mr-3 w-5 h-5" />
                        <span className="text-gray-700">Achieve daily and monthly sales targets</span>
                      </div>
                      <div className="flex items-start">
                        <BarChart3 className="text-gold-500 mt-1 mr-3 w-5 h-5" />
                        <span className="text-gray-700">Maintain accurate sales records and customer data</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-full h-48 bg-gradient-to-br from-gold-100 to-royal-blue-100 rounded-xl flex items-center justify-center">
                      <Gem size={80} className="text-gold-600" />
                    </div>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-royal-blue-800 mb-3">Skills Developed</h5>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-gold-100 text-gold-800">Customer Service</Badge>
                          <Badge className="bg-royal-blue-100 text-royal-blue-800">Sales Strategy</Badge>
                          <Badge className="bg-rose-gold-100 text-rose-gold-800">Persuasion</Badge>
                          <Badge className="bg-gold-100 text-gold-800">Product Knowledge</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Internship Experience */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-royal-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-playfair font-bold text-royal-blue-800" data-testid="internship-csr-title">
                      CSR Internship
                    </h3>
                    <Badge className="bg-royal-blue-100 text-royal-blue-800">Feb - Mar 2024</Badge>
                  </div>
                  <p className="text-gray-600 font-medium mb-4" data-testid="internship-csr-company">
                    Bellare Primary Agricultural Credit Co-operative Society Ltd
                  </p>
                  
                  <div className="w-full h-48 bg-gradient-to-br from-royal-blue-100 to-gold-100 rounded-lg mb-4 flex items-center justify-center">
                    <Award size={60} className="text-royal-blue-600" />
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Star className="text-royal-blue-500 mt-1 mr-2 w-4 h-4" />
                      30-day internship focusing on Corporate Social Responsibility
                    </li>
                    <li className="flex items-start">
                      <Star className="text-royal-blue-500 mt-1 mr-2 w-4 h-4" />
                      Project: "Corporate Social Responsibility in PACS Ltd Bellare"
                    </li>
                    <li className="flex items-start">
                      <Star className="text-royal-blue-500 mt-1 mr-2 w-4 h-4" />
                      Practical implementation of CSR initiatives
                    </li>
                    <li className="flex items-start">
                      <Star className="text-royal-blue-500 mt-1 mr-2 w-4 h-4" />
                      Comprehensive project report accepted by institution
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gold-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-playfair font-bold text-royal-blue-800" data-testid="training-employability-title">
                      Employability Skills Programme
                    </h3>
                    <Badge className="bg-gold-100 text-gold-800">Sep 2023</Badge>
                  </div>
                  <p className="text-gray-600 font-medium mb-4" data-testid="training-employability-provider">
                    Mahindra Pride Classroom & Naandi Foundation
                  </p>
                  
                  <div className="w-full h-48 bg-gradient-to-br from-gold-100 to-royal-blue-100 rounded-lg mb-4 flex items-center justify-center">
                    <Tag size={60} className="text-gold-600" />
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Star className="text-gold-500 mt-1 mr-2 w-4 h-4" />
                      5-day intensive employability skills programme
                    </li>
                    <li className="flex items-start">
                      <Star className="text-gold-500 mt-1 mr-2 w-4 h-4" />
                      Enhanced communication and teamwork skills
                    </li>
                    <li className="flex items-start">
                      <Star className="text-gold-500 mt-1 mr-2 w-4 h-4" />
                      Professional etiquette and problem-solving training
                    </li>
                    <li className="flex items-start">
                      <Star className="text-gold-500 mt-1 mr-2 w-4 h-4" />
                      Certified in Fundamentals of English Grammar
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gradient-to-br from-gold-50 via-white to-royal-blue-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-royal-blue-800 mb-6" data-testid="achievements-title">
              Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional milestones and recognitions showcasing excellence in sales and leadership
            </p>
          </motion.div>
          
          {/* Achievement Categories */}
          <motion.div 
            className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={scaleIn}>
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-royal-blue-800 mb-2">Sales Excellence</h3>
              <p className="text-gray-600 text-sm">Outstanding performance in customer engagement and sales targets</p>
            </motion.div>
            
            <motion.div className="text-center" variants={scaleIn}>
              <div className="bg-gradient-to-br from-royal-blue-400 to-royal-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-royal-blue-800 mb-2">Certifications</h3>
              <p className="text-gray-600 text-sm">Professional development and skill enhancement programs</p>
            </motion.div>
            
            <motion.div className="text-center" variants={scaleIn}>
              <div className="bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-royal-blue-800 mb-2">Leadership</h3>
              <p className="text-gray-600 text-sm">Event organization and team management experiences</p>
            </motion.div>
            
            <motion.div className="text-center" variants={scaleIn}>
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-royal-blue-800 mb-2">Recognition</h3>
              <p className="text-gray-600 text-sm">Academic and extracurricular achievements</p>
            </motion.div>
          </motion.div>
          
          {/* Achievement Gallery */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Diamond Cross Sale Achievement",
                description: "Achieved 0.26 carats sales conversion at PL Counter contributing to total 0.54 carats for HBR branch on 01-06-2025",
                year: "June 2025",
                color: "gold",
                icon: Trophy,
                image: "WhatsApp Image 2025-08-22 at 22.24.24_ac5c684c_1755886705703.jpg"
              },
              {
                title: "Customer Excellence Recognition",
                description: "Customer specifically appreciated exceptional service, patience, and product knowledge creating memorable shopping experience",
                year: "2025",
                color: "royal-blue",
                icon: Star,
                image: "WhatsApp Image 2025-08-22 at 23.49.40_02dedc73_1755887308211.jpg"
              },
              {
                title: "₹15+ Lakh Sales Achievement",
                description: "Congratulatory recognition from Deputy Cluster Head for generating exceptional sales bill over ₹15 lakh",
                year: "2025",
                color: "green",
                icon: Award,
                image: "WhatsApp Image 2025-08-22 at 23.51.52_c86105ac_1755887274230.jpg"
              },
              {
                title: "Top-1 Gold Sales Performance",
                description: "Secured Top-1 position in Gold Sales (50 grams and above) for HBR Branch, showcasing excellence in luxury sales",
                year: "July 2025",
                color: "rose-gold",
                icon: Medal,
                image: "WhatsApp Image 2025-08-23 at 00.01.31_6c879c9c_1755887515388.jpg"
              }
            ].map((achievement, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`/@assets/${achievement.image}`} 
                      alt={achievement.title}
                      className="w-full h-full object-contain"
                      data-testid={`achievement-${index}-image`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-royal-blue-800 mb-2" data-testid={`achievement-${index}-title`}>
                      {achievement.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3" data-testid={`achievement-${index}-description`}>
                      {achievement.description}
                    </p>
                    <Badge className={`bg-${achievement.color}-100 text-${achievement.color}-800`}>
                      {achievement.year}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Achievement Stats */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-royal-blue-600 to-gold-600 rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <Counter target={6} label="Professional Achievements" />
              <Counter target={4} label="Certifications Earned" />
              <Counter target={3} label="Training Programs" />
              <Counter target={8} label="Months Experience" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-royal-blue-800 mb-6" data-testid="skills-title">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive skill set combining sales excellence with technical proficiency
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Professional Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair font-bold text-royal-blue-800 mb-8 flex items-center">
                <Users className="text-gold-500 mr-3" />
                Professional Skills
              </h3>
              
              <div className="space-y-6">
                <SkillBar skill="Customer Engagement" percentage={95} color="text-gold-600" />
                <SkillBar skill="Sales Strategy" percentage={90} color="text-royal-blue-600" />
                <SkillBar skill="Communication" percentage={92} color="text-green-600" />
                <SkillBar skill="Team Collaboration" percentage={88} color="text-purple-600" />
                <SkillBar skill="Problem Solving" percentage={85} color="text-rose-gold-600" />
                <SkillBar skill="Leadership" percentage={82} color="text-orange-600" />
              </div>
            </motion.div>
            
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-playfair font-bold text-royal-blue-800 mb-8 flex items-center">
                <Briefcase className="text-gold-500 mr-3" />
                Technical Skills
              </h3>
              
              {/* Microsoft Office Suite */}
              <Card className="bg-gradient-to-br from-royal-blue-50 to-gold-50 mb-6">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-royal-blue-800 mb-4 flex items-center">
                    <Briefcase className="text-blue-600 mr-3" />
                    Microsoft Office Suite
                  </h4>
                  <div className="space-y-4">
                    <SkillBar skill="MS Word" percentage={90} color="text-blue-600" />
                    <SkillBar skill="MS Excel" percentage={85} color="text-green-600" />
                    <SkillBar skill="MS PowerPoint" percentage={88} color="text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Accounting Software */}
              <Card className="bg-gradient-to-br from-gold-50 to-royal-blue-50 mb-6">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-royal-blue-800 mb-4 flex items-center">
                    <BarChart3 className="text-gold-600 mr-3" />
                    Accounting Software
                  </h4>
                  <SkillBar skill="Tally ERP 9" percentage={80} color="text-gold-600" />
                  <p className="text-sm text-gray-600 mt-3">
                    Proficient in invoicing, budgeting, GST compliance, accounts management, financial statements, inventory tracking, and payroll
                  </p>
                </CardContent>
              </Card>
              
              {/* Core Competencies */}
              <Card className="border-2 border-gray-100">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-royal-blue-800 mb-4 flex items-center">
                    <Star className="text-gold-500 mr-3" />
                    Core Competencies
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-gold-100 to-gold-200 px-3 py-2 rounded-lg text-center">
                      <Award className="text-gold-600 mb-1 mx-auto" size={20} />
                      <p className="text-sm font-medium text-gold-800">Report Writing</p>
                    </div>
                    <div className="bg-gradient-to-r from-royal-blue-100 to-royal-blue-200 px-3 py-2 rounded-lg text-center">
                      <BarChart3 className="text-royal-blue-600 mb-1 mx-auto" size={20} />
                      <p className="text-sm font-medium text-royal-blue-800">Data Analysis</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-green-200 px-3 py-2 rounded-lg text-center">
                      <Trophy className="text-green-600 mb-1 mx-auto" size={20} />
                      <p className="text-sm font-medium text-green-800">Presentations</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-3 py-2 rounded-lg text-center">
                      <Target className="text-purple-600 mb-1 mx-auto" size={20} />
                      <p className="text-sm font-medium text-purple-800">Financial Analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-royal-blue-800 to-royal-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-3xl font-playfair font-bold mb-4 text-gradient">Amrutha M</h3>
            <p className="text-xl mb-6 text-royal-blue-200">Associate Sales Executive</p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex items-center">
                <Mail className="text-gold-400 mr-3" size={20} />
                <span className="text-royal-blue-200" data-testid="footer-email">ammu54640@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-gold-400 mr-3" size={20} />
                <span className="text-royal-blue-200" data-testid="footer-phone">+91-9019849464</span>
              </div>
            </div>
            <div className="border-t border-royal-blue-700 pt-6">
              <p className="text-royal-blue-300">&copy; 2025 Amrutha M. Professional Portfolio - Designed for Excellence in Sales</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
