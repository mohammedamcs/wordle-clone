import { useWordleContext } from "../context";

function Alert() {
  const { alertMsg } = useWordleContext();

  return (
    <div className={`alert ${alertMsg ? "active" : ""}`}>
      <p>{alertMsg}</p>
    </div>
  );
}
export default Alert;
