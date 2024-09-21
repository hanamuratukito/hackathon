import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";

import { State, findMe } from "@/services/goalService";

const Home = () => {
  const [achieved, setAchieved] = useState(false);
  const [days, setDays] = useState(1);
  const [quote, setQuote] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [me, setMe] = useState<State | null>(null);

  const quotes = [
    "継続は力なり。",
    "千里の道も一歩から。",
    "石の上にも三年。",
    "努力は裏切らない。",
    "継続こそ成功の鍵。",
  ];

  const handleAchieve = () => {
    setAchieved(true);
    setDays(days + 1);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
  };

  const comrades = [
    { name: "ユーザー1", avatar: "/public/vite.svg" },
    { name: "ユーザー2", avatar: "/public/vite.svg" },
    { name: "ユーザー3", avatar: "/public/vite.svg" },
  ];

  const fallenComrades = [
    { name: "脱落者1", avatar: "/public/vite.svg" },
    { name: "脱落者2", avatar: "/public/vite.svg" },
  ];

  useEffect(() => {
    findMe().then((me) => setMe(me));
  }, []);
  console.log(me);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md relative">
          {isExploding && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ConfettiExplosion />
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 font-noto-sans">
            {achieved ? "達成！" : "腹筋を１回する"}
          </h1>
          <Button type="button" onClick={handleAchieve} disabled={achieved}>
            {achieved ? `継続${days}日目！` : "達成"}
          </Button>
          {achieved && <p className="mt-4 text-gray-700">{quote}</p>}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">同志</h2>
            <div className="flex flex-col gap-4">
              {comrades.map((comrade, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="w-10 h-10 rounded-full mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    {comrade.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              死亡した同志
            </h2>
            {fallenComrades.length === 0 ? (
              <p className="text-sm text-gray-500">
                死亡した同志はまだいません
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {fallenComrades.map((comrade, index) => (
                  <div key={index} className="flex items-center opacity-50">
                    <Avatar className="w-10 h-10 rounded-full mr-2 grayscale">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className="ml-2 text-[#121212] line-through">
                      {comrade.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
