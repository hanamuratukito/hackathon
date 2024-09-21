import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";
import { State, findMe, getState, register } from "@/services/goalService";
import boy from "@/assets/boy.jpg";
import girl from "@/assets/girl.jpg";
import cat from "@/assets/cat.jpg";
import dog from "@/assets/dog.jpg";

const avatarTypes = [
  { id: 1, src: boy },
  { id: 2, src: girl },
  { id: 3, src: cat },
  { id: 4, src: dog },
];

const quotes = [
  "継続は力なり。",
  "千里の道も一歩から。",
  "石の上にも三年。",
  "努力は裏切らない。",
  "継続こそ成功の鍵。",
];

const Home = () => {
  const [isAchieved, setIsAchieved] = useState(false);
  const [quote, setQuote] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [me, setMe] = useState<State | null>(null);
  const [otherMember, setOtherMember] = useState<State[]>([]);
  const [otherFallenMember, setOtherFallenMember] = useState<State[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const meData = await findMe();
      setMe(meData);

      const otherData = await getState();
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const isAfterYesterday = (date: Date) => date > yesterday;

      setOtherMember(otherData);
      setOtherFallenMember(
        otherData.filter((it) => !isAfterYesterday(new Date(it.lastUpdated)))
      );
    };

    fetchData();
  }, []);

  const handleAchieve = () => {
    if (!me) return;

    const updatedMe = { ...me, count: me.count + 1 };
    register(updatedMe);
    setMe(updatedMe);
    setIsAchieved(true);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
  };

  if (!me) return null;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
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
            {isAchieved && <p className="mt-4 text-gray-700">{quote}</p>}
          </div>
        </section>

        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <div className="flex gap-2 items-end justify-center">
            残り<span className="text-3xl font-bold">{me.count}</span>日
          </div>
          <div>12/66 -------</div>
        </section>

        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            パーティーメンバー
          </h2>
          <div className="w-64 mx-auto">
            <div className="flex flex-col gap-6">
              {otherMember.map((member, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="w-10 h-10 rounded-full mr-2">
                    <AvatarImage
                      src={
                        avatarTypes.find((it) => it.id === member.avatarType)
                          ?.src
                      }
                    />
                    <AvatarFallback />
                  </Avatar>
                  <div className="flex flex-col gap-1 text-left">
                    <div className="flex gap-2 items-center">
                      <span>{member.username}</span>
                      <div className="bg-emerald-100 text-emerald-700 font-bold text-xs rounded p-1 ">
                        継続中
                      </div>
                    </div>
                    <span className="text-xs">{member.goal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const MemberList = ({
  title,
  members,
}: {
  title: string;
  members: State[];
}) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="flex flex-col gap-4">
      {members.map((member, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="w-10 h-10 rounded-full mr-2">
            <AvatarImage
              src={avatarTypes.find((it) => it.id === member.avatarType)?.src}
            />
            <AvatarFallback />
          </Avatar>
          <span className="text-sm font-medium text-gray-700">
            {member.username}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const FallenMemberList = ({ members }: { members: State[] }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-red-600 mb-4">脱落した同志</h2>
    {members.length === 0 ? (
      <p className="text-sm text-gray-500">脱落した同志はまだいません</p>
    ) : (
      <div className="flex flex-col gap-4">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 rounded-full mr-2">
                <AvatarImage
                  src={
                    avatarTypes.find((it) => it.id === member.avatarType)?.src
                  }
                />
                <AvatarFallback />
              </Avatar>
              <span className="text-sm font-medium text-gray-700">
                {member.username}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(member.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Home;
