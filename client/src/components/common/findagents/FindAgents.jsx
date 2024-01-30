import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';
import { Avatar } from '@nextui-org/react';

const FindAgents = () => {
    const [propertyData, setPropertyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/property/properties`);
                const data = await response.json();
                console.log('Fetched data:', data);
                setPropertyData(data.properties);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!propertyData.length) {
            fetchData();
        }
    }, [propertyData]);

    // Extract unique usernames
    const uniqueUsernames = Array.from(new Set(propertyData.map(property => property.username)));

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
                These are the Agents Currently Available
            </h1>
            <div className="overflow-x-auto">
                <table className="table-auto mx-auto border-collapse border border-gray-400 mb-8">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Agent Name</th>
                            <th className="border border-gray-400 px-4 py-2">Agent Email</th>
                            <th className="border border-gray-400 px-4 py-2">Agent Phone</th>
                            <th className="border border-gray-400 px-4 py-2">Agent Photo</th>
                            <th className="border border-gray-400 px-4 py-2">Properties Listed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueUsernames.map((username) => {
                            const agentProperties = propertyData.filter(property => property.username === username);
                            const photoUrl = agentProperties[0]?.photo;

                            return (
                                <tr key={username}>
                                    <td className="border border-gray-400 px-4 py-2">{username}</td>
                                    <td className="border border-gray-400 px-4 py-2">{agentProperties[0]?.agentEmail}</td>
                                    <td className="border border-gray-400 px-4 py-2">{agentProperties[0]?.phoneNumber}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {photoUrl && typeof photoUrl === 'string' ? (
                                            <Avatar isBordered src={photoUrl} />
                                        ) : (
                                            <span>No Photo</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">{agentProperties.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FindAgents;
