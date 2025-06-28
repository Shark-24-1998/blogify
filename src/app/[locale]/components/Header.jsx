'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LanguageSelect from './LanguageSelect';
import { Menu, X, Home, Info, Mail, Edit, BookOpen, List, User } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import AuthMenu from './auth/AuthMenu';
import { useAuthModal } from './auth/AuthModalContext';
import { useAuth } from './auth/AuthProvider';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenuContent, setShowMobileMenuContent] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const router = useRouter();
  const { openSignIn, openSignUp } = useAuthModal();
  const { user, logOut } = useAuth();
  const t = useTranslations("header");
  const { locale } = useParams();
  const menuContentRef = useRef(null);

  // Update scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setScrolled(true);
        setShowMobileMenuContent(false);
      } else {
        setScrolled(false);
        setShowMobileMenuContent(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll menu content to top when menu opens
  useEffect(() => {
    if (menuOpen) {
      setPrevScrollY(window.scrollY);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (menuContentRef.current) {
        menuContentRef.current.scrollTop = 0;
      }
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      window.scrollTo({ top: prevScrollY, behavior: 'instant' });
    }
  }, [menuOpen, prevScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.mobile-menu-container')) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpen]);

  // Auth handlers for mobile
  const handleMobileSignIn = () => {
    openSignIn();
    setTimeout(() => setMenuOpen(false), 200);
  };
  const handleMobileSignUp = () => {
    openSignUp();
    setTimeout(() => setMenuOpen(false), 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition hover:text-blue-600"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Blogify</span>
          </Link>

          {/* Mobile Menu Toggle and Language Selector (mobile only, right side) */}
          <div className="flex items-center md:hidden gap-2">
            <LanguageSelect />
            <button
              className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-menu-container"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink href="/" icon={<Home size={16} />} text={t('home')} />
            <NavLink href="/about" icon={<Info size={16} />} text={t('about')} />
            <NavLink href="/contact" icon={<Mail size={16} />} text={t('contact')} />
            <NavLink href="/create-post" icon={<Edit size={16} />} text={t('create-post')} />
            <NavLink
              href={`/${locale}/allposts`}
              icon={<List size={16} />}
              text="All Posts"
            />
            <NavLink href="/blog" icon={<BookOpen size={16} />} text={t('blog')} />
            <div className="ml-2 pl-2 border-l border-gray-200">
              <LanguageSelect />
            </div>
            <div className="ml-2 pl-2 border-l border-gray-200 flex items-center space-x-2">
              <AuthMenu />
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div 
        className={`md:hidden fixed inset-0 z-40 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu container */}
        <div 
          className={`absolute right-0 top-0 h-full w-[300px] bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-500 ease-in-out transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } mobile-menu-container`}
        >
          <div className="flex flex-col h-full">
            {/* Menu header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm z-10">
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <SidebarAvatar user={user} />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      <button
                        className="mt-1 text-xs text-red-600 hover:underline text-left"
                        onClick={() => {
                          logOut();
                          setMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">Guest User</p>
                    </div>
                  </>
                )}
              </div>
              {scrolled && (
                <div className="flex-1 text-center">
                  <span className="text-xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Blogify</span>
                  </span>
                </div>
              )}
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-2"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            {/* Menu content (scrollable) */}
            <div
              ref={menuContentRef}
              className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
                showMobileMenuContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="py-6 px-4">
                <nav className="flex flex-col gap-8">
                  {/* Main Menu */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      Main Menu
                    </h3>
                    <div className="flex flex-col gap-2">
                      <MobileNavLink 
                        href="/" 
                        icon={<Home size={18} />} 
                        text={t('home')} 
                        onClick={() => setMenuOpen(false)} 
                      />
                      <MobileNavLink 
                        href="/about" 
                        icon={<Info size={18} />} 
                        text={t('about')} 
                        onClick={() => setMenuOpen(false)} 
                      />
                      <MobileNavLink 
                        href="/contact" 
                        icon={<Mail size={18} />} 
                        text={t('contact')} 
                        onClick={() => setMenuOpen(false)} 
                      />
                    </div>
                  </div>

                  {/* Blog Menu */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      Blog
                    </h3>
                    <div className="flex flex-col gap-2">
                      <MobileNavLink 
                        href="/blog" 
                        icon={<BookOpen size={18} />} 
                        text={t('blog')} 
                        onClick={() => setMenuOpen(false)} 
                      />
                      <MobileNavLink 
                        href="/create-post" 
                        icon={<Edit size={18} />} 
                        text={t('create-post')} 
                        onClick={() => setMenuOpen(false)} 
                      />
                      <MobileNavLink
                        href={`/${locale}/allposts`}
                        icon={<List size={18} />}
                        text="All Posts"
                        onClick={() => setMenuOpen(false)}
                      />
                    </div>
                  </div>

                  {/* Auth Section */}
                  <div className="space-y-3 mt-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      Account
                    </h3>
                    <div className="flex flex-col gap-2">
                      {!user && (
                        <>
                          <button
                            className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 rounded-md shadow transition-all"
                            onClick={handleMobileSignIn}
                          >
                            Sign In
                          </button>
                          <button
                            className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-all"
                            onClick={handleMobileSignUp}
                          >
                            Sign Up
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      Language
                    </h3>
                    <div className="px-3">
                      <LanguageSelect />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, icon, text, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="relative flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-all group"
    >
      <span className="mr-1.5">{icon}</span>
      <span>{text}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, icon, text, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
    >
      <span className="mr-3.5 opacity-75">{icon}</span>
      <span className="font-medium">{text}</span>
    </Link>
  );
}

// SidebarAvatar component for sidebar user avatar rendering
function SidebarAvatar({ user }) {
  const [imageError, setImageError] = useState(false);
  const hasPhoto = user.photoURL && typeof user.photoURL === 'string' && user.photoURL.trim() !== '' && !imageError;
  if (hasPhoto) {
    return (
      <img
        src={user.photoURL}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover border border-gray-200"
        onError={() => setImageError(true)}
      />
    );
  }
  return (
    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white font-extrabold text-lg uppercase select-none">
      {user.email ? user.email[0].toUpperCase() : "?"}
    </span>
  );
}