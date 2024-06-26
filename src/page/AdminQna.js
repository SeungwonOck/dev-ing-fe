import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { qnaActions } from "../action/qnaAction";
import QnaTable from "../component/QnaTable";

const AdminQna = () => {
  const dispatch = useDispatch();
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768)
  const { qnaList } = useSelector((state) => state.qna);
  const tableHeader = !isMobile ? [
    "#",
    "링크",
    "제목",
    "작성자",
    "카테고리",
    "작성일",
    "답변 수",
    "삭제여부",
  ] : [
    "링크",
    "제목",
    "작성자",
    "카테고리",
  ];

  useEffect(() => {
    dispatch(qnaActions.getQnaList());
  }, [dispatch]);


  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []); 

  return (
    <div className="locate-center">
      {qnaList &&
        <QnaTable
          header={tableHeader}
          qnaList={qnaList}
          isMobile={isMobile}
        />
      }
    </div>
  )
}

export default AdminQna