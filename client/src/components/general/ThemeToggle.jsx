import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext'
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant={"mode"}
            onClick={toggleTheme}
            className="p-2 border-none bg-primary-light dark:bg-primary-dark text-white transition"
        >
            {theme === 'light' ? <Moon size={22} strokeWidth={1.5} className='text-gray-900' /> : <Sun size={22} strokeWidth={1.5} />}

        </Button>
    );
};

export default ThemeToggle;
