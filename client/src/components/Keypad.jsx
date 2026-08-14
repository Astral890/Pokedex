export default function Keypad({ onDigit }) {
  return <div className="keypad">{[1,2,3,4,5,6,7,8,9,0].map((digit) => <button key={digit} className="key" onClick={() => onDigit(String(digit))}>{digit}</button>)}</div>;
}
