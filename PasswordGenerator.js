import { useState } from 'react';
import { Copy, Check, X, Moon, Sun } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSpecialChars, setHasSpecialChars] = useState(true);
  const [passwordLength, setPasswordLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (hasUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasNumbers) chars += '0123456789';
    if (hasSpecialChars) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePasswordLengthChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 12) {
      setPasswordLength(12);
    } else if (value > 1000000) {
      setPasswordLength(1000000);
    } else {
      setPasswordLength(value);
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-2xl`}>
      <div className="flex justify-between mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} `}>Password Generator</h2>
        <button onClick={toggleDarkMode} className="bg-transparent border-0">
          {darkMode ? (
            <Sun className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          ) : (
            <Moon className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          )}
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <label className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
          <input
            type="checkbox"
            checked={hasUppercase}
            onChange={() => setHasUppercase(!hasUppercase)}
            className="mr-2"
          />
          Uppercase Letters
        </label>
        <label className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
          <input
            type="checkbox"
            checked={hasNumbers}
            onChange={() => setHasNumbers(!hasNumbers)}
            className="mr-2"
          />
          Numbers
        </label>
        <label className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
          <input
            type="checkbox"
            checked={hasSpecialChars}
            onChange={() => setHasSpecialChars(!hasSpecialChars)}
            className="mr-2"
          />
          Special Characters
        </label>
      </div>
      <div className="flex justify-between mb-4">
        <label className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
          Password Length:
          <input
            type="number"
            value={passwordLength}
            onChange={handlePasswordLengthChange}
            className={`ml-2 w-12 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'} p-2 rounded`}
            min="12"
            max="1000000"
          />
        </label>
        <button
          onClick={generatePassword}
          className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded`}
        >
          Generate Password
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className={`w-full p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded`}
        />
        <button
          onClick={handleCopy}
          className={`bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-2`}
        >
          {copied ? (
            <Check className="text-white" />
          ) : (
            <Copy className="text-white" />
          )}
        </button>
      </div>
      {copied && (
        <div className={`text-emerald-500 text-sm`}>Password copied to clipboard!</div>
      )}
    </div>
  );
};

export default PasswordGenerator;