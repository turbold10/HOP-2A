import { Character } from "./_components/Character";

export default function Home() {
  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Choose a Character
      </h1>
      <Character />
    </div>
  );
}
