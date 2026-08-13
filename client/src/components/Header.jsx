export default function Header({ user, onLogout, collectionCount }) {
  return <header className="app-header"><div><b>PokéDex</b><span>{collectionCount} en colección</span></div><div className="user-menu"><span>Hola, {user.name}</span><button onClick={onLogout}>Cerrar sesión</button></div></header>;
}
