import PromptField from "./promptField";
import PromptFolderField from "./promptFolderField";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full text-center max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {"prompt like there's no tomorrow"}
      </div>

      <div className="m-4 flex flex-col gap-4">
        <PromptFolderField folder="dial_0" />
        <PromptFolderField folder="dial_1" />
        <PromptFolderField folder="dial_2" />
        <PromptFolderField folder="dial_3" />
        <PromptFolderField folder="dial_4" />
        <PromptFolderField folder="dial_5" />
        <PromptFolderField folder="dial_6" />
        <PromptFolderField folder="dial_7" />
      </div>
      

      <div className="mb-32 mt-8 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      {"Made with ❤️ by Noah Picard & Sebastian Graf"}
      </div>

      {/* <PromptField /> */}
    </main>
  );
}
