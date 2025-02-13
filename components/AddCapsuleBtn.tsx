import Image from 'next/image'
import Link from "next/link";

const AddCapsuleBtn = () => {


    return (
            <Link href="/create-capsule" className="bg-blue-500  rounded-xl font-bold py-2 px-6 flex gap-1 justify-center shadow-md">
                <Image
                    src="/assets/add.svg" alt="add" width={24} height={24}
                />
                <p className="hidden sm:block text-white">Create New Capsule</p>
            </Link>
    );
}

export default AddCapsuleBtn;
