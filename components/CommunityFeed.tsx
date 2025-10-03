import React from 'react';

const mockUsers = [
  {
    name: "سارا رضایی",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    favoritePerfume: "Éclat Nocturne",
    review: "این عطر امضای منه! حس قدم زدن تو یه باغ پر از گل‌های سفید تو شب رو بهم می‌ده. عالیه!",
    badges: ["Top Reviewer", "Scent Explorer"],
  },
  {
    name: "علی اکبری",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    favoritePerfume: "Bois de Mystère",
    review: "رایحه چوبی و دودی این عطر بی‌نظیره. برای جلسات کاری و مهمونی‌های رسمی فوق‌العاده‌ست. ماندگاری بالایی هم داره.",
    badges: ["Collector"],
  },
  {
    name: "نگین محمدی",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    favoritePerfume: "Aura de Vanille",
    review: "عاشق عطرهای وانیلی هستم و این یکی بهترینه. شیرینیش دل رو نمی‌زنه و خیلی حس آرامش‌بخشی داره.",
    badges: ["Gourmand Guru"],
  },
];

const CommunityFeed: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-white mb-2">جامعه عطربازان addaperfume</h2>
        <p className="text-gray-400">تجربه‌های خود را به اشتراک بگذارید و از دیگران الهام بگیرید.</p>
      </div>
      <div className="space-y-8">
        {mockUsers.map((user, index) => (
          <div key={index} className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 flex flex-col sm:flex-row items-start gap-6">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-2 border-purple-400 object-cover flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
              </div>
              <p className="text-sm text-purple-300 italic mb-3">
                عطر مورد علاقه: {user.favoritePerfume}
              </p>
              <p className="text-gray-300 mb-4">{user.review}</p>
              <div className="flex flex-wrap gap-2">
                {user.badges.map(badge => (
                  <span key={badge} className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;