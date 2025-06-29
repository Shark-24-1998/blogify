'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState('');

  const availableLocales = ['en', 'hi', 'es', 'fr'];

  useEffect(() => {
    const currentLocale = pathname.split('/')[1];

    // Only set language if it's one of your supported ones
    if (availableLocales.includes(currentLocale)) {
      setLanguage(currentLocale);
    } else {
      setLanguage(''); // Show "Language" option
    }
  }, [pathname]);

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    const segments = pathname.split('/');
    segments[1] = selectedLang;

    router.push(segments.join('/'));
  };

  return (
    <>
    
    <select
      className="border rounded px-2 py-1 hover:text-black"
      value={language}
      onChange={handleChange}
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
    </>
    
  );
};

export default LanguageSelect;
