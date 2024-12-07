import { useSearchParams } from "react-router-dom"; // useSearchParams -> URL의 쿼리스트링을 가져오는 hook
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">WishList Page Component</div>
      <ListComponent /> {/* ListComponent를 가져옴 */}
    </div>
  );
};

export default ListPage;
