import PromptField from "./promptField";
import PromptFolderField from "./promptFolderField";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-8">
      <div className="flex z-10 w-fit text-center max-w-5xl items-center justify-between font-mono text-sm">
        {"prompt like there's no tomorrow"}
      </div>

      <div className="m-4 flex flex-col gap-4 w-full max-w-[800px]">
        <PromptFolderField folder="dial_0" />
        <PromptFolderField folder="dial_1" />
        <PromptFolderField folder="dial_2" />
        <PromptFolderField folder="dial_3" />
        <PromptFolderField folder="dial_4" />
        <PromptFolderField folder="dial_5" />
        <PromptFolderField folder="dial_6" />
        <PromptFolderField folder="dial_7" />
      </div>
      

      <div className="mb-32 mt-8 grid text-center">
      {"Made with ❤️ by Noah Picard & Sebastian Graf"}
      </div>

      {/* <PromptField /> */}
    </main>
  );
}
