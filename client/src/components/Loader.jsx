import { hourglass } from "ldrs";

hourglass.register();
const Loader = () => {
return (
  <>
    <div className="flex justify-center items-center mt-4 ">
      <l-hourglass
        size="60"
        bg-opacity="0.1"
        speed="2"
        color="#3575E2"
      ></l-hourglass>
    </div>
  </>
);
};

export default Loader;



