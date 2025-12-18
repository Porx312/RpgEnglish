import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BtnStast } from "@/app/(root)/components/BtnStast";
import { CharacterPreview } from "./AvatarPreview/CharacterPreview";
import { ProfilePreview } from "./AvatarPreview/ProfilePreview";
import { useClerk } from "@clerk/nextjs";
import ProfileDropdown from "./HeaderProfileBtn";
import { SoundButtonWrapper } from "./Effects/SoundButtonWrraperProps";

function Header({ stast }: { stast: { name: number, icon: string, color: string }[] }) {

  const { openUserProfile, signOut } = useClerk();

  return (
    <div className="relative z-10 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <SoundButtonWrapper>

      <ProfileDropdown />
      </SoundButtonWrapper>
      {/* Stats */}
      <div className="flex items-center gap-3">
        {/* Money */}

        {stast.map((stat, index) => (
          <BtnStast key={index} icon={stat.icon} stats={stat.name} className={stat.color} />
        ))}

        {/* User Avatar */}

      </div>
    </div>
  );
}
export default Header;
