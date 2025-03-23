import { Loader } from 'react-feather';

function Spinner({ size = 32 }) {
  return (
    <span className="spinner">
      <Loader size={size} className="dark:text-white" />
      <span className="sr-only">Loading…</span>
    </span>
  );
}

export default Spinner;
