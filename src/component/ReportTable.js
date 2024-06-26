import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ReportTable = ({ header, reportList, isMobile }) => {

    const navigate = useNavigate();
    const [ isShowDetailInfo, setIsShowDetailInfo ] = useState(false);
    const [ detailInfo, setDetailInfo ] = useState([]);

    const showDetailInfo = (report) => {
        if(detailInfo._id === report._id) {
            setIsShowDetailInfo(false);
            setDetailInfo([]);
            return;
        }
        setDetailInfo(report);
        setIsShowDetailInfo(true);
    }

    console.log(reportList)

    return (
        <div className="overflow-x">
            <Table className="table-container report-table" bordered>
                <thead>
                    <tr>
                        {header.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reportList?.length > 0 ? (
                        reportList.map((report, index) => (
                            <React.Fragment key={index}>
                                <tr className={`table-row cur-point ${detailInfo._id === report._id ? 'select' : ''}`} onClick={() => showDetailInfo(report)}>
                                    <td>{index + 1}</td>
                                    <td>{report.contentType}</td>
                                    <td>{report.content}</td>
                                    <td>{report.reported.nickName}</td>
                                    
                                    {!isMobile && 
                                        <React.Fragment>
                                            <td>{report.reporter.nickName}</td>
                                            <td className='date'>{report.createAt.date} {report.createAt.time}</td>
                                        </React.Fragment>
                                    }
                                    <td><span className={`${report.isConfirmed ? 'coral' : 'blue'}`}>{report.isConfirmed ? 'Yes' : 'No'}</span></td>
                                </tr>
                                {isShowDetailInfo && detailInfo._id === report._id && (
                                    <React.Fragment>
                                            <tr className='detail-info-tr'>
                                                {!isMobile && <td className='blank-td'></td>}
                                                <td className='f-bold hide-tab-header'>신고사유</td>
                                                <td colSpan="12">{report.reasons.map((reason) => <div>{reason}</div>)}</td>
                                            </tr>
                                    

                                        {isMobile &&
                                            <React.Fragment>
                                                <tr className='detail-info-tr'>
                                                    <td className='f-bold hide-tab-header'>신고자</td>
                                                    <td colSpan="12">{report.reporter.nickName}</td>
                                                </tr>
                                                <tr className='detail-info-tr'>
                                                    <td className='f-bold hide-tab-header'>신고일시</td>
                                                    <td className='date' colSpan="12">{detailInfo?.createAt.date} {detailInfo?.createAt.time}</td>
                                                </tr>
                                            </React.Fragment>
                                        }

                                    </React.Fragment>
                                )}
                            </React.Fragment>

                        ))
                    ) : (
                        <tr>
                            <td colSpan={header.length}>No Data to show</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ReportTable
