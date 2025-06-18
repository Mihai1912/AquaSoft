import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ username: '', email: '', role_id: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Esti sigur ca vrei sa stergi acest utilizator?')) return;

    try {
      const res = await fetch(`http://localhost:3001/user/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      setUsers(users.filter(user => user.id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditPopup = (user) => {
    setEditingUser(user);
    setUpdatedUser({ username: user.username, email: user.email, role_id: user.role_id });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3001/user/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      setEditingUser(null);
      fetchUsers();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAddingUser(false);
      setNewUser({ username: '', email: '', password: '' });
      fetchUsers();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Panel - Lista utilizatorilor</h2>
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.addButton} onClick={() => setAddingUser(true)}>➕ Adauga utilizator</button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rol</th>
              <th style={styles.th}>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role_id}</td>
                <td style={styles.td}>
                  <button style={styles.iconButton} onClick={() => handleDelete(user.id)} title="Sterge">🗑️</button>
                  <button style={styles.iconButton} onClick={() => openEditPopup(user)} title="Editeaza">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT POPUP */}
      {editingUser && (
        <div style={styles.popup}>
          <div style={styles.modal}>
            <h3>Editeaza utilizatorul</h3>
            <input
              style={styles.input}
              placeholder="Username"
              value={updatedUser.username}
              onChange={e => setUpdatedUser({ ...updatedUser, username: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Email"
              value={updatedUser.email}
              onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Rol ID"
              value={updatedUser.role_id}
              onChange={e => setUpdatedUser({ ...updatedUser, role_id: Number(e.target.value) })}
            />
            <div style={styles.modalButtons}>
              <button style={styles.saveButton} onClick={handleUpdate}>Salveaza</button>
              <button style={styles.cancelButton} onClick={() => setEditingUser(null)}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD POPUP */}
      {addingUser && (
        <div style={styles.popup}>
          <div style={styles.modal}>
            <h3>Adauga utilizator</h3>
            <input
              style={styles.input}
              placeholder="Username"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Parola"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            />
            <div style={styles.modalButtons}>
              <button style={styles.saveButton} onClick={handleAddUser}>Creeaza</button>
              <button style={styles.cancelButton} onClick={() => setAddingUser(false)}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px 40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '700px',
    maxWidth: '100%',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '28px',
    textAlign: 'center',
  },
  error: {
    color: '#e63946',
    marginBottom: '15px',
    fontWeight: '600',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#50e3c2',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    color: '#555',
    fontWeight: '600',
  },
  tr: {
    transition: 'background-color 0.2s ease',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '12px',
    color: '#444',
  },
  iconButton: {
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 10px',
    marginRight: '10px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  popup: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px 25px',
    width: '320px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 25px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 25px',
    color: '#555',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
  },
};

export default AdminPage;
