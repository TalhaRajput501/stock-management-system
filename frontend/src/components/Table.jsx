import React from "react";
import errorPic from '../assets/error.gif'

function Table({
  // name,
  // stock,
  className = '',
  products = [],
  actions = false,
  salesAction = false,
  deleteProduct,
  updateProduct,
  loading, 
}) {
  //min-h-[80vh] border-1 border-amber-400 
  return (

    <div className={`relative overflow-x-auto  sm:rounded-lg w-full ${className}`}>
      {!loading ? (
        <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 m-auto ">
          {/* Table heading */}
          <thead className={`text-xs text-blue-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-blue-400 `}>
            <tr>
              <th scope="col" className="px-6 py-4 text-xl">
                Product 
              </th>
              <th scope="col" className="px-6 py-4 text-xl">
                CATEGORY
              </th>
              <th scope="col" className="px-6 py-4 text-xl">
                QTY
              </th>
              <th scope="col" className="px-6 py-4 text-xl">
                STOCK
              </th>
              <th scope="col" className="px-6 py-4 text-xl">
                Price
              </th>
              {/* These actions are for delete and update Product */}
              {actions &&
                <>
                  <th scope="col" className=" py-4 text-xl text-center">
                    Actions
                  </th>
                  <th scope="col" className="px-6 py-4 text-xl">
                  </th>
                </>
              }
              {/* These actions are for sales like add to cart and remove from cart */}
              {salesAction &&
                <>
                  <th scope="col" className=" py-4 text-xl text-center">
                    Actions
                  </th>
                  <th scope="col" className="px-6 py-4 text-xl">
                  </th>
                </>
              }
            </tr>
          </thead>

          {/* Table Data */}

          <tbody>
            {products.length > 0 ?
              products.map((product) => (
                <tr
                  key={product._id}
                  className="  border-b bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-blue-500 hover:bg-gray-200 dark:hover:bg-gray-600 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-semibold text-xl  text-blue-600 whitespace-nowrap dark:text-white "
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{product.quantity}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">Rs{product.price}</td>
                  {/* Only available in stock page update and delete button*/}
                  {
                    actions &&
                    <>
                      <td className=" py-4">
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                          onClick={() => updateProduct(product._id)}
                        >
                          Update
                        </button>
                      </td>

                      <td className=" py-4">
                        <button
                          className="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  hover:bg-red-600 cursor-pointer focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  }

                  {/* available in sales page only and for add to cart and remove from cart*/}
                  {
                    salesAction &&
                    <>
                      <td className=" py-4">
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                          onClick={() => console.log('clicked delete')}
                        >
                          Add
                        </button>
                      </td>

                      <td className=" py-4">
                        <button
                          className="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  hover:bg-red-600 cursor-pointer focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => console.log('clicked delete')}
                        >
                          Remove
                        </button>
                      </td>
                    </>
                  }

                </tr>
              ))
              :
              (
                <tr>
                  <td
                    colSpan={7}
                    className="border"
                  >
                    <img src={errorPic} alt="" className="mx-auto" />
                  </td>
                </tr>
              )
            }
          </tbody>


        </table>)
        : (
          <div className="flex justify-center items-center py-6 mx-auto">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
      }
    </div>


  );
}

export default Table;
