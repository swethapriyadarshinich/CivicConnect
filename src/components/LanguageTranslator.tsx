import React, { useEffect, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'தமிழ்', value: 'ta' },
  { label: 'తెలుగు', value: 'te' },
  { label: '中文', value: 'zh-CN' },
  { label: '日本語', value: 'ja' },
];

export const LanguageTranslator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return decodeURIComponent(match[2]);
      return null;
    };
    
    // Check local hostname cookie as well as domain cookie
    let googtrans = getCookie('googtrans');
    
    if (googtrans) {
      const lang = googtrans.split('/')[2];
      if (lang) {
        setCurrentLang(lang);
      }
    }

    const initTranslate = () => {
      // @ts-ignore
      if (window.google && window.google.translate) {
        // @ts-ignore
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: LANGUAGES.map(l => l.value).join(','),
          // @ts-ignore
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        }, 'google_translate_element');
      }
    };

    // @ts-ignore
    window.googleTranslateElementInit = initTranslate;

    const translateScriptId = 'google-translate-script';
    if (!document.getElementById(translateScriptId)) {
      const script = document.createElement('script');
      script.id = translateScriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    const setCookie = (name: string, value: string) => {
      document.cookie = `${name}=${value}; path=/`;
      document.cookie = `${name}=${value}; path=/; domain=${window.location.hostname}`;
    };

    if (langCode === 'en') {
      // Clear cookie for default language
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    } else {
      setCookie('googtrans', `/en/${langCode}`);
    }
    
    // Force reload to apply translation
    // Wrapping in a slight timeout ensures cookies are placed
    setTimeout(() => {
        window.location.reload();
    }, 100);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.language-translator-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="language-translator-container relative group flex items-center justify-center z-[60]">
      {/* Hidden google widget container */}
      <div id="google_translate_element" className="hidden"></div>
      
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 p-2 transition-all ${
            isOpen 
              ? 'bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
              : 'border-2 border-transparent hover:border-slate-900 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100'
          }`}
          aria-label="Select Language"
        >
          <Globe className="w-5 h-5 text-slate-900" />
          <span className="hidden md:inline-block text-xs font-bold uppercase tracking-widest text-slate-900">
            {LANGUAGES.find(l => l.value === currentLang)?.label.substring(0, 3) || 'ENG'}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-3 w-40 max-h-[60vh] overflow-y-auto bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col z-[100] scrollbar-thin scrollbar-thumb-slate-300">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`text-left px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors ${currentLang === lang.value ? 'bg-slate-100 text-blue-600 border-l-4 border-l-blue-600' : 'text-slate-900 border-l-4 border-transparent'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
