import { useQuery } from "@tanstack/react-query"
import CardsProfile from "./cards-profile"
import Charts from "./charts"
import MainTable from "./main-table"
import $axios from "@/http"
import { DataStore } from "@/store/data.store"
import { IUserInfo } from "@/interfaces"


const Dashboard = () => {
  const { counts, setCounts } = DataStore()
  const { isLoading, error } = useQuery({
    queryKey: ['get-data'],
    queryFn: async () => {
      const { data } = await $axios.get('/event/get/data')
      setCounts(data)
      return data
    },
  })


  return (
    <>
      {isLoading && "Loading..."}
      {error && "Something error"}
      <div className="container h-aut px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>
        <CardsProfile counts={counts} />
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr
                  className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">events</th>
                  <th className="px-4 py-3">Participant</th>
                  <th className="px-4 py-3">isActive</th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                {
                  counts.userInfo.map((item: IUserInfo) => (
                    <MainTable key={item.createdAt} item={item} />
                  ))
                }

              </tbody>
            </table>
          </div>
          <div
            className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
          >
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      1
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      2
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      3
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      8
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    >
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>

        <Charts />
      </div>
    </>
  )
}

export default Dashboard