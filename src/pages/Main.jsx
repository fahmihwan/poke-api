import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
    const [urlPoke, setUrlPoke] = useState("https://pokeapi.co/api/v2/pokemon");
    const [listData, setListData] = useState([]);
    const [listDetail, setListDetail] = useState(false);
    const [preview, setPreview] = useState([]);
    const [count, setCount] = useState(0);

    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const getData = async () => {
        await axios
            .get(urlPoke)
            .then(function (response) {
                // handle success

                setCount(response.data.count);
                setListData(response.data);
                setNext(response.next);
                setPrevious(response.previous);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    const getPokemon = () => {
        axios
            .get(listDetail)
            .then(function (response) {
                // handle success

                setPreview(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        if (listDetail) {
            getPokemon();
        }
        getData();
    }, [listDetail, urlPoke]);

    // console.log(listData);
    return (
        <div className="w-full  px-20">
            <div className="py-5">
                <p>HOME</p>
            </div>
            <div className="flex">
                <div className="w-1/3 px-2  ">
                    <section className="px-2 flex justify-between">
                        <p>List Item</p>
                        <p>{count}</p>
                    </section>
                    <section className="h-[470px] px-2 overflow-y-scroll mb-2">
                        <ul>
                            {listData &&
                                listData.results?.map((d, i) => (
                                    <li
                                        key={i}
                                        className="border mb-2 hover:bg-red-400 "
                                    >
                                        <button
                                            onMouseOver={() =>
                                                setListDetail(d.url)
                                            }
                                            className="w-full py-2 flex items-center"
                                        >
                                            <img
                                                className="mr-5"
                                                width={30}
                                                src="./logo/pokeball.png"
                                                alt=""
                                            />
                                            {d.name}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </section>
                    {/* pagination */}
                    <section className="px-2 flex">
                        {listData.previous && (
                            <button
                                onClick={() => setUrlPoke(listData.previous)}
                                className="bg-black text-white py-1 w-full text-xl mr-3"
                            >
                                prev
                            </button>
                        )}
                        {listData.next && (
                            <button
                                onClick={() => setUrlPoke(listData.next)}
                                className="bg-black text-white py-1 w-full text-xl"
                            >
                                Next
                            </button>
                        )}
                    </section>
                </div>
                <div className="w-2/3">
                    <div className="border">
                        {preview && (
                            <div className="border">
                                <p className="font-bold text-center text-2xl">
                                    {preview.name}
                                </p>
                                <div className="px-5 mx-10 ">
                                    <SlickImg sprites={preview.sprites} />
                                </div>
                                <div className="px-10 py-5">
                                    <p>Information</p>
                                    <InformationEl preview={preview} />
                                </div>
                                {preview && (
                                    <div className="px-10 py-5">
                                        <p>Stat</p>
                                        <StatEl stats={preview.stats} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
const StatEl = ({ stats }) => {
    console.log(stats);
    return (
        <table>
            <tbody>
                {stats?.map((d, i) => (
                    <tr key={i}>
                        <p>{d.stat.name}</p>
                        <progress value={d.base_stat} max="100"></progress>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
const InformationEl = ({ preview }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td className="font-bold">Spesies</td>
                    <td>: {preview.species?.name}</td>
                </tr>
                <tr>
                    <td className="font-bold">Base Experience</td>
                    <td>: {preview?.base_experience}</td>
                </tr>
                <tr>
                    <td className="font-bold">Types</td>
                    <td>
                        :
                        {preview.types &&
                            preview.types?.map((type, i) => (
                                <span className="mr-2" key={i}>
                                    {type.type.name}
                                </span>
                            ))}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold">Ability</td>
                    <td className="">
                        :
                        {preview.abilities &&
                            preview.abilities?.map((ablty, i) => (
                                <span className="mr-2" key={i}>
                                    {ablty.ability.name}
                                </span>
                            ))}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const SlickImg = ({ sprites }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="relative">
            <Slider {...settings}>
                {sprites?.front_default && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.front_default} alt="" />
                        <p className="bg-gray-200">front default</p>
                    </div>
                )}
                {sprites?.front_female && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.front_female} alt="" />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
                {sprites?.front_shiny && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.front_shiny} alt="" />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}

                {sprites?.front_shiny_female && (
                    <div className="bg-gray-50 px-5">
                        <img
                            width={200}
                            src={sprites?.front_shiny_female}
                            alt=""
                        />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
                {sprites?.back_default && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.back_default} alt="" />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
                {sprites?.back_female && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.back_female} alt="" />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
                {sprites?.back_shiny && (
                    <div className="bg-gray-50 px-5">
                        <img width={200} src={sprites?.back_shiny} alt="" />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
                {sprites?.back_shiny_female && (
                    <div className="bg-gray-50 px-5">
                        <img
                            width={200}
                            src={sprites?.back_shiny_female}
                            alt=""
                        />
                        <p className="bg-gray-200">front female</p>
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default Main;
