import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort') || 'asc';

    const handleSortChange = (e) => {
        setSearchParams({ ...searchParams, sort: e.target.value });
    };

    return (
        <div className="filter">
            <select value={sort} onChange={handleSortChange}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        </div>
    );
};

export default SortFilter;
