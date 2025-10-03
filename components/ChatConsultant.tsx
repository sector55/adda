import React, { useState, useRef, useEffect } from 'react';
import { continueChat } from '../services/geminiService';
import type { ChatMessage } from '../types';
import Button from './ui/Button';

const ChatConsultant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'سلام! من مشاور عطر هوشمند شما در addaperfume هستم. چطور می‌تونم کمکتون کنم؟' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await continueChat(messages, input);
            const modelMessage: ChatMessage = { role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', text: 'متاسفانه خطایی رخ داده است. لطفاً بعداً تلاش کنید.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto h-[70vh] flex flex-col bg-gray-800/50 rounded-2xl shadow-2xl border border-indigo-500/20">
            <div className="p-4 border-b border-gray-700 text-center">
                <h2 className="text-2xl font-serif text-white">مشاور هوشمند</h2>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-bl-none' : 'bg-gray-700 text-gray-200 rounded-br-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="px-4 py-3 rounded-2xl bg-gray-700 text-gray-200 rounded-br-none">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="پیام خود را بنویسید..."
                        className="flex-1 w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>ارسال</Button>
                </form>
            </div>
        </div>
    );
};

export default ChatConsultant;