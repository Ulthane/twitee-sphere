import "./button.css";

// composant bouton qui pourra être réutiliser partout
// pour modifier le style du composant utiliser la props classname

export default function Button({ value, className }) {
  return <button className={`buttonCustom ${className}`}>{value}</button>;
}