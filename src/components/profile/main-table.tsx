import { IUserInfo } from "@/interfaces"

const MainTable = ({ item }: { item: IUserInfo }) => {
  return <>

    <tr className="text-gray-700 dark:text-gray-400">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          {/* <!-- Avatar with inset shadow --> */}
          <div
            className="relative hidden w-8 h-8 mr-3 rounded-full md:block"
          >
            <img
              className="object-cover w-full h-full rounded-full"
              src='https://github.com/shadcn.png'
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold">{item.fullName}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              { item.email }
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        {item._count.events}
      </td>
      <td className="px-4 py-3 text-sm">
        {item._count.Participant}
      </td>
      <td className="px-4 py-3 text-xs">
        {item.isActivated ?

          <span
            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
          >
            Active
          </span>

          :
          <span
            className="px-2 py-1 font-semibold leading-tight text-red-700 bg-green-100 rounded-full dark:bg-slate-700 dark:text-green-100"
          >
            No Active
          </span>
        }

      </td>
    </tr>
  </>
}

export default MainTable