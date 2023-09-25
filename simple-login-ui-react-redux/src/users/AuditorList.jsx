import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '_store';
import { convertToDateObject, convertToCapitalCase } from '_helpers/utils';

export { AuditorList };

function AuditorList() {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();

    // Define pagination variables
    const itemsPerPage = 10; // Adjust as needed
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(userActions.getAuditData());
    }, []);

    // Calculate the current page's user data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users?.value?.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil((users?.value?.length || 0) / itemsPerPage);

    // Function to change the current page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Users</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '13%' }}>First Name</th>
                        <th style={{ width: '13%' }}>Last Name</th>
                        <th style={{ width: '13%' }}>Username</th>
                        <th style={{ width: '13%' }}>Role</th>
                        <th style={{ width: '13%' }}>Logged In</th>
                        <th style={{ width: '13%' }}>Logged Out</th>
                        <th style={{ width: '13%' }}>IP Address</th>
                        <th style={{ width: '9%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData?.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{convertToCapitalCase(user.role)}</td>
                            <td>{convertToDateObject(user.loggedInAt).toLocaleString()}</td>
                            <td>{convertToDateObject(user.loggedOutAt).toLocaleString()}</td>
                            <td>{user.ipAddress}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
