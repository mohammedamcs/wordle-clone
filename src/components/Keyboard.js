import { useWordleContext } from "../context";

function Keyboard() {
  const { usedKeys } = useWordleContext();
  const keys = "abcdefghijklmnopqrstuvwxyz";
  return (
    <div className="keyboard">
      {[...keys].map((key) => {
        let status = usedKeys[key];
        return (
          <div
            className={`key ${status ? status: ''}`}
            key={key}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
}
export default Keyboard;
