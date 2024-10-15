"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const BarCharts = () => {
    const [chartData, setChartData] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/books`);
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        fetchData();
    }, [baseUrl]);

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div className='card bg-base-100 shadow-xl border-2 mt-3 flex flex-col'>
            <h1 className='text-xl text-center'>Total Category wise Books</h1>
            {chartData.length > 0 && (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChart
                        width={1000}  // Adjusted width
                        height={400}
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}  // Increased bottom margin
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" />
                        <YAxis />
                        <Bar
                            dataKey="quantity"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>

                </div>
            )}
        </div>
    );
};

export default BarCharts;
