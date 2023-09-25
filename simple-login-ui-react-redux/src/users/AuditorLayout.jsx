import { Routes, Route } from 'react-router-dom';
import { AddEdit } from './';
import { AuditorList } from './AuditorList';

export { AuditorLayout };

function AuditorLayout() {

    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<AuditorList />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}
