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
import { useState } from "react";
import { register } from "@/services/goalService";
import { useNavigate } from "react-router-dom";
import { getAvatarById } from "@/services/avatarService";

function InitForm() {
  const [avatarType, setAvatarType] = useState(1);
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedOption, setSelectedOption] = useState("を1回する");
  const navigate = useNavigate();
  const showGoalText = goal + selectedOption;
  const canSubmit = username.length > 0 && goal.length > 0;

  const start = async () => {
    await register({
      username,
      avatarType,
      goal: showGoalText,
      count: 0,
      lastUpdated: new Date(),
    });

    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <h2 className="text-lg font-bold">プロフィールを設定しよう</h2>
          <div className="flex gap-4 items-center justify-center w-64 mx-auto">
            <Avatar className="w-20 h-20">
              <AvatarImage src={getAvatarById(avatarType)?.src} />
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
                    <AvatarImage src={getAvatarById(1)?.src} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAvatarType(2)}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={getAvatarById(2)?.src} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAvatarType(3)}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={getAvatarById(3)?.src} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAvatarType(4)}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={getAvatarById(4)?.src} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-4 items-center w-64 mx-auto">
            <Input
              id="username"
              placeholder="ユーザー名"
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </div>
        </section>
        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <h2 className="text-lg font-bold">目標を設定しよう</h2>
          <div className="flex flex-col gap-4 items-center justify-center w-64 mx-auto">
            <Input
              placeholder="目標"
              onChange={(e) => setGoal(e.target.value)}
            />
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
                <SelectItem value="を1回する">を1回する</SelectItem>
                <SelectItem value="を1分する">を1分する</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <section className="bg-white border rounded p-6 text-center flex flex-col gap-4">
          <span className="text-2xl font-bold">{showGoalText}</span>
          <Button
            className="w-32 mx-auto"
            onClick={start}
            disabled={!canSubmit}
          >
            目標開始
          </Button>
        </section>
      </div>
    </Layout>
  );
}

export default InitForm;
