import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { getAllPasswords } from "../api/user";

type password = {
  name: string;
  password: string;
};

function SavedPasswords() {
  const [savedPasswords, setSavedPasswords] = useState([]);
  useEffect(()=> {
    async function getPass () {
      const userName = localStorage.getItem('userName') ?? '';
      const data = await getAllPasswords(userName);
      setSavedPasswords(data.passwords)
    }
    getPass();
  }, [])

  const handleCopyToClipboard = (password: string) => {
    try {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy password to clipboard");
    }
  };

  return (
    <div className="flex justify-center items-center p-32">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 p-3">Saved Passwords</h2>
        {savedPasswords.length === 0 ? (
          <p>No saved passwords yet.</p>
        ) : (
          <ul>
            {savedPasswords?.map((password: password, index) => (
              <li
                key={index}
                className="border border-gray-300 p-4 mb-4 rounded-md flex justify-between items-center"
              >
                <div className="flex gap-x-2 justify-center items-center">
                  <h3 className="font-semibold">{password.name}</h3>
                  <p className="text-gray-500">{password.password}</p>
                <button
                  className="bg-customPurple hover:bg-customBlue text-white text-sm px-4 py-2 rounded-md"
                  onClick={() => handleCopyToClipboard(password.password)}
                >
                  Copy
                </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SavedPasswords;
