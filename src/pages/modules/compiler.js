import React, { useState, useEffect, useRef } from 'react';
import "./styles/base.css";

export default function Sidebar() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('Loading webR, please wait...');
    const [generatedCode, setGeneratedCode] = useState('');
    const webRConsoleRef = useRef(null);

    const sendInput = () => {
        if (webRConsoleRef.current) {
            const codeToRun = generatedCode || input;
            console.log('input code: ', codeToRun);
            webRConsoleRef.current.stdin(codeToRun);
            setOutput(prev => prev + codeToRun + '\n');
            setInput('');
        }
    };

    useEffect(() => {
        import('https://webr.r-wasm.org/latest/webr.mjs').then(({ Console }) => {
            webRConsoleRef.current = new Console({
                stdout: line => setOutput(prev => prev + line + '\n'),
                stderr: line => setOutput(prev => prev + line + '\n'),
                prompt: p => setOutput(prev => prev + p),
            });
            webRConsoleRef.current.run();
        });

        // Add event listener for code generation
        const handleCodeGeneration = () => {
            const code = localStorage.getItem('generatedCode');
            if (code) {
                setGeneratedCode(code);
                // Optionally, you can run the code automatically here
                // if (webRConsoleRef.current) {
                //     webRConsoleRef.current.stdin(code);
                // }
            }
        };

        window.addEventListener('codeGenerated', handleCodeGeneration);

        // Clean up
        return () => {
            window.removeEventListener('codeGenerated', handleCodeGeneration);
        };
    }, []);

    return (
        <div className="compiler">
            <div className="compiler-container">
                <pre><code>{output}</code></pre>
                <button onClick={sendInput}>Run</button>
            </div>
        </div>
    );
}