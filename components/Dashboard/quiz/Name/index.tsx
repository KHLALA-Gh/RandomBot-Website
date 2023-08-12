export default function QuizName({ name }: { name: string }) {
  return (
    <>
      <div className="bg-[#1F1F1F] ps-10 pr-10 pt-6 pb-6 rounded-md text-[18px] flex items-center">
        <h1>{name}</h1>
      </div>
    </>
  );
}
