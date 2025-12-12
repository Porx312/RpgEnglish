import NameMarco from "@/shared/lib/svgAssets/Name";
import HPBar from "../../components/adventure/HpBar";

interface CharacterCardProps {
    character: { name: string };
    playerHP: number;
    children?: React.ReactNode;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, playerHP, children }) => {
    return (
        <div className=" flex flex-col items-center justify-between  w-full max-w-xs mx-auto">
            {/* Nombre */}
            <div className="relative flex items-center justify-center">

                <NameMarco name={character.name} className="absolute" />
                <h3 className="relative z-10 pt-3  font-bold text-center text-xl mb-3">
                    {character.name}
                </h3>
            </div>

            {/* Avatar o children */}
            <div className="flex justify-center mb-4">
                {children ? (
                    children
                ) : (
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-white">
                        🧙
                    </div>
                )}
            </div>
            <HPBar playerHP={playerHP} />
            {/* Barra de HP */}

        </div>
    );
};

export default CharacterCard;
