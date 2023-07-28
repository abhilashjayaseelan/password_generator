import { FaClipboard } from "react-icons/fa";
import { useState, FormEvent, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import { getPasswordStrength } from "../helpers/getPasswordStrength";

function PasswordForm() {
  const [length, setLength] = useState<number>(8);
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(false);
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [includeSpecialChars, setIncludeSpecialChars] =
    useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

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

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Implement logout logic here
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
    } else {
      // Implement login logic here
      // For demo purposes, we are setting isLoggedIn to true immediately
      setIsLoggedIn(true);
      toast.success("Logged in successfully");
    }
  };

  const HandleCopyToClipBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length === 0) {
      toast.error("Please generate a password");
    }
    if (passwordInputRef.current && password.length !== 0) {
      const passwordToCopy = passwordInputRef.current.value;
      try {
        await navigator.clipboard.writeText(passwordToCopy);
        toast.success("Password copied");
      } catch (error) {
        toast.error("Failed to copy password");
      }
    }
  };

  const numSelectedFields = [
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSpecialChars,
  ].filter(Boolean).length;

  useEffect(() => {
    const level = getPasswordStrength(password, numSelectedFields);
    setPasswordStrength(level);
  }, [numSelectedFields, password]);

  return (
    <section>
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-16 bg-gray-400 rounded-full cursor-pointer absolute top-5 right-5"
          onClick={() => setClicked(!clicked)}
        >
          {isLoggedIn ? "🔒" : "👤"}
        </div>
        {/* Dropdown */}
        {clicked && (
          <div className="bg-white rounded-lg shadow p-4 absolute top-20 right-5">
            {isLoggedIn && (
              <>
                <div className="hover: bg-blue-gray-100">View Saved Passwords</div>
                {/* <div>Account Settings</div> */}
                <div onClick={handleLoginLogout}>Logout</div>
              </>
            )}
            {!isLoggedIn && <div className="hover:bg-blue-gray-100 cursor-pointer">Login</div>}
          </div>
        )}
        <div className="text-white font-semibold text-5xl p-10">
          🔑Strong Password🔑
        </div>
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
                max={30}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-[3rem] p-2 rounded-md bg-white"
              />
            </div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="upperCase" className="text-white">
                Uppercase letter
              </label>
              <input
                type="checkbox"
                id="upperCase"
                className="mr-2"
                onClick={() => setIncludeUpperCase(!includeUpperCase)}
              />
            </div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="lowerCase" className="text-white">
                Lowercase letter
              </label>
              <input
                type="checkbox"
                id="lowerCase"
                className="mr-2"
                onClick={() => setIncludeLowerCase(!includeLowerCase)}
              />
            </div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="number" className="text-white">
                Numbers
              </label>
              <input
                type="checkbox"
                id="number"
                className="mr-2"
                onClick={() => setIncludeNumbers(!includeNumbers)}
              />
            </div>
            <div className="mb-4 flex justify-between">
              <label htmlFor="specialCharacter" className="text-white">
                Special Character
              </label>
              <input
                type="checkbox"
                id="specialCharacter"
                className="mr-2"
                onClick={() => setIncludeSpecialChars(!includeSpecialChars)}
              />
            </div>
            <div
              className={
                passwordStrength === "Medium"
                  ? `text-orange-800 mt-2`
                  : passwordStrength === "Strong"
                  ? `text-light-green-700 mt-2`
                  : `text-red-500 mt-2`
              }
            >
              Password Strength: {passwordStrength}
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
      </div>
    </section>
  );
}

export default PasswordForm;
