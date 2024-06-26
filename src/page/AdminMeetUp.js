import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { meetUpActions } from "../action/meetUpAction";
import MeetUpTable from "../component/MeetUpTable";

const AdminMeetUp = () => {
  const dispatch = useDispatch();
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768)
  const { meetUpList } = useSelector((state) => state.meetUp);
  const tableHeader = !isMobile ? [
    "#",
    "링크",
    "제목",
    "작성자",
    "카테고리",
    "작성일",
    "삭제여부",
  ] : [
    "링크",
    "제목",
    "작성자",
    "카테고리",
  ];

  useEffect(() => {
    dispatch(meetUpActions.getMeetUpList());
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
      {meetUpList &&
        <MeetUpTable
          header={tableHeader}
          meetUpList={meetUpList}
          isMobile={isMobile}
        />
      }
      
    </div>
  )
}

export default AdminMeetUp