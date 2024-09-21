import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import boy from "@/assets/boy.jpg";
import girl from "@/assets/girl.jpg";
import cat from "@/assets/cat.jpg";
import dog from "@/assets/dog.jpg";
import { useState } from "react";
import { storeState } from "@/services/goalService";
import { useNavigate } from "react-router-dom";

const avatarTypes = [
  {
    id: 1,
    src: boy,
  },
  {
    id: 2,
    src: girl,
  },
  {
    id: 3,
    src: cat,
  },
  {
    id: 4,
    src: dog,
  },
];

function InitForm() {
  const [avatarType, setAvatarType] = useState(1);
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedOption, setSelectedOption] = useState("1回する");

  const navigate = useNavigate();

  const start = async () => {
    await storeState({
      username,
      avatarType,
      goal: goal + selectedOption,
      count: 0,
      lastUpdated: new Date(),
    });

    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="w-full max-w-sm items-center">
          <div className="flex flex-col gap-3 w-64">
            <h2 className="text-lg font-bold">プロフィールを設定しよう</h2>
            <div className="flex gap-4 items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={avatarTypes.find((it) => it.id === avatarType)?.src}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="secondary">
                    選択
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex">
                  <DropdownMenuItem onClick={() => setAvatarType(1)}>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={boy} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAvatarType(2)}>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={girl} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAvatarType(3)}>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={cat} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAvatarType(4)}>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={dog} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Input
              id="username"
              placeholder="ユーザー名"
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </div>
        </section>
        <section className="w-full max-w-sm items-center">
          <h2 className="text-lg font-bold">目標を入力しよう</h2>
          <div className="flex flex-col gap-2">
            <div className="w-64 flex items-center gap-4">
              <Input
                placeholder="目標"
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="w-64 flex items-center">
              <Select
                value={selectedOption}
                onValueChange={(value) => {
                  setSelectedOption(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1回する">1回する</SelectItem>
                  <SelectItem value="1分する">1分する</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        <div>
          <Button onClick={start}>目標開始</Button>
        </div>
      </div>
    </Layout>
  );
}

export default InitForm;
