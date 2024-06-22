import React from 'react'
import { Table } from "react-bootstrap";

const UserTable = ({ header, data }) => {
    return (
        <div className="overflow-x">
            <Table className="table-container" striped bordered hover>
                <thead>
                    <tr>
                        {header.map((title) => (
                            <th>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="table-row">
                                <td>{index + 1}</td>
                                <td className="table-cell">
                                    <img src={item.profileImage} alt={item.userName}/>
                                    <div className="user-info">
                                        <span>{item.userName}</span>
                                        <span className="small-text">{item.email}</span>
                                    </div>
                                </td>
                                <td>{item.description}</td>
                                <td>{item.gender}</td>
                                <td>{item.rank}</td>
                                <td>{item.stacks}</td>
                                <td>{item.following}</td>
                                <td>{item.followers}</td>
                                <td>{item.isDelete ? 'Yes' : 'No'}</td>
                                <td>{item.isBlock ? 'Yes' : 'No'}</td>
                                <td>{item.level}</td>
                                <td>{item.report}</td>
                                <td>{item.createAt ? `${item.createAt.date} ${item.createAt.time}` : "Date Not Provided"}</td>
                            </tr>
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

export default UserTable
