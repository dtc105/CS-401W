import { useState, useEffect } from 'react';
import { db } from "../lib/firebase.js";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { requestConnection } from "../lib/connectionsManagement.js";
import { useUserStore } from "../lib/userStore.js";
import Avatar from "../components/Avatar.jsx";

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useUserStore();

  useEffect(() => {
    if (searchQuery.length === 0) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);

      try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('username', '>=', searchQuery), where('username', '<=', searchQuery + '\uf8ff'));

        const querySnapshot = await getDocs(q);

        const usersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a user..."
          className="w-full p-4 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {searchQuery.length > 0 && users.length === 0 && !loading && (
        <p className="text-center text-gray-500">No users found</p>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="relative group flex items-center p-4 border rounded-lg shadow-md hover:bg-100">
            <Avatar user={user} size='search_result'/>
            <div>
              <a href={`/profile/${user.id}`} className="pl-4 font-semibold text-lg hover:underline">{user.username}</a>
              <p className="pl-4 text-sm text-gray-500">{user.email}</p>
            </div>
            <button onClick={() => requestConnection(userId, user?.id)} className='absolute right-4 opacity-0 bg-100 rounded group-hover:bg-green-500 hover:opacity-100 group-hover:opacity-100'>
              ➕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
