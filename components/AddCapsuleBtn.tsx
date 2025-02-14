import Image from "next/image";
import Link from "next/link";

interface AddCapsuleBtnProps {
    extraClass?: string;
}

const AddCapsuleBtn: React.FC<AddCapsuleBtnProps> = ({ extraClass = "" }) => {
    return (
        <Link
            href="/create-capsule"
            className={`w-48 h-12 bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-md hover:bg-blue-600 transition ${extraClass}`}
        >
            <Image src="/assets/add.svg" alt="add" width={24} height={24} />
            <p className="hidden sm:block">Create New Capsule</p>
        </Link>
    );
};

export default AddCapsuleBtn;
