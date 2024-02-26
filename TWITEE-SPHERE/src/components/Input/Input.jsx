import "./input.css";

// composant input qui pourra être réutiliser dans les forumulaires
// pour modifier le style on appelera la props className
export default function Input({
  type,
  placeholder,
  className,
  name,
  value,
  onchange,
  reference,
}) {
  return (
    <input
      className={`inputCustom ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onchange}
      ref={reference}
      required
    />
  );
}
