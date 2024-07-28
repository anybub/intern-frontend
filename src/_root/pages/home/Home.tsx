import HeroSlider from "@/components/shared/HeroSlider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <div className="flex flex-col text-center gap-10 mt-5">
                <div>
                    <h2 className="h2-bold p-3 text-off-white">About</h2>
                    <p className="px-4 body-medium text-light-2 flex items-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero optio quae voluptatibus quod sapiente nihil
                        numquam? Quae odit iste sit, itaque tenetur, at ab
                        placeat voluptas labore fuga laboriosam totam deleniti
                        nostrum quasi vitae quam porro molestias accusantium,
                        est ipsam? Illum consequuntur optio repellendus
                        molestias tempore tempora eveniet? Aspernatur nulla sit
                        sequi, quibusdam consectetur omnis non doloremque ipsa
                        hic debitis et harum possimus, sed modi quisquam
                        consequatur fugit asperiores temporibus laborum
                        cupiditate, aperiam quo exercitationem. Magni, soluta
                        odio porro voluptates laudantium, temporibus ab tempora
                        beatae architecto perferendis alias itaque hic dolorem.
                        Accusamus quos in, minima dolor totam iusto facere iste?
                    </p>
                </div>
                <div>
                    <h2 className="h2-bold text-off-white">
                        Current Elections
                    </h2>
                    <div className="flex">
                        <Link
                            to="/elections"
                            className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500  hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">Gymkhana 2024</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </Link>
                        <Link
                            to="/elections"
                            className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500  hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">CR 2024</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </Link>
                    </div>
                </div>
                <div>
                    <h2 className="h2-bold text-off-white">
                        Upcoming Elections
                    </h2>
                    <div className="flex">
                        <div className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500 hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">Gymkhana 2025</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </div>
                        <div className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500  hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">CR 2025</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </div>
                        <div className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500  hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">CR 2025</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </div>
                        <div className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500  hover:text-dark-1 duration-200">
                            <h4 className="h3-bold p-2">CR 2025</h4>
                            <p className="base-medium px-4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit soluta laudantium
                                consectetur, ad excepturi, cum sequi repellat
                                ratione vero dicta quae aperiam temporibus
                                debitis, reprehenderit pariatur nemo autem.
                                Maiores, enim.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Link to="/createElection">
                    <Button className="shad-button_primary">
                        Create Election
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
