function PageComponent({ serverData, movePage }) {
  // serverDate(서버로부터 받은 데이터).prev, pageNumList, next
  return (
    <div className="m-6 flex justify-center">
      {/* serverData.prev가 있으면 Prev 버튼을 보여주고, 없으면 빈값을 보여줌 */}
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-16 text-center  font-bold text-blue-400 "
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      ) : (
        <></>
      )}

      {/* pageNumList에 있는 각각의 페이지 번호를 클릭하면 해당 페이지로 이동 */}
      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-12  text-center rounded shadow-md text-white ${
            serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
          }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {/* serverData.next가 있으면 Next 버튼을 보여주고, 없으면 빈값을 보여줌 */}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PageComponent;
