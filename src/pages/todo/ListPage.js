import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-3xl font-extrabold text-red-400 mb-6">
        Tasty Spot 🍽️✨
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <ListComponent /> {/* ListComponent를 가져옴 */}
      </div>
    </div>
  );
};

export default ListPage;
