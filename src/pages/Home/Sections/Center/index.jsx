import { useState, useRef } from "react";

export default function CenterSection() {
    const [hasEntered, setHasEntered] = useState(false);
    const [noPosition, setNoPosition] = useState({ top: "0%", left: "0%" });
    const bgAudioRef = useRef(null);
    const urnaAudioRef = useRef(null);
    const cardRef = useRef(null);

    const moveNoButton = () => {
        if (cardRef.current) {
            const card = cardRef.current.getBoundingClientRect();
            const buttonWidth = 120;
            const buttonHeight = 50;

            const maxTop = Math.max(card.height - buttonHeight - 20, 0);
            const maxLeft = Math.max(card.width - buttonWidth - 20, 0);

            const randomTop = Math.floor(Math.random() * maxTop);
            const randomLeft = Math.floor(Math.random() * maxLeft);

            setNoPosition({ top: `${randomTop}px`, left: `${randomLeft}px` });
        }
    };

    const handleEnter = () => {
        const audio = bgAudioRef.current;
        if (audio) {
            audio.loop = true;
            audio.play().catch((e) => {
                console.warn("Erro ao reproduzir música:", e);
            });
        }
        setHasEntered(true);
    };

    const handleYes = () => {
        if (bgAudioRef.current) bgAudioRef.current.volume = 0.1;
        urnaAudioRef.current?.play();
        alert("Obrigado por votar SIM! 🚀");
        if (bgAudioRef.current) bgAudioRef.current.volume = 1;
    };

    return (
        <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0E0E0F] via-[#1A1A1D] to-[#0E0E0F]">
            {/* Áudios */}
            <audio ref={bgAudioRef} src="/musica-fundo.mp3" />
            <audio ref={urnaAudioRef} src="/urna.mp3" />

            {!hasEntered ? (
                // Tela de entrada
                <div className="text-white text-center flex flex-col items-center gap-6">
                    <h1 className="text-3xl font-bold">Seja bem-vindo(a)!</h1>
                    <button
                        onClick={handleEnter}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold"
                    >
                        Entrar
                    </button>
                </div>
            ) : (
                // Página de votação
                <div
                    ref={cardRef}
                    className="bg-[#1C1C1F] text-white gap-5 max-md:w-[90vw] p-6 rounded-2xl shadow-2xl flex flex-col items-center relative"
                >
                    <img
                        src="/cicero.jpg"
                        alt="Cícero Araújo"
                        className="w-50 h-50 rounded-xl border-2 border-blue-400 object-cover relative -top-16"
                    />
                    <h1 className="text-3xl font-bold text-center mt-[-2rem] mb-2">
                        Vote em <span className="text-yellow-400">Cícero Araújo</span>
                        <br />
                        <br />
                        #FAZACONTECER <br /> #QUARTO10
                    </h1>
                    <p className="text-gray-300 text-center mb-2 text-md">
                        Para representante da Residência Masculina - UFERSA Pau dos Ferros
                    </p>
                    <p className="text-blue-300 font-semibold text-center mb-6 text-md">
                        No dia 04/06/2025 contamos com seu voto!!!
                    </p>

                    <div
                        className="flex items-center justify-between w-full"
                        style={{ position: "relative", minHeight: 70 }}
                    >
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg text-lg font-semibold transition duration-300 z-10"
                            onClick={handleYes}
                        >
                            Sim
                        </button>

                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold relative transition-all duration-300 z-10"
                            style={noPosition}
                            onMouseEnter={moveNoButton}
                            tabIndex={-1}
                            type="button"
                        >
                            Não
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
