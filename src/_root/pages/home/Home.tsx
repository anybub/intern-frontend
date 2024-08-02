import HeroSlider from "@/components/shared/HeroSlider";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="bg-dark-1">
            <HeroSlider />
            <div className="flex flex-col text-center gap-10 mt-5">
                <div>
                    <h2 className="h2-bold p-3 text-off-white">About</h2>
                    <p className="w-[80%] m-auto body-medium text-light-2">
                        e-Election is a modern voting system that leverages blockchain technologies to ensure transparency, security, and immutability of the voting process. By utilizing blockchain, every vote is recorded on a decentralized and tamper-proof ledger, making it virtually impossible to manipulate or alter the results. This technology eliminates the need for intermediaries and provides a trustless environment for conducting elections. With e-Election, voters can have confidence in the integrity of the electoral process, and the results can be easily audited and verified by anyone. Join us in embracing the future of democracy with e-Election and blockchain technologies.
                    </p>
                </div>
                <div>
                    <h2 className="h2-bold text-off-white">
                        Current Elections
                    </h2>
                    <div className="flex flex-col md:flex-row">
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
                    <div className="flex flex-col md:flex-row">
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
        </div>
    );
};

export default Home;
