import { useState } from "react";
import toast from 'react-hot-toast'

function usePasswordGenerator() {
  const [password, setPassword] = useState<string>("");

  const generatePassword = (
    length: number,
    includeUpperCase: boolean,
    includeLowerCase: boolean,
    includeNumbers: boolean,
    includeSpecialChar: boolean
  ) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*_-+=;:,.<>?";

    if (length < 6) {
      toast.error('Length must be at least 6 characters long');
      return;
    } else if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSpecialChar) {
      toast.error('Select a field ');
      return;
    }

    let charSet = "";
    if (includeUpperCase) charSet += uppercaseChars;
    if (includeLowerCase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSpecialChar) charSet += specialChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);

    toast.success('Password generated successfully')
  };
  return { password, generatePassword };
}

export default usePasswordGenerator;
