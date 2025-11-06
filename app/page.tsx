import { EventCard } from "@/components/EventsCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constant";

export default function Page() {
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />

      <div className="mt-20">
        <h3>Featured Events</h3>
        <ul className="events" >
          {events.map(event => (
            <li key={event.slug} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
