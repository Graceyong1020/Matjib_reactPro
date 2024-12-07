import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }

  return parseInt(param);
}; //숫자를 가져오는 함수

const useCustomMove = () => {
  //이동하는 기능 한번만 만들어서 여러곳에서 사용할 수 있게 만들어줌
  const navigate = useNavigate(); // 함수처럼 호출

  const [refresh, setRefresh] = useState(false); // moveToList 호출하면 refresh가 바뀌어서

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);

  //page, size 정보를 가지고 있는 쿼리스트링을 만들어줌
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({ pathname: `../list`, search: queryStr });

    setRefresh(!refresh); //refresh를 바꿔서 다시 렌더링
  };

  // 수정
  const moveToModify = (num) => {
    //수정할때 page, size 정보를 가지고 이동
    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault, //이동할때 page, size 정보를 가지고 이동
    });
  };
  // 읽기
  const moveToRead = (num) => {
    navigate({
      pathname: `../read/${num}`,
      search: queryDefault,
    });
  };

  return { moveToList, moveToModify, moveToRead, page, size, refresh };
};

export default useCustomMove;
