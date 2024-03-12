import "./button.css";

// composant bouton qui pourra être réutiliser partout
// pour modifier le style du composant utiliser la props classname

export default function Button({
  w,
  h,
  value,
  className,
  disabled,
  fn = null,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`buttonCustom ${className}`}
      style={{ width: w, height: h }}
      onClick={fn}
    >
      {value}
    </button>
  );
}
