import { BounceLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div>
      <BounceLoader color={"#1F3A8A"} speedMultiplier={2} />
    </div>
  );
}
