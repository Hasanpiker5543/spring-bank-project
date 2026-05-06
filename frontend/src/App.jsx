import { useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, Landmark, LogOut, Send, Users, WalletCards, Zap } from 'lucide-react';
import { createAccount, createClient, createTransfer, getAccounts, getClients, getRecentTransactions, login, logout, register } from './services/api';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('bankUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '', phone: '' });
  const [accounts, setAccounts] = useState([]);
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ fromAccountId: '', toAccountNumber: '', amount: '' });
  const [clientForm, setClientForm] = useState({ username: '', phone: '' });
  const [accountForm, setAccountForm] = useState({ clientId: '', accountNumber: '', balance: '' });
  const [message, setMessage] = useState('');

  const loadData = async () => {
    const [accountsResponse, clientsResponse, transactionsResponse] = await Promise.all([
      getAccounts(),
      getClients(),
      getRecentTransactions(),
    ]);
    setAccounts(accountsResponse.data);
    setClients(clientsResponse.data);
    setTransactions(transactionsResponse.data);
  };

  useEffect(() => {
    if (user) {
      loadData().catch(() => setMessage('Impossible de charger les données. Lancez le backend Spring Boot.'));
    }
  }, [user]);

  const stats = useMemo(() => {
    const visibleAccounts = user?.role === 'ADMIN'
      ? accounts
      : accounts.filter((account) => account.client?.id === user?.clientId);
    const visibleClients = user?.role === 'ADMIN'
      ? clients
      : clients.filter((client) => client.id === user?.clientId);
    const visibleTransactions = user?.role === 'ADMIN'
      ? transactions
      : transactions.filter((transaction) => transaction.account?.client?.id === user?.clientId);
    const totalBalance = visibleAccounts.reduce((sum, account) => sum + Number(account.balance || 0), 0);
    return {
      totalBalance,
      totalAccounts: visibleAccounts.length,
      totalClients: visibleClients.length,
      totalTransactions: visibleTransactions.length,
    };
  }, [accounts, clients, transactions, user]);

  const visibleAccounts = user?.role === 'ADMIN'
    ? accounts
    : accounts.filter((account) => account.client?.id === user?.clientId);

  const visibleTransactions = user?.role === 'ADMIN'
    ? transactions
    : transactions.filter((transaction) => transaction.account?.client?.id === user?.clientId);

  const handleTransfer = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await createTransfer({
        fromAccountId: Number(form.fromAccountId),
        toAccountNumber: form.toAccountNumber,
        amount: Number(form.amount),
      });
      setForm({ fromAccountId: '', toAccountNumber: '', amount: '' });
      setMessage('Transfert effectué avec succès.');
      await loadData();
    } catch {
      setMessage('Transfert refusé. Vérifiez le compte destinataire et le solde.');
    }
  };

  const handleCreateClient = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await createClient(clientForm);
      setClientForm({ username: '', phone: '' });
      setMessage('Client ajouté avec succès.');
      await loadData();
    } catch {
      setMessage('Impossible d’ajouter le client. Vérifiez le username.');
    }
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await createAccount({
        accountNumber: accountForm.accountNumber,
        balance: Number(accountForm.balance),
        client: { id: Number(accountForm.clientId) },
      });
      setAccountForm({ clientId: '', accountNumber: '', balance: '' });
      setMessage('Compte ajouté avec succès.');
      await loadData();
    } catch {
      setMessage('Impossible d’ajouter le compte. Vérifiez les informations.');
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = authMode === 'login'
        ? await login({ username: authForm.username, password: authForm.password })
        : await register(authForm);
      localStorage.setItem('bankUser', JSON.stringify(response.data));
      setUser(response.data);
      setAuthForm({ username: '', password: '', phone: '' });
      setMessage(`Bienvenue ${response.data.username}.`);
    } catch {
      setMessage(authMode === 'login' ? 'Login refusé. Vérifiez username et password.' : 'Inscription refusée. Username déjà utilisé.');
    }
  };

  const handleLogout = async () => {
    await logout().catch(() => {});
    localStorage.removeItem('bankUser');
    setUser(null);
    setAccounts([]);
    setClients([]);
    setTransactions([]);
    setMessage('Déconnexion réussie.');
  };

  if (!user) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <div className="auth-visual">
            <div className="brand"><Landmark size={30} /> BankApp Spring</div>
            <h1>{authMode === 'login' ? 'Connexion sécurisée' : 'Créer un compte'}</h1>
            <p>Accédez au dashboard bancaire, consultez les comptes et effectuez des transferts.</p>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {message && <div className="message">{message}</div>}
            <label>Username</label>
            <input value={authForm.username} onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })} required />
            <label>Password</label>
            <input type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} required />
            {authMode === 'register' && (
              <>
                <label>Téléphone</label>
                <input value={authForm.phone} onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} required />
              </>
            )}
            <button>{authMode === 'login' ? 'Se connecter' : 'S’inscrire'}</button>
            <button type="button" className="ghost-button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'Créer un compte' : 'J’ai déjà un compte'}
            </button>
            <small>Demo admin: admin / admin123</small>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <nav className="navbar">
        <div className="brand"><Landmark size={28} /> BankApp Spring</div>
        <div className="nav-actions">
          <span>{user.username} · {user.role}</span>
          <button onClick={handleLogout}><LogOut size={16} /> Logout</button>
        </div>
      </nav>

      <section className="hero-card">
        <div>
          <p className="eyebrow">Projet module Spring</p>
          <h1>Gestion bancaire moderne</h1>
          <p>Dashboard, clients, comptes, transactions et transfert manuel par numéro de compte.</p>
        </div>
        <div className="hero-icon"><ArrowRightLeft size={52} /></div>
      </section>

      {message && <div className="message">{message}</div>}

      <section className="stats-grid">
        <StatCard icon={<WalletCards />} label="Comptes" value={stats.totalAccounts} />
        <StatCard icon={<Users />} label="Clients" value={stats.totalClients} />
        <StatCard icon={<Zap />} label="Transactions récentes" value={stats.totalTransactions} />
        <StatCard icon={<Landmark />} label="Solde global" value={`${stats.totalBalance.toFixed(2)} MAD`} />
      </section>

      <section className="content-grid">
        {user.role === 'ADMIN' && (
          <>
            <div className="panel">
              <div className="panel-header">
                <h2>Ajouter client</h2>
                <Users size={22} />
              </div>
              <form onSubmit={handleCreateClient} className="form-grid">
                <label>Username</label>
                <input value={clientForm.username} onChange={(e) => setClientForm({ ...clientForm, username: e.target.value })} required />
                <label>Téléphone</label>
                <input value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} required />
                <button type="submit">Créer client</button>
              </form>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Ajouter compte</h2>
                <WalletCards size={22} />
              </div>
              <form onSubmit={handleCreateAccount} className="form-grid">
                <label>Client</label>
                <select value={accountForm.clientId} onChange={(e) => setAccountForm({ ...accountForm, clientId: e.target.value })} required>
                  <option value="">Choisir un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.username} - {client.phone}</option>
                  ))}
                </select>
                <label>Numéro de compte</label>
                <input value={accountForm.accountNumber} onChange={(e) => setAccountForm({ ...accountForm, accountNumber: e.target.value })} placeholder="ACC-CLIENT-001" required />
                <label>Solde initial</label>
                <input type="number" min="0" value={accountForm.balance} onChange={(e) => setAccountForm({ ...accountForm, balance: e.target.value })} placeholder="1000" required />
                <button type="submit">Créer compte</button>
              </form>
            </div>
          </>
        )}

        <div className="panel">
          <div className="panel-header">
            <h2>Envoyer de l’argent</h2>
            <Send size={22} />
          </div>
          <form onSubmit={handleTransfer} className="form-grid">
            <label>Compte source</label>
            <select value={form.fromAccountId} onChange={(e) => setForm({ ...form, fromAccountId: e.target.value })} required>
              <option value="">Choisir un compte</option>
              {visibleAccounts.map((account) => (
                <option key={account.id} value={account.id}>{account.accountNumber} - {account.client?.username}</option>
              ))}
            </select>

            <label>Compte, téléphone ou nom du destinataire</label>
            <input value={form.toAccountNumber} onChange={(e) => setForm({ ...form, toAccountNumber: e.target.value })} placeholder="ACC-MEHDI-001 ou 0600000002 ou mehdi" required />

            <label>Montant</label>
            <input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="100" required />

            <button type="submit">Envoyer</button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header"><h2>Transactions récentes</h2></div>
          <div className="list">
            {visibleTransactions.map((transaction) => (
              <div className="list-item" key={transaction.id}>
                <span>
                  <strong>{transaction.type}</strong>
                  <small>{transaction.account?.accountNumber}</small>
                </span>
                <b className={transaction.type === 'DEBIT' ? 'danger' : 'success'}>{transaction.amount} MAD</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header"><h2>Comptes bancaires</h2></div>
        <div className="accounts-grid">
          {visibleAccounts.map((account) => (
            <article className="account-card" key={account.id}>
              <span className="card-icon"><WalletCards /></span>
              <h3>{account.accountNumber}</h3>
              <p>{account.client?.username} · {account.client?.phone}</p>
              <strong>{Number(account.balance).toFixed(2)} MAD</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <article className="stat-card">
      <span>{icon}</span>
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
}

export default App;
