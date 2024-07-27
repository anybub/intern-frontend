import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="">
    <div className="flex flex-col text-center gap-10">
      <div>
        <h2 className="h2-bold p-3">About</h2>
        <p className="px-4 body-medium">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatem tempore dolores asperiores hic eos sed ab omnis animi possimus consectetur illum ex obcaecati, quas id cum qui libero neque?</p>
      </div>
      <div>
        <h2 className="h2-bold">Current Elections</h2>
      <Link to="/elections">
        <h4 className="h3-bold p-2">Gymkhana 2024</h4>
        <p className="base-medium px-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit soluta laudantium consectetur, ad excepturi, cum sequi repellat ratione vero dicta quae aperiam temporibus debitis, reprehenderit pariatur nemo autem. Maiores, enim.</p>
      </Link>
      </div>
      <div className="">
        <h2 className="h2-bold">Upcoming Elections</h2>
        <h4 className="h3-bold p-2">Gymkhana 2025</h4>
        <p className="base-medium px-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit soluta laudantium consectetur, ad excepturi, cum sequi repellat ratione vero dicta quae aperiam temporibus debitis, reprehenderit pariatur nemo autem. Maiores, enim.</p>
      </div>
      </div>
      <div className="flex justify-center mt-10">
      <Button className="shad-button_primary">Create Election</Button>
      </div>
      </div>
  )
}

export default Home