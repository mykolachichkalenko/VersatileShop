import "./CustomSearch.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface CustomSearchProps {
    placeholder?: string;
}

export default function CustomSearch({placeholder}: CustomSearchProps) {
    const [query, setQuery] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (query.trim().length > 0){
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <form className="customSearchDiv" onSubmit={onSubmit}>
            <input type="text" className="customSearch__input" placeholder={placeholder} value={query}
                   onChange={(event) => setQuery(event.target.value)}/>
            <button className="customSearch__button">
                <svg className="customSearch__icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
            </button>
        </form>
    );
}