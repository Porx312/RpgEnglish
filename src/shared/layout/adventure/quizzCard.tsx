import Pergamino from "../../lib/svgAssets/Pergamino";

interface QuizCardProps {
    currentQuizIndex: number;
    quizzes: { type: string; question: string }[];
    currentQuiz: { type: string; question: string };
    children?: React.ReactNode; // Opciones u otros contenidos
}

const QuizCard: React.FC<QuizCardProps> = ({ currentQuizIndex, quizzes, currentQuiz, children }) => {
    return (
        <div className="relative max-w-xl mx-auto flex items-center justify-center">
            {/* SVG de pergamino como fondo */}

            {/* Contenido del Quiz */}
            <div className="relative w-[400px] h-[500px]">
                {/* Pergamino SVG */}

                <Pergamino className="absolute inset-0 w-[400px] h-[500px]" />

                {/* Texto encima del pergamino */}
                <div className="relative z-10 p-4 space-y-4 text-amber-900 font-serif text-lg">
                    <div className="flex justify-center items-center mb-2 text-sm ">
                        <span className="font-bold">Question {currentQuizIndex + 1} / {quizzes.length}</span>
                        <span className="ml-2 font-medium">({currentQuiz.type})</span>
                    </div>

                    <h3 className="text-2xl mx-10 md:text-3xl font-bold text-center tracking-wide">
                        {currentQuiz.question}
                    </h3>

                    <div className="space-y-5 p-12">{children}</div>
                </div>
            </div>

        </div>
    );
};

export default QuizCard;
