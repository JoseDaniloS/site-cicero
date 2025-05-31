import VotePage from "./Sections/Center";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <VotePage />
      <footer className="absolute bottom-5 text-center w-full text-gray-400 text-sm">
                <p>
                    Desenvolvido por{" "}
                    <a
                        href="https://github.com/JoseDaniloS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        José Danilo
                    </a>
                    {" "}#QUARTO10
                </p>
            </footer>
    </main>
  );
}
