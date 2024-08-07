import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setFilters, setMovieListName} from "../../store/slices/moviesSlice.js";
import {Link} from 'react-router-dom';

const Sidebar = ({isOpen}) => {
    const dispatch = useDispatch();
    const {favorites, watch_later} = useSelector(state => state.movies);

    const menus = [
        {name: "Популярные", filters: {limit: "250", lists: 'top250'}},
        {name: "Любимые", filters: {id: favorites}},
        {name: "Посмотреть позже", filters: {id: watch_later}}
    ];

    const handleMenuClick = (name, filters) => {
        dispatch(setMovieListName(name))
        dispatch(setFilters(filters));
    };

    return (
        <aside className="sticky top-20 h-screen z-10 flex shadow">
            <div
                className={`bg-white ${isOpen ? "w-60 px-4" : "w-0 opacity-0 overflow-hidden"
                } duration-500 text-black`}
                /* Если сайдбар открыт, то высталвяем ему ширину, иначе он имеет ширину 0, прозрачность и скрывает выходящий за пределы контент */
            >

                <div className="mt-4 flex flex-col gap-4 relative">
                    {/* Отображение элементов меню. Он используется метод map для перебора массива menus */}
                    {menus?.map((menu, i) => (
                        <Link to={'/movies'} key={i}>
                            <button
                                className={"flex items-center text-md gap-7 font-medium p-2 hover:bg-gray-200 rounded-md whitespace-pre duration-300"}
                                /* whitespace-pre здесь необходим, чтобы во время развертывания сайдбара текст содержащий пробел не делился на строки */
                                onClick={() => handleMenuClick(menu.name, menu.filters)}
                            >
                                {/* Надпись в сайдбаре */}
                                <h2>
                                    {menu?.name}
                                </h2>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;