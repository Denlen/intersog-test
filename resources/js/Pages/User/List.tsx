import Users from '@/Components/Users'; 

export default function List() {
    return (
        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
            <div className="mt-8 text-2xl">
                Welcome to the Users Dashboard!
            </div>

            <div className="mt-6">
                <Users />
            </div>
        </div>
    );
};

