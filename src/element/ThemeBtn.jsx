import { Moon, Sun } from "lucide-react";
import useTheme from "../ThemeContext/themeContext";

export default function ThemeSliderToggle() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const toggleThemeBtn = (e) => {
    const isChecked = e.target.checked;
    isChecked ? darkTheme() : lightTheme();
  };

  return (
    <label className="relative block w-[3.5rem] sm:w-[3.8rem] h-[1.8rem] sm:h-[2rem] cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={themeMode === "dark"}
        onChange={toggleThemeBtn}
        aria-label="Toggle theme"
      />

      {/* Track */}
      <span
        className={`absolute inset-0 rounded-full 
          transition-colors duration-300 bg-gray-500
          `}
      ></span>

      {/* Slider Knob */}
      <span
        className={`
          absolute top-1/2 left-[4px] 
          -translate-y-1/2
          w-[1.3rem] h-[1.3rem] sm:w-[1.5rem] sm:h-[1.5rem]
          bg-black rounded-full
          flex items-center justify-center
          shadow-md transition-transform duration-[550ms] ease-out
          peer-checked:translate-x-[1.5rem] sm:peer-checked:translate-x-[1.9rem]
        `}
      >
        {themeMode === "dark" ? (
          <Moon size={12} className="text-white" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </span>
    </label>
  );
}
