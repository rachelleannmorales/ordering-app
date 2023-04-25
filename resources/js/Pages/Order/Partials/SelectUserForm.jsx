import InputLabel from '@/Components/InputLabel';

export default function SelectUserForm({ users, handleUserChange }) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <header>
                <h2 className="text-lg font-medium text-gray-900">User Information</h2>
            </header>
                <div className="mt-6 flex items-center">
                <div className='mr-2'> 
                        <InputLabel htmlFor="name" value="Name" />
                        <select name="user_id" id="user_id" 
                            className="form-control" 
                            onChange={handleUserChange}>
                                <option value="">Select a user...</option>
                                {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
