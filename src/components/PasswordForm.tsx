import { FaClipboard } from "react-icons/fa";
import { useState, FormEvent, useRef } from "react";
import toast from 'react-hot-toast'
import usePasswordGenerator from "../hooks/usePasswordGenerator";

function PasswordForm() {
  const [length, setLength] = useState<number>(8); 
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(false);
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(false);

  const { password, generatePassword } = usePasswordGenerator();
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleGeneratePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePassword(
      length,
      includeUpperCase,
      includeLowerCase,
      includeNumbers,
      includeSpecialChars
    );
  };

  const HandleCopyToClipBoard = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length === 0) {
      toast.error('Please generate a password');
    }
    if(passwordInputRef.current && password.length !== 0) {
      const passwordToCopy = passwordInputRef.current.value;
      try {
        await navigator.clipboard.writeText(passwordToCopy);
        toast.success('Password copied')
      } catch (error) {
        toast.error('Failed to copy password');
      }
    } 
  }
  return (
    <section>
      <div className="w-80 h-96 bg-customDarkBlue flex justify-center items-center rounded-lg p-8">
        <form className="w-full" onSubmit={handleGeneratePassword}>
          <div className="relative mb-4">
            <input
              className="w-full p-2 pr-12 rounded-md bg-white"
              type="text"
              placeholder="Your password..."
              value={password}
              readOnly
              ref={passwordInputRef}
            />
            <button
              className="absolute right-2 top-2 text-customPurple text-2xl cursor-pointer"
              title="Copy to clipboard"
              onClick={HandleCopyToClipBoard}
            >
              <FaClipboard />
            </button>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="length" className="text-white">
              Length
            </label>
            <input
              id="length"
              type="number"
              max={16}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-[3rem] p-2 rounded-md bg-white"
            />
          </div>
          <div className="mb-2 flex justify-between">
            <label htmlFor="upperCase" className="text-white">
              Uppercase letter
            </label>
            <input type="checkbox" id="upperCase" className="mr-2" 
            onClick={()=>setIncludeUpperCase(!includeUpperCase)}
            />
          </div>
          <div className="mb-2 flex justify-between">
            <label htmlFor="lowerCase" className="text-white">
              Lowercase letter
            </label>
            <input type="checkbox" id="lowerCase" className="mr-2" 
            onClick={()=> setIncludeLowerCase(!includeLowerCase)}
            />
          </div>
          <div className="mb-2 flex justify-between">
            <label htmlFor="number" className="text-white">
              Numbers
            </label>
            <input type="checkbox" id="number" className="mr-2" 
            onClick={()=> setIncludeNumbers(!includeNumbers)}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label htmlFor="specialCharacter" className="text-white">
              Special Character
            </label>
            <input type="checkbox" id="specialCharacter" className="mr-2" 
            onClick={()=> setIncludeSpecialChars(!includeSpecialChars)}
            />
          </div>
          <div className="flex justify-center p-2">
            <button
              className="bg-customPurple hover:bg-customBlue text-white text-sm px-4 py-2 rounded-md"
              type="submit"
            >
              Generate Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PasswordForm;
