"use client";
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BookWiseSales = () => {
    const [salesData, setSalesData] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/books`);
                const data = await response.json();
                setSalesData(data);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        fetchData();
    }, [baseUrl]);

    const pieChartData = salesData.map(sale => ({
        name: sale.category,
        value: sale.price
    }));

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='card bg-base-100 shadow-xl border-2 mt-3 flex flex-col'>
            <h1 className='text-xl text-center mb-4'>Book Wise Sales</h1>
            <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius="90%"  // Increased outerRadius for a bigger pie
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookWiseSales;
