
import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex flex-col h-full bg-dark-800 rounded-lg border border-dark-700 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-dark-700">
            <h2 className="text-lg font-semibold text-white">Paste Code Diff</h2>
            <p className="text-sm text-gray-400">Provide the diff from your pull request below.</p>
        </div>
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={`--- a/src/App.js
+++ b/src/App.js
@@ -1,6 +1,6 @@
 function App() {
   return (
-    <div>Hello World</div>
+    <div className="App">Hello Universe</div>
   );
 }
 export default App;`}
        className="flex-grow w-full p-4 bg-dark-900 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeInput;
