import { useState, useEffect } from 'react';
import { db } from "../lib/firebase.js";
import { collection, query, where, getDocs } from 'firebase/firestore';

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
          className="w-full p-4 pl-10 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {searchQuery.length > 0 && users.length === 0 && !loading && (
        <p className="text-center text-gray-500">No users found</p>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded-lg shadow-md hover:bg-gray-50">
            <a href={`/profile/${user.id}`} className="font-semibold text-lg hover:underline">{user.username}</a>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
