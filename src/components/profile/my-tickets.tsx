import $axios, { API_URL } from "@/http"
import { useQuery } from "@tanstack/react-query"
import { ITicket } from "@/interfaces/index"
import { useState } from "react"

const MyTickets = () => {
  const [participant, Setparticipant] = useState<ITicket[]>([])
  const { isLoading, error } = useQuery({
    queryKey: ["get-tickets"],
    queryFn: async () => {
      const { data } = await $axios.get("/booking/getById", {
        "headers": {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      Setparticipant(data)
      return data
    },
  })

  function formatDateTime(startDate: string, startTime: string) {
    const date = new Date(`${startDate}T${startTime}:00`);
    const options: object = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  }

  return (
    
    <div className=" bg-hero ">
      {isLoading && "Loading ..."}
      {error && "Something error"}
      {participant.length >0 && 
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Event</th>
              <th>location/organizer</th>
              <th>price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              participant.map((item: ITicket) => (
                <tr key={item.eventId}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask ticket-img rounded hover:rounded-none cursor-pointer h-24 w-24">
                          <img
                            src={`${API_URL}/${item.event.photo}`}
                            alt={item.event.photo} />
                        </div>
                      </div>
                      <div className=" flex flex-col gap-2">
                        <div className="font-bold text-[18px]">
                          {item.event.title.length > 20 ? `${item.event.title.substring(0, 20)}...` : `${item.event.title}`}
                        </div>
                        <div className="text-sm opacity-50"> {formatDateTime(item.event.startDate, item.event.startTime)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className=" flex flex-col gap-2 ">
                      <div>{item.event.location}</div>
                      <div className="badge badge-ghost badge-sm text-[14px] py-[10px]">Organizer: {item.event.organizer.fullName}</div>
                    </div>
                  </td>
                  <td>{item.event.price == 0 ? `Free` : `$ ${item.event.price}`}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      }
      <div className=" flex justify-center items-center h-[400px] "  >
        <h1 className="font-bold text-slate-300 text-3xl">Tickets not found</h1>
      </div>
    </div>
  )
}

export default MyTickets