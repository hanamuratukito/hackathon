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

      setOtherMember(
        otherData.filter((it) => isAfterYesterday(new Date(it.lastUpdated)))
      );
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md relative">
          <h1 className="text-2xl font-bold text-gray-900 font-noto-sans">
            {isAchieved ? "達成！" : me?.goal}
          </h1>
          {isExploding && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ConfettiExplosion />
            </div>
          )}
          <Button type="button" onClick={handleAchieve} disabled={isAchieved}>
            {isAchieved ? `継続${me?.count}日目！` : "達成"}
          </Button>
          {isAchieved && <p className="mt-4 text-gray-700">{quote}</p>}
          <MemberList title="同志" members={otherMember} />
          <FallenMemberList members={otherFallenMember} />
        </div>
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
