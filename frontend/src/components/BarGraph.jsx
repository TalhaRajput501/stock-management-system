import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
  Cell
} from 'recharts';

function BarGraph({ 
  products = [
    { categoryName: 'Product1', total: 10 },
    { categoryName: 'Product3', total: 30 },
    { categoryName: 'Product2', total: 20 },
    { categoryName: 'Product4', total: 45 },
  ]
}) {



  return (
    <>
      <div
        className='flex w-full flex-col justify-center items-center'
      >
        <h1 className="text-3xl font-bold mb-3 mt-9 text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Product Quantity by Category</h1>
        <div className="w-[90%] h-[64vh]  dark:bg-gray-800 bg-gray-400  rounded-xl shadow p-4 pt-6 pb-10 border border-blue-400  "  >
          {/* Actual bar graph */}
          <p
            className='font-bold text-center text-green-600 mb-2'
          >Items having stock below or equal 10 Units are shown with a red bar.</p>
          <ResponsiveContainer width="100%" height="100%" > 
            <BarChart data={products} >
              {/* color the dashed line with stroke attribute init */}
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              {/* Category name written in bottom of bars */}
              <XAxis dataKey={'categoryName'}
                stroke="white"
                tick={{ fontSize: 14, fill: 'white', angle: 0 }}
              />
              {/* Quantity written vertically on right side of the graph   */}
              <YAxis
                stroke="white"
                tick={{ fontSize: 14, fill: 'white', angle: 0 }}
              />
              {/* The mini box appear on hover on a bar */}
              <Tooltip
                cursor={{ fill: '#8191cfbf' }}
                // cursor={{ fill: '#81b2cfbd' }} 
                contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '10px', border: '1px solid #2344' }}
                labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              {/* Box and text indicate that about which this graph is */}
              <Legend />
              {/* The actual visual bar */}
              <Bar
                dataKey="total"
                barSize={40}
                stroke='white'
              >
                {products.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={item.total <= 10 ? 'red' : '#60A5FA'}
                  />
                ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default BarGraph
