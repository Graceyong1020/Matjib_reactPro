import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";

const ModifyPage = () => {
  const { tno } = useParams(); //params에서 tno를 가져옴

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Tasty Spot Modify Page</div>
      <ModifyComponent tno={tno} />
    </div>
  );
};

export default ModifyPage;
