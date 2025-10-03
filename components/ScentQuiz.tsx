import React, { useState } from 'react';
import type { QuizAnswers } from '../types';

interface ScentQuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

const questions = [
  {
    key: 'منبع انرژی',
    question: 'بعد از یک هفته طولانی، چگونه انرژی خود را بازیابی می‌کنید؟',
    options: [
      'شرکت در یک دورهمی اجتماعی پرانرژی با دوستان و افراد جدید.',
      'گذراندن یک عصر آرام به تنهایی، غرق در یک کتاب یا یک پروژه شخصی.',
      'داشتن یک گفتگوی عمیق و معنادار با گروه کوچکی از دوستان صمیمی.',
      'کاوش در یک شهر جدید یا مسیر طبیعت، و جذب انرژی محیط.',
    ],
  },
  {
    key: 'درک اطلاعات',
    question: 'هنگام شروع یک پروژه جدید، تمرکز شما بر چیست؟',
    options: [
      'جزئیات عینی، حقایق و مراحل عملی مورد نیاز برای شروع کار.',
      'چشم‌انداز کلی، امکانات آینده و الگوهای پنهان.',
      'آزمایش ایده‌های مختلف برای دیدن اینکه چه چیزی پدیدار می‌شود.',
      'تکیه بر تجربیات گذشته و روش‌های اثبات شده.',
    ],
  },
  {
    key: 'سبک تصمیم‌گیری',
    question: 'مهم‌ترین عامل در هنگام گرفتن یک تصمیم مهم برای شما چیست؟',
    options: [
      'تحلیل منطقی، بررسی بی‌طرفانه مزایا و معایب و اصول عینی.',
      'تأثیر تصمیم بر افراد درگیر، ارزش‌های شخصی و حفظ هماهنگی.',
      'یک حس درونی یا شهودی که به شما می‌گوید کدام راه درست است.',
      'پیدا کردن راه حلی که برای همه منصفانه و عادلانه باشد.',
    ],
  },
  {
    key: 'رویکرد به زندگی',
    question: 'ترجیح می‌دهید زندگی روزمره خود را چگونه بگذرانید؟',
    options: [
      'با یک برنامه مشخص، یک جدول زمانی ساختاریافته و به سرانجام رساندن کارها.',
      'باز نگه داشتن گزینه‌ها، سازگاری خودجوش با فرصت‌های جدید و لذت بردن از انعطاف‌پذیری.',
      'تعادلی بین ساختار برای کار و آزادی کامل برای اوقات فراغت.',
      'کار کردن در جرقه‌های انرژی‌بخش الهام، به جای یک سرعت ثابت و پیوسته.',
    ],
  },
  {
    key: 'منبع الهام',
    question: 'چه نوع اثر هنری یا داستانی شما را بیشتر مجذوب خود می‌کند؟',
    options: [
      'یک رمان واقع‌گرایانه با جزئیات غنی و حسی که باعث می‌شود احساس کنید آنجا هستید.',
      'یک اثر هنری مفهومی که درک شما را به چالش می‌کشد و ایده‌های جدیدی را برمی‌انگیزد.',
      'یک حماسه تاریخی که ریشه در حقایق و رویدادهای واقعی دارد.',
      'یک دنیای فانتزی با سیستم‌های جادویی پیچیده و معانی نمادین.',
    ],
  },
  {
    key: 'ارزش‌های شخصی',
    question: 'کدام شعار بیشتر با شما همخوانی دارد؟',
    options: [
      'حقیقت بالاتر از هر چیز است.',
      'مهربانی همه چیز است.',
      'شور و اشتیاق خود را دنبال کن.',
      'دانش قدرت است.',
    ],
  },
];


const ScentQuiz: React.FC<ScentQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const handleAnswer = (option: string) => {
    const currentQuestionKey = questions[step].key;
    const newAnswers = { ...answers, [currentQuestionKey]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-indigo-500/20 backdrop-blur-sm">
      <div className="text-center">
        <p className="text-cyan-400 font-semibold mb-2">
          قدم {step + 1} از {questions.length}
        </p>
        <h2 className="text-3xl font-serif text-white mb-8 drop-shadow-md">
          {currentQuestion.question}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full text-right p-4 bg-gray-700/60 rounded-lg border-2 border-transparent hover:border-cyan-500 hover:bg-cyan-900/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
          >
            <span className="text-lg text-gray-200">{option}</span>
          </button>
        ))}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-8">
        <div 
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}>
        </div>
      </div>
    </div>
  );
};

export default ScentQuiz;
