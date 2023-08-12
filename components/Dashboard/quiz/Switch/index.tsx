import Switch from "@/components/utils/switch";

interface QuizConfigSwitchProps {
  name: string;
  onChange: () => any;
  enable: boolean;
}

export default function QuizConfigSwitch({
  name,
  enable,
  onChange,
}: QuizConfigSwitchProps) {
  return (
    <>
      <div className="bg-arr flex justify-between items-center p-5 rounded-md">
        <h1>{name}</h1>
        <Switch enable={enable} onClick={onChange} />
      </div>
    </>
  );
}
