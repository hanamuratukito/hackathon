import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";
import { State, findMe, getState, register } from "@/services/goalService";
import { useNavigate } from "react-router-dom";
import { getAvatarById } from "@/services/avatarService";

const quotes = [
  "継続は力なり。",
  "千里の道も一歩から。",
  "石の上にも三年。",
  "努力は裏切らない。",
  "継続こそ成功の鍵。",
];

const getRandomQuotes = () => quotes[Math.floor(Math.random() * quotes.length)];

const MAX_CONTINUOUS_DAYS = 66;

type MemberViewProp = {
  member: State;
};

function MemberView({ member }: MemberViewProp) {
  const isContinue =
    new Date().getTime() - member.lastUpdated.getTime() <
    1000 * 60 * 60 * 24 * 2; // 2日間

  return (
    <div key={member.username} className="flex items-center">
      <Avatar className="w-10 h-10 rounded-full mr-2">
        <AvatarImage src={getAvatarById(member.avatarType)?.src} />
        <AvatarFallback />
      </Avatar>
      <div className="flex flex-col gap-1 text-left">
        <div className="flex gap-2 items-center">
          <span>{member.username}</span>
          {isContinue ? (
            <div className="bg-emerald-100 text-emerald-700 font-bold text-xs rounded p-1 ">
              継続中
            </div>
          ) : (
            <div className="bg-zinc-200 text-zinc-600 font-bold text-xs rounded p-1 ">
              {member.lastUpdated.toLocaleDateString()}に脱落
            </div>
          )}
        </div>
        <span className="text-xs">{member.goal}</span>
      </div>
    </div>
  );
}

const Home = () => {
  const [isAchieved, setIsAchieved] = useState(false);
  const [quote, setQuote] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [me, setMe] = useState<State | null>(null);
  const [otherMember, setOtherMember] = useState<State[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const meData = await findMe();
      if (!meData) navigate("/init-form");
      setMe(meData);

      const otherData = await getState();
      setOtherMember(
        otherData.sort(
          (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
        )
      );
    };

    fetchData();
  }, [navigate]);

  const handleAchieve = () => {
    if (!me) return;

    const updatedMe = { ...me, count: me.count + 1 };
    register(updatedMe);
    setMe(updatedMe);
    setIsAchieved(true);
    setQuote(getRandomQuotes());
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
  };

  if (!me) return null;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <Avatar className="w-16 h-16 rounded-full mr-2">
              <AvatarImage src={getAvatarById(me.avatarType)?.src} />
              <AvatarFallback />
            </Avatar>
            <div className="text-xl">{me.username}</div>
          </div>
          <div className="text-2xl font-bold">{me.goal}</div>
          <div>
            {isExploding && (
              <div className="flex justify-center">
                <ConfettiExplosion />
              </div>
            )}
            <Button
              className="w-32 font-bold"
              type="button"
              onClick={handleAchieve}
              disabled={isAchieved}
            >
              達成
            </Button>
            {isAchieved && (
              <p className="mt-4 text-sm text-zinc-700">{quote}</p>
            )}
          </div>
        </section>

        <section className="bg-white border rounded p-6 text-center flex flex-col gap-2">
          <div className="flex gap-2 items-end justify-center">
            <span className="text-3xl font-bold">{me.count}</span>
            <span>日継続中</span>
          </div>
          <div className="text-sm text-zinc-700">
            {MAX_CONTINUOUS_DAYS}日間の継続で目標達成
          </div>
        </section>

        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            同日にスタートしたユーザー
          </h2>
          <div className="min-w-64 mx-auto">
            <div className="flex flex-col gap-6">
              {otherMember.map((member) => (
                <MemberView key={member.username} member={member} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
