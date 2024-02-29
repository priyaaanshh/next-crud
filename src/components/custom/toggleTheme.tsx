"use client";
import React from 'react'
import { useTheme } from "next-themes"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button } from '../ui/button';

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme === "dark") setTheme("light");
        else if (theme === "light") setTheme("dark");
    }
  return (
      <Button variant="ghost" onClick={toggleTheme}>{theme === "light" ? < MdDarkMode /> : <MdLightMode />}</Button>
  )
}

export default ToggleTheme
